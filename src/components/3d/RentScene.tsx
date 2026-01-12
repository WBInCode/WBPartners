import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import type { Group, Mesh } from 'three';

/**
 * RentScene - Tablet/Panel 3D dla WB Rent
 * - Panel rezerwacji z animowanymi elementami
 * - Animowane particles w tle (złote kulki)
 * - Spójny styl z InCodeScene
 */

// Kolory WB Rent
const COLORS = {
  gold: '#D6AF5B',
  goldDark: '#B8942D',
  goldLight: '#E5C66B',
  accent: '#4A78AB',
  dark: '#1a1a2e',
};

// Elementy listy wypożyczeń z nazwami
const RENTAL_ITEMS = [
  { name: 'MacBook Pro 16"', w: 0.55, color: COLORS.gold },
  { name: 'Dell XPS 15', w: 0.4, color: COLORS.goldDark },
  { name: 'Monitor 4K 27"', w: 0.5, color: COLORS.goldLight },
  { name: 'Drukarka HP', w: 0.4, color: COLORS.gold },
  { name: 'Projektor Epson', w: 0.5, color: COLORS.goldDark },
  { name: 'Serwer Dell', w: 0.35, color: COLORS.goldLight },
];

// Konfiguracja animacji
const CYCLE_DURATION = 8; // sekund na pełen cykl

// Easing functions
function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

