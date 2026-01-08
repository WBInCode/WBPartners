import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import type { Group } from 'three';

/**
 * TradeScene - Profesjonalna scena 3D dla WB Trade
 * - Wykres wzrostu 3D z animowanymi słupkami
 * - Koszyk e-commerce
 * - Paczki z efektem unoszenia
 * - Particles produktowe
 */
export function TradeScene() {
  const groupRef = useRef<Group>(null);
  const chartRef = useRef<Group>(null);
  const cartRef = useRef<Group>(null);

  // Dane wykresu - animowane słupki
  const chartBars = useMemo(() => [
    { height: 0.5, delay: 0 },
    { height: 0.8, delay: 0.1 },
    { height: 0.6, delay: 0.2 },
    { height: 1.0, delay: 0.3 },
    { height: 1.3, delay: 0.4 },
    { height: 1.6, delay: 0.5 },
  ], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    }

    // Animacja koszyka
    if (cartRef.current) {
      cartRef.current.position.y = Math.sin(t * 2) * 0.1;
      cartRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <>
      {/* Oświetlenie */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={1} color="#DB5F1B" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#E8752E" />

      <group ref={groupRef}>
        {/* Wykres wzrostu 3D */}
        <group ref={chartRef} position={[-1.5, -0.5, 0]}>
          {/* Podstawa wykresu */}
          <mesh position={[1.25, -0.1, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[3.5, 0.05, 1.2]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
          </mesh>
          
          {/* Słupki wykresu */}
          {chartBars.map((bar, i) => (
            <Float key={i} speed={2 + i * 0.2} floatIntensity={0.1}>
              <RoundedBox
                args={[0.4, bar.height, 0.4]}
                radius={0.05}
                position={[i * 0.5, bar.height / 2, 0]}
              >
                <meshStandardMaterial
                  color={`hsl(${20 + i * 5}, 80%, ${50 + i * 5}%)`}
                  roughness={0.3}
                  metalness={0.4}
                  emissive="#DB5F1B"
                  emissiveIntensity={0.1 + i * 0.05}
                />
              </RoundedBox>
            </Float>
          ))}
          
          {/* Strzałka wzrostu */}
          <Float speed={3} floatIntensity={0.5}>
            <group position={[3, 1.2, 0]}>
              <mesh rotation={[0, 0, -Math.PI / 4]}>
                <coneGeometry args={[0.15, 0.4, 4]} />
                <meshStandardMaterial 
                  color="#52F066" 
                  emissive="#52F066"
                  emissiveIntensity={0.5}
                  roughness={0.2} 
                  metalness={0.6} 
                />
              </mesh>
              <mesh position={[-0.2, -0.35, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[0.08, 0.5, 0.08]} />
                <meshStandardMaterial 
                  color="#52F066" 
                  emissive="#52F066"
                  emissiveIntensity={0.3}
                />
              </mesh>
            </group>
          </Float>
        </group>

        {/* Koszyk e-commerce stylizowany */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <group ref={cartRef} position={[2, 0.5, 0.5]} scale={0.6}>
            {/* Korpus koszyka */}
            <mesh>
              <boxGeometry args={[1, 0.6, 0.8]} />
              <meshStandardMaterial 
                color="#DB5F1B" 
                roughness={0.3} 
                metalness={0.5}
                wireframe
              />
            </mesh>
            {/* Uchwyt */}
            <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.4, 0.05, 8, 20, Math.PI]} />
              <meshStandardMaterial color="#C54F15" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Produkty w koszyku */}
            <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.03} position={[-0.2, 0, 0]}>
              <meshStandardMaterial color="#E8752E" roughness={0.4} />
            </RoundedBox>
            <mesh position={[0.2, 0, 0.1]} scale={0.2}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#F5923D" roughness={0.3} />
            </mesh>
          </group>
        </Float>

        {/* Paczki dostawy */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
          <group position={[-2.2, 0.8, 0.5]}>
            <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.05}>
              <meshStandardMaterial color="#DB5F1B" roughness={0.4} metalness={0.2} />
            </RoundedBox>
            {/* Taśma */}
            <mesh position={[0, 0, 0.36]}>
              <boxGeometry args={[0.15, 0.7, 0.02]} />
              <meshStandardMaterial color="#8B3A0F" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.36, 0]}>
              <boxGeometry args={[0.15, 0.02, 0.7]} />
              <meshStandardMaterial color="#8B3A0F" roughness={0.6} />
            </mesh>
          </group>
        </Float>

        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
          <group position={[0.5, -1, 1]} rotation={[0.1, 0.3, 0.1]}>
            <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.03}>
              <meshStandardMaterial color="#E8752E" roughness={0.35} metalness={0.15} />
            </RoundedBox>
            <mesh position={[0, 0, 0.26]}>
              <boxGeometry args={[0.1, 0.5, 0.02]} />
              <meshStandardMaterial color="#A84510" roughness={0.6} />
            </mesh>
          </group>
        </Float>

        {/* Dekoracyjne elementy - monety/coins */}
        {[...Array(5)].map((_, i) => (
          <Float key={i} speed={3 + i * 0.3} floatIntensity={0.5 + i * 0.1}>
            <mesh
              position={[
                Math.sin(i * 1.2) * 2.5,
                Math.cos(i * 0.8) * 1.5,
                Math.sin(i * 0.5) * 1,
              ]}
              rotation={[Math.PI / 2, 0, i * 0.5]}
              scale={0.12}
            >
              <cylinderGeometry args={[1, 1, 0.2, 32]} />
              <meshStandardMaterial
                color="#D6AF5B"
                roughness={0.2}
                metalness={0.9}
                emissive="#D6AF5B"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
}
