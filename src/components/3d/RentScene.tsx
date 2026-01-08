import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import type { Group, Mesh } from 'three';

/**
 * RentScene - Profesjonalna scena 3D dla WB Rent
 * - Miasto 3D z wieloma budynkami
 * - Animowany klucz premium
 * - Lokalizacja pin
 * - Efekty świetlne reprezentujące wartość
 */
export function RentScene() {
  const groupRef = useRef<Group>(null);
  const keyRef = useRef<Group>(null);
  const pinRef = useRef<Mesh>(null);

  // Budynki w mieście
  const buildings = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], size: [0.8, 2.2, 0.6] as [number, number, number], color: '#D6AF5B' },
    { pos: [-1.3, -0.3, 0.3] as [number, number, number], size: [0.6, 1.6, 0.5] as [number, number, number], color: '#C9A043' },
    { pos: [1.2, -0.5, 0.2] as [number, number, number], size: [0.5, 1.2, 0.4] as [number, number, number], color: '#B8942D' },
    { pos: [-0.5, -0.6, 0.8] as [number, number, number], size: [0.4, 1, 0.35] as [number, number, number], color: '#E5C66B' },
    { pos: [0.7, -0.4, 0.7] as [number, number, number], size: [0.45, 1.4, 0.4] as [number, number, number], color: '#D6AF5B' },
  ], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    }

    if (keyRef.current) {
      keyRef.current.rotation.z = Math.sin(t * 1.5) * 0.15;
      keyRef.current.position.y = 0.8 + Math.sin(t * 2) * 0.1;
    }

    if (pinRef.current) {
      pinRef.current.position.y = 1.8 + Math.sin(t * 2.5) * 0.15;
    }
  });

  return (
    <>
      {/* Oświetlenie */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.3} color="#ffffff" />
      <pointLight position={[0, 3, 3]} intensity={1} color="#D6AF5B" />
      <pointLight position={[-3, 1, 2]} intensity={0.5} color="#B8942D" />
      <spotLight position={[0, 5, 0]} intensity={0.5} angle={0.5} color="#FFF8E7" />

      <group ref={groupRef}>
        {/* Platforma/podstawa miasta */}
        <mesh position={[0, -1.3, 0.3]} rotation={[-0.1, 0, 0]}>
          <cylinderGeometry args={[2.5, 2.8, 0.15, 32]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            roughness={0.8} 
            metalness={0.3}
          />
        </mesh>

        {/* Budynki */}
        {buildings.map((building, i) => (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.05} floatIntensity={0.1}>
            <group position={building.pos}>
              {/* Korpus budynku */}
              <RoundedBox 
                args={building.size} 
                radius={0.03}
                position={[0, building.size[1] / 2 - 1, 0]}
              >
                <meshStandardMaterial 
                  color={building.color} 
                  roughness={0.4} 
                  metalness={0.3}
                />
              </RoundedBox>
              
              {/* Okna - kilka rzędów */}
              {[...Array(Math.floor(building.size[1] * 2))].map((_, row) => (
                <group key={row}>
                  <mesh position={[-building.size[0] * 0.25, building.size[1] / 2 - 1 - 0.3 - row * 0.4, building.size[2] / 2 + 0.01]}>
                    <boxGeometry args={[building.size[0] * 0.25, 0.2, 0.02]} />
                    <meshStandardMaterial 
                      color="#1a1a2e" 
                      emissive="#4A78AB"
                      emissiveIntensity={Math.random() > 0.5 ? 0.3 : 0}
                      roughness={0.1} 
                      metalness={0.9} 
                    />
                  </mesh>
                  <mesh position={[building.size[0] * 0.25, building.size[1] / 2 - 1 - 0.3 - row * 0.4, building.size[2] / 2 + 0.01]}>
                    <boxGeometry args={[building.size[0] * 0.25, 0.2, 0.02]} />
                    <meshStandardMaterial 
                      color="#1a1a2e"
                      emissive="#D6AF5B"
                      emissiveIntensity={Math.random() > 0.5 ? 0.2 : 0}
                      roughness={0.1} 
                      metalness={0.9} 
                    />
                  </mesh>
                </group>
              ))}
            </group>
          </Float>
        ))}

        {/* Pin lokalizacji */}
        <Float speed={2} floatIntensity={0.3}>
          <group position={[0, 0, 0]}>
            <mesh ref={pinRef} position={[0, 1.8, 0]}>
              {/* Główka pina */}
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial 
                color="#D6AF5B" 
                emissive="#D6AF5B"
                emissiveIntensity={0.4}
                roughness={0.2} 
                metalness={0.7} 
              />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
              {/* Szpic pina */}
              <coneGeometry args={[0.12, 0.4, 16]} />
              <meshStandardMaterial 
                color="#D6AF5B" 
                emissive="#D6AF5B"
                emissiveIntensity={0.3}
                roughness={0.2} 
                metalness={0.7} 
              />
            </mesh>
            {/* Pierścień wokół pina */}
            <mesh position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.35, 0.02, 16, 32]} />
              <meshStandardMaterial 
                color="#D6AF5B" 
                transparent 
                opacity={0.5}
                emissive="#D6AF5B"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        </Float>

        {/* Premium klucz */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <group ref={keyRef} position={[2.2, 0.8, 0.3]} rotation={[0, 0, -0.3]}>
            {/* Główka klucza - ozdobna */}
            <mesh>
              <torusGeometry args={[0.3, 0.08, 16, 32]} />
              <meshStandardMaterial 
                color="#D6AF5B" 
                roughness={0.15} 
                metalness={0.9}
                emissive="#D6AF5B"
                emissiveIntensity={0.2}
              />
            </mesh>
            {/* Dekoracja w główce */}
            <mesh>
              <torusGeometry args={[0.18, 0.03, 16, 32]} />
              <meshStandardMaterial color="#B8942D" roughness={0.2} metalness={0.85} />
            </mesh>
            {/* Trzonek klucza */}
            <mesh position={[0, -0.6, 0]}>
              <boxGeometry args={[0.1, 0.8, 0.05]} />
              <meshStandardMaterial 
                color="#D6AF5B" 
                roughness={0.15} 
                metalness={0.9}
                emissive="#D6AF5B"
                emissiveIntensity={0.15}
              />
            </mesh>
            {/* Zęby klucza */}
            <mesh position={[0.12, -0.9, 0]}>
              <boxGeometry args={[0.14, 0.1, 0.05]} />
              <meshStandardMaterial color="#D6AF5B" roughness={0.15} metalness={0.9} />
            </mesh>
            <mesh position={[0.08, -0.75, 0]}>
              <boxGeometry args={[0.1, 0.08, 0.05]} />
              <meshStandardMaterial color="#D6AF5B" roughness={0.15} metalness={0.9} />
            </mesh>
            <mesh position={[0.1, -0.6, 0]}>
              <boxGeometry args={[0.1, 0.06, 0.05]} />
              <meshStandardMaterial color="#D6AF5B" roughness={0.15} metalness={0.9} />
            </mesh>
          </group>
        </Float>

        {/* Złote monety/wartość */}
        {[...Array(6)].map((_, i) => (
          <Float key={i} speed={2.5 + i * 0.3} floatIntensity={0.6}>
            <mesh 
              position={[
                Math.sin(i * 1.2) * 2.2,
                -0.8 + Math.cos(i * 0.8) * 0.3,
                Math.cos(i * 1.5) * 1.5
              ]} 
              rotation={[Math.PI / 2, 0, i * 0.5]}
            >
              <cylinderGeometry args={[0.12, 0.12, 0.04, 32]} />
              <meshStandardMaterial 
                color="#D6AF5B" 
                roughness={0.1} 
                metalness={0.95}
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
