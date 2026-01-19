import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import type { Group, Mesh } from 'three';

/**
 * TradeScene - Prosty wykres słupkowy ze strzałką wzrostu
 * Stabilna animacja bez wyjazdu z boxa
 */
export function TradeScene() {
  const groupRef = useRef<Group>(null);
  const barsRef = useRef<(Mesh | null)[]>([]);
  const arrowRef = useRef<Group>(null);
  
  // Dane słupków
  const barData = useMemo(() => [
    { height: 0.4 },
    { height: 0.6 },
    { height: 0.5 },
    { height: 0.8 },
    { height: 1.1 },
  ], []);
  
  // Punkty strzałki
  const arrowPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      points.push({
        x: -0.8 + t * 2,
        y: 0.3 + Math.pow(t, 1.8) * 1.2
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Delikatna rotacja całości - MAŁA amplituda
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }
    
    // Animacja słupków - rosną i lekko pulsują
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const baseHeight = barData[i].height;
      const pulse = 1 + Math.sin(t * 0.8 + i * 0.5) * 0.02;
      bar.scale.y = baseHeight * pulse;
      bar.position.y = (baseHeight * pulse) / 2;
    });
    
    // Strzałka lekko pulsuje
    if (arrowRef.current) {
      arrowRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.015);
    }
  });

  return (
    <>
      {/* Oświetlenie */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={1} />
      <pointLight position={[-2, 2, 2]} intensity={0.4} color="#DB5F1B" />

      {/* Główna grupa - wycentrowana i skalowana */}
      <group ref={groupRef} scale={0.9} position={[0, -0.2, 0]}>
        
        {/* Słupki wykresu */}
        {barData.map((bar, i) => (
          <RoundedBox
            key={i}
            ref={(el) => { barsRef.current[i] = el as Mesh | null; }}
            args={[0.35, 1, 0.35]}
            radius={0.02}
            position={[-0.7 + i * 0.4, bar.height / 2, 0]}
          >
            <meshStandardMaterial
              color="#e8e8e8"
              roughness={0.5}
              metalness={0.1}
            />
          </RoundedBox>
        ))}
        
        {/* Strzałka wzrostu */}
        <group ref={arrowRef} position={[0, 0, 0.3]}>
          {arrowPoints.slice(0, -1).map((point, i) => {
            const next = arrowPoints[i + 1];
            const dx = next.x - point.x;
            const dy = next.y - point.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            const midX = (point.x + next.x) / 2;
            const midY = (point.y + next.y) / 2;
            
            return (
              <mesh
                key={i}
                position={[midX, midY, 0]}
                rotation={[0, 0, angle]}
              >
                <capsuleGeometry args={[0.06, len, 4, 8]} />
                <meshStandardMaterial
                  color="#DB5F1B"
                  emissive="#DB5F1B"
                  emissiveIntensity={0.3}
                  roughness={0.3}
                  metalness={0.4}
                />
              </mesh>
            );
          })}
          
          {/* Grot strzałki */}
          <mesh 
            position={[arrowPoints[arrowPoints.length-1].x + 0.1, arrowPoints[arrowPoints.length-1].y + 0.12, 0]}
            rotation={[0, 0, -0.3]}
          >
            <coneGeometry args={[0.12, 0.3, 3]} />
            <meshStandardMaterial
              color="#DB5F1B"
              emissive="#DB5F1B"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        </group>
        
        {/* Particles w tle - małe, statyczne */}
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh
            key={`p-${i}`}
            position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 2.5,
              -1 - Math.random()
            ]}
            scale={0.02 + Math.random() * 0.03}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#DB5F1B" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </>
  );
}
