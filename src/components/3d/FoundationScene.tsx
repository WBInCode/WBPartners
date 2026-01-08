import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Group } from 'three';

/**
 * FoundationScene - Realistyczne pulsujące serce z animowanymi kulkami w tle
 */

// Kolory WB Foundation
const COLORS = {
  main: '#8FD2E9',
  light: '#B0E2F2',
  dark: '#6AC0DE',
};

// Animowane particles w tle
function BackgroundParticles() {
  const particlesRef = useRef<Group>(null);
  
  const particles = useMemo(() => {
    return [...Array(35)].map(() => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 4,
      z: -0.5 - Math.random() * 1.5,
      speed: 0.3 + Math.random() * 0.4,
      size: 0.03 + Math.random() * 0.05,
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
            color={COLORS.main}
            emissive={COLORS.main}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Tworzymy profesjonalny kształt serca używając Shape
function createHeartShape(): THREE.Shape {
  const shape = new THREE.Shape();
  
  // Profesjonalne serce - jak emoji/ikona ❤️
  // Zaczynamy od środka wgłębienia na górze
  shape.moveTo(0, 0.3);
  
  // Lewa górna kopuła
  shape.bezierCurveTo(
    -0.05, 0.45,   // punkt kontrolny 1 - delikatne wejście
    -0.35, 0.55,   // punkt kontrolny 2 - szczyt kopuły
    -0.5, 0.3      // punkt końcowy - lewa krawędź
  );
  
  // Lewa dolna część do czubka
  shape.bezierCurveTo(
    -0.55, 0.1,    // punkt kontrolny 1
    -0.5, -0.2,    // punkt kontrolny 2
    0, -0.6        // dolny czubek serca
  );
  
  // Prawa dolna część od czubka
  shape.bezierCurveTo(
    0.5, -0.2,     // punkt kontrolny 1
    0.55, 0.1,     // punkt kontrolny 2
    0.5, 0.3       // punkt końcowy - prawa krawędź
  );
  
  // Prawa górna kopuła
  shape.bezierCurveTo(
    0.35, 0.55,    // punkt kontrolny 1 - szczyt kopuły
    0.05, 0.45,    // punkt kontrolny 2 - delikatne wejście
    0, 0.3         // powrót do środka wgłębienia
  );
  
  return shape;
}

// Easing function - płynne przejścia
function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

// Pulsujące serce - miękka, przyjemna animacja
function PulsingHeart() {
  const heartRef = useRef<Group>(null);
  
  // Geometria serca
  const heartGeometry = useMemo(() => {
    const shape = createHeartShape();
    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.04,
      bevelOffset: 0,
      bevelSegments: 12,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (heartRef.current) {
      // Wolniejsze, bardziej hipnotyczne tempo
      const heartRate = 0.8; // ~48 bpm - spokojne, relaksujące
      const cycleTime = (t * heartRate) % 1.0;
      
      // Płynna, przyjemna pulsacja - jak oddech
      let scale = 1;
      
      if (cycleTime < 0.3) {
        // Płynne rozszerzenie
        const progress = easeInOutSine(cycleTime / 0.3);
        scale = 1 + progress * 0.12;
      } else if (cycleTime < 0.5) {
        // Płynny powrót
        const progress = easeOutCubic((cycleTime - 0.3) / 0.2);
        scale = 1.12 - progress * 0.12;
      } else {
        // Odpoczynek z bardzo delikatnym oddechem
        const restProgress = (cycleTime - 0.5) / 0.5;
        const gentleBreath = Math.sin(restProgress * Math.PI) * 0.03;
        scale = 1 + gentleBreath;
      }
      
      // Jednolita skala - płynna, bez zniekształceń
      const baseScale = 1.5;
      heartRef.current.scale.setScalar(scale * baseScale);
      
      // Bardzo delikatne, hipnotyczne kołysanie
      heartRef.current.rotation.y = Math.sin(t * 0.25) * 0.06;
      heartRef.current.rotation.x = Math.sin(t * 0.2) * 0.015;
      
      // Subtelne unoszenie się
      heartRef.current.position.y = Math.sin(t * 0.5) * 0.02;
    }
  });
  
  return (
    <group ref={heartRef} position={[0, 0, 0]}>
      {/* Główne serce */}
      <mesh geometry={heartGeometry}>
        <meshStandardMaterial 
          color={COLORS.main} 
          roughness={0.25} 
          metalness={0.15}
          emissive={COLORS.main}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

export function FoundationScene() {
  const groupRef = useRef<Group>(null);

  // Delikatna rotacja całości
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.03;
    }
  });

  return (
    <>
      {/* Oświetlenie */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color={COLORS.main} />
      <pointLight position={[-2, 1, 2]} intensity={0.3} color={COLORS.light} />
      <pointLight position={[2, -1, 2]} intensity={0.3} color={COLORS.light} />

      {/* Animowane particles w tle */}
      <BackgroundParticles />

      <group ref={groupRef}>
        {/* Pulsujące serce */}
        <PulsingHeart />
      </group>
    </>
  );
}
