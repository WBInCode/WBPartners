import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import type { Group } from 'three';

/**
 * InCodeScene - Profesjonalna scena 3D dla WB InCode
 * - Terminal 3D z kodem
 * - Symbole </> z animacją
 * - Połączone węzły reprezentujące architekturę
 * - Particles danych
 */
export function InCodeScene() {
  const groupRef = useRef<Group>(null);
  const terminalRef = useRef<Group>(null);
  const codeRef = useRef<Group>(null);

  // Linie kodu - animowane
  const codeLines = useMemo(() => [
    { width: 1.2, color: '#52F066', delay: 0 },
    { width: 0.8, color: '#3DD955', delay: 0.5 },
    { width: 1.0, color: '#52F066', delay: 1 },
    { width: 0.6, color: '#2BC93F', delay: 1.5 },
    { width: 0.9, color: '#3DD955', delay: 2 },
  ], []);

  // Węzły architektury
  const nodes = useMemo(() => [
    { pos: [1.8, 1, 0] as [number, number, number], connections: [1, 2] },
    { pos: [2.5, 0, 0.5] as [number, number, number], connections: [2] },
    { pos: [2, -1, 0] as [number, number, number], connections: [] },
  ], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.15;
    }

    if (terminalRef.current) {
      terminalRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <>
      {/* Oświetlenie */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 2, 3]} intensity={1.2} color="#52F066" />
      <pointLight position={[-3, -1, 2]} intensity={0.6} color="#3DD955" />

      <group ref={groupRef}>
        {/* Terminal 3D */}
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
          <group ref={terminalRef} position={[-0.8, 0, 0]}>
            {/* Ramka terminala */}
            <RoundedBox args={[2.2, 1.6, 0.15]} radius={0.08}>
              <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.3} />
            </RoundedBox>
            
            {/* Ekran */}
            <mesh position={[0, 0, 0.08]}>
              <planeGeometry args={[2, 1.4]} />
              <meshStandardMaterial 
                color="#0d1117" 
                roughness={0.9}
                emissive="#0d1117"
                emissiveIntensity={0.1}
              />
            </mesh>

            {/* Linie kodu */}
            <group ref={codeRef} position={[-0.8, 0.5, 0.1]}>
              {codeLines.map((line, i) => (
                <Float key={i} speed={3} floatIntensity={0.05}>
                  <mesh position={[line.width / 2, -i * 0.22, 0]}>
                    <boxGeometry args={[line.width, 0.08, 0.02]} />
                    <meshStandardMaterial
                      color={line.color}
                      emissive={line.color}
                      emissiveIntensity={0.6}
                      roughness={0.2}
                    />
                  </mesh>
                </Float>
              ))}
            </group>

            {/* Kursor migający */}
            <Float speed={8} floatIntensity={0.02}>
              <mesh position={[-0.7, -0.55, 0.1]}>
                <boxGeometry args={[0.08, 0.12, 0.02]} />
                <meshStandardMaterial
                  color="#52F066"
                  emissive="#52F066"
                  emissiveIntensity={1}
                />
              </mesh>
            </Float>

            {/* Przyciski okna */}
            <group position={[-0.85, 0.7, 0.09]}>
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#FF5F56" emissive="#FF5F56" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.12, 0, 0]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#FFBD2E" emissive="#FFBD2E" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.24, 0, 0]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#27CA40" emissive="#27CA40" emissiveIntensity={0.5} />
              </mesh>
            </group>
          </group>
        </Float>

        {/* Symbol </> duży */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <group position={[2, 0.5, 0.5]} scale={0.8}>
            {/* < */}
            <mesh position={[-0.5, 0, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial 
                color="#52F066" 
                emissive="#52F066"
                emissiveIntensity={0.4}
                roughness={0.2} 
                metalness={0.8} 
              />
            </mesh>
            <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial 
                color="#52F066" 
                emissive="#52F066"
                emissiveIntensity={0.4}
                roughness={0.2} 
                metalness={0.8} 
              />
            </mesh>
            <mesh position={[-0.7, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial 
                color="#52F066" 
                emissive="#52F066"
                emissiveIntensity={0.4}
                roughness={0.2} 
                metalness={0.8} 
              />
            </mesh>

            {/* / */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
              <boxGeometry args={[0.08, 0.9, 0.08]} />
              <meshStandardMaterial 
                color="#3DD955" 
                emissive="#3DD955"
                emissiveIntensity={0.5}
                roughness={0.2} 
                metalness={0.8} 
              />
            </mesh>

            {/* > */}
            <mesh position={[0.5, 0, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial 
                color="#52F066" 
                emissive="#52F066"
                emissiveIntensity={0.4}
                roughness={0.2} 
                metalness={0.8} 
              />
            </mesh>
            <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial 
                color="#52F066" 
                emissive="#52F066"
                emissiveIntensity={0.4}
                roughness={0.2} 
                metalness={0.8} 
              />
            </mesh>
            <mesh position={[0.7, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial 
                color="#52F066" 
                emissive="#52F066"
                emissiveIntensity={0.4}
                roughness={0.2} 
                metalness={0.8} 
              />
            </mesh>
          </group>
        </Float>

        {/* Węzły architektury - połączone kulki */}
        {nodes.map((node, i) => (
          <Float key={i} speed={2 + i * 0.3} floatIntensity={0.3}>
            <mesh position={node.pos}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial
                color="#52F066"
                emissive="#52F066"
                emissiveIntensity={0.3}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
          </Float>
        ))}

        {/* Linie łączące węzły */}
        <mesh position={[2.15, 0.5, 0.25]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
          <meshStandardMaterial color="#3DD955" transparent opacity={0.6} />
        </mesh>
        <mesh position={[2.25, -0.5, 0.25]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
          <meshStandardMaterial color="#3DD955" transparent opacity={0.6} />
        </mesh>

        {/* Data particles */}
        {[...Array(15)].map((_, i) => (
          <Float key={i} speed={4 + i * 0.2} floatIntensity={0.8}>
            <mesh
              position={[
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 2,
              ]}
              scale={0.03 + Math.random() * 0.03}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#52F066' : '#3DD955'}
                emissive={i % 2 === 0 ? '#52F066' : '#3DD955'}
                emissiveIntensity={0.5}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
}