// Animowane particles w tle
function BackgroundParticles() {
  const particlesRef = useRef<Group>(null);
  
  const particles = useMemo(() => {
    return [...Array(30)].map(() => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 4,
      z: -0.5 - Math.random() * 1,
      speed: 0.3 + Math.random() * 0.4,
      size: 0.03 + Math.random() * 0.04,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const t = state.clock.elapsedTime;
      particlesRef.current.children.forEach((child, i) => {
        const p = particles[i];
        if (p && child) {
          child.position.y = p.y + Math.sin(t * p.speed + p.offset) * 0.3;
          child.position.x = p.x + Math.cos(t * p.speed * 0.6 + p.offset) * 0.2;
          const scale = p.size * (1 + Math.sin(t * 1.5 + p.offset) * 0.25);
          child.scale.setScalar(scale);
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial
            color={COLORS.gold}
            emissive={COLORS.gold}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Animowana lista wypożyczeń - płynna animacja
function AnimatedRentalList() {
  // Refs dla wszystkich elementów
  const itemRefs = useRef<Map<string, Mesh | Group>>(new Map());
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const progress = (t % CYCLE_DURATION) / CYCLE_DURATION;
    
    // Fazy animacji:
    // 0.00 - 0.50: Elementy pojawiają się jeden po drugim
    // 0.50 - 0.75: Checkboxy zaznaczają się
    // 0.75 - 0.92: Pauza
    // 0.92 - 1.00: Reset
    
    for (let i = 0; i < RENTAL_ITEMS.length; i++) {
      const row = itemRefs.current.get(`row-${i}`);
      const check = itemRefs.current.get(`check-${i}`);
      
      if (row) {
        // Każdy element pojawia się w swoim czasie
        const itemAppearStart = (i / RENTAL_ITEMS.length) * 0.45;
        const itemAppearEnd = itemAppearStart + 0.06;
        
        if (progress < itemAppearStart) {
          row.visible = false;
        } else if (progress < itemAppearEnd) {
          // Płynne wejście
          row.visible = true;
          const slideProgress = easeOutQuad((progress - itemAppearStart) / (itemAppearEnd - itemAppearStart));
          row.position.x = (1 - slideProgress) * -0.2;
          row.scale.setScalar(0.8 + slideProgress * 0.2);
        } else if (progress < 0.92) {
          row.visible = true;
          row.position.x = 0;
          row.scale.setScalar(1);
        } else {
          row.visible = false;
        }
      }
      
      if (check) {
        // Checkboxy pojawiają się po elementach
        const checkStart = 0.52 + (i / RENTAL_ITEMS.length) * 0.18;
        
        if (progress >= checkStart && progress < 0.92) {
          check.visible = true;
          const checkAge = progress - checkStart;
          if (checkAge < 0.02) {
            // Pop effect
            const pop = 1 + Math.sin((checkAge / 0.02) * Math.PI) * 0.4;
            check.scale.setScalar(pop);
          } else {
            check.scale.setScalar(1);
          }
        } else {
          check.visible = false;
        }
      }
    }
  });
  
  return (
    <group>
      {RENTAL_ITEMS.map((item, i) => {
        const yPos = 0.32 - i * 0.11;
        
        return (
          <group 
            key={i} 
            ref={(el) => { if (el) itemRefs.current.set(`row-${i}`, el); }}
            visible={false}
          >
            {/* Checkbox */}
            <group position={[-0.88, yPos, 0.06]}>
              <mesh>
                <boxGeometry args={[0.055, 0.055, 0.01]} />
                <meshStandardMaterial color="#2a2a3a" />
              </mesh>
              <mesh 
                ref={(el) => { if (el) itemRefs.current.set(`check-${i}`, el); }}
                position={[0, 0, 0.008]} 
                visible={false}
              >
                <boxGeometry args={[0.032, 0.032, 0.005]} />
                <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={0.6} />
              </mesh>
            </group>
            
            {/* Nazwa produktu (prostokąt) */}
            <mesh position={[-0.48 + item.w / 2, yPos, 0.06]}>
              <boxGeometry args={[item.w, 0.05, 0.008]} />
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={0.25}
                roughness={0.4}
              />
            </mesh>
            
            {/* Ilość/dostępność */}
            <mesh position={[0.38, yPos, 0.06]}>
              <boxGeometry args={[0.14, 0.035, 0.008]} />
              <meshStandardMaterial color="#3a3a4a" />
            </mesh>
            
            {/* Cena/status */}
            <mesh position={[0.68, yPos, 0.06]}>
              <boxGeometry args={[0.2, 0.035, 0.008]} />
              <meshStandardMaterial
                color={COLORS.accent}
                emissive={COLORS.accent}
                emissiveIntensity={0.15}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function RentScene() {
  const groupRef = useRef<Group>(null);

  // Delikatna rotacja
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.02;
    }
  });

  return (
    <>
      {/* Oświetlenie */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color={COLORS.gold} />

      {/* Animowane particles w tle */}
      <BackgroundParticles />

      <group ref={groupRef}>
        {/* Panel/Tablet 3D */}
        <group position={[0, 0, 0]}>
          {/* Ramka tabletu */}
          <RoundedBox args={[2.3, 1.5, 0.1]} radius={0.06}>
            <meshStandardMaterial color="#1e1e2e" roughness={0.7} metalness={0.2} />
          </RoundedBox>
          
          {/* Ekran */}
          <mesh position={[0, -0.03, 0.055]}>
            <planeGeometry args={[2.1, 1.28]} />
            <meshStandardMaterial color="#0d1117" roughness={0.95} />
          </mesh>

          {/* Pasek tytułowy */}
          <mesh position={[0, 0.6, 0.058]}>
            <boxGeometry args={[2.1, 0.12, 0.01]} />
            <meshStandardMaterial color={COLORS.goldDark} roughness={0.5} />
          </mesh>

          {/* Ikona wypożyczalni w pasku */}
          <mesh position={[-0.85, 0.6, 0.06]}>
            <boxGeometry args={[0.08, 0.06, 0.01]} />
            <meshStandardMaterial color="#fff" />
          </mesh>

          {/* Animowana lista wypożyczeń */}
          <AnimatedRentalList />

          {/* Przycisk na dole */}
          <RoundedBox args={[0.6, 0.12, 0.02]} radius={0.03} position={[0, -0.5, 0.06]}>
            <meshStandardMaterial 
              color={COLORS.gold} 
              emissive={COLORS.gold}
              emissiveIntensity={0.3}
            />
          </RoundedBox>
        </group>
      </group>
    </>
  );
}
