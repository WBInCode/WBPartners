import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import type { Group, Mesh } from 'three';

/**
 * FoundationScene - Profesjonalna scena 3D dla WB Foundation
 * - Pulsujące serce z efektem glow
 * - Połączone dłonie symbolizujące wspólnotę
 * - Orbitujące postaci/ludzie
 * - Efekty świetlne nadziei
 */
export function FoundationScene() {
  const groupRef = useRef<Group>(null);
  const heartRef = useRef<Group>(null);
  const handsRef = useRef<Group>(null);
  const glowRef = useRef<Mesh>(null);

  // Orbitujące "postaci" - reprezentują społeczność
  const people = useMemo(() => [
    { angle: 0, radius: 2.2, size: 0.12, speed: 1 },
    { angle: Math.PI * 0.4, radius: 2, size: 0.1, speed: 1.2 },
    { angle: Math.PI * 0.8, radius: 2.3, size: 0.11, speed: 0.9 },
    { angle: Math.PI * 1.2, radius: 2.1, size: 0.13, speed: 1.1 },
    { angle: Math.PI * 1.6, radius: 2.4, size: 0.1, speed: 0.8 },
  ], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.12;
    }

    // Heart beating effect - bardziej realistyczne bicie
    if (heartRef.current) {
      const beat = 1 + Math.sin(t * 4) * 0.06 * Math.max(0, Math.sin(t * 4));
      heartRef.current.scale.set(beat, beat, beat);
    }

    // Glow pulsation
    if (glowRef.current) {
      const material = glowRef.current.material as any;
      if (material.opacity !== undefined) {
        material.opacity = 0.15 + Math.sin(t * 3) * 0.08;
      }
    }

    // Hands subtle movement
    if (handsRef.current) {
      handsRef.current.rotation.x = Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <>
      {/* Oświetlenie ciepłe i przyjazne */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 1, 3]} intensity={1.2} color="#8FD2E9" />
      <pointLight position={[-2, 2, 2]} intensity={0.6} color="#7BC4DB" />
      <pointLight position={[2, -1, 2]} intensity={0.4} color="#A3DCF0" />

      <group ref={groupRef}>
        {/* Główne serce - pulsujące */}
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <group ref={heartRef} position={[0, 0.5, 0]}>
            {/* Lewa część serca */}
            <Sphere args={[0.55, 32, 32]} position={[-0.38, 0.2, 0]}>
              <meshStandardMaterial 
                color="#8FD2E9" 
                roughness={0.25} 
                metalness={0.3} 
                emissive="#8FD2E9"
                emissiveIntensity={0.25}
              />
            </Sphere>
            {/* Prawa część serca */}
            <Sphere args={[0.55, 32, 32]} position={[0.38, 0.2, 0]}>
              <meshStandardMaterial 
                color="#8FD2E9" 
                roughness={0.25} 
                metalness={0.3}
                emissive="#8FD2E9"
                emissiveIntensity={0.25}
              />
            </Sphere>
            {/* Dolna część serca - stożek */}
            <mesh position={[0, -0.45, 0]} rotation={[0, 0, Math.PI]}>
              <coneGeometry args={[0.65, 1, 32]} />
              <meshStandardMaterial 
                color="#8FD2E9" 
                roughness={0.25} 
                metalness={0.3}
                emissive="#8FD2E9"
                emissiveIntensity={0.25}
              />
            </mesh>
            
            {/* Glow wokół serca */}
            <mesh ref={glowRef} scale={1.4}>
              <sphereGeometry args={[0.7, 32, 32]} />
              <meshBasicMaterial 
                color="#8FD2E9" 
                transparent 
                opacity={0.15}
              />
            </mesh>
          </group>
        </Float>

        {/* Dłonie podtrzymujące - stylizowane */}
        <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.15}>
          <group ref={handsRef} position={[0, -1, 0.3]}>
            {/* Lewa dłoń */}
            <group position={[-0.6, 0, 0]} rotation={[0.4, 0.3, 0.5]}>
              <mesh>
                <boxGeometry args={[0.5, 0.12, 0.7]} />
                <meshStandardMaterial 
                  color="#7BC4DB" 
                  roughness={0.35} 
                  metalness={0.25}
                />
              </mesh>
              {/* Palce */}
              {[...Array(4)].map((_, i) => (
                <mesh key={i} position={[0.15 - i * 0.1, 0.06, 0.4]}>
                  <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
                  <meshStandardMaterial color="#7BC4DB" roughness={0.35} />
                </mesh>
              ))}
              {/* Kciuk */}
              <mesh position={[0.3, 0, 0.1]} rotation={[0, 0, -0.5]}>
                <capsuleGeometry args={[0.04, 0.12, 4, 8]} />
                <meshStandardMaterial color="#7BC4DB" roughness={0.35} />
              </mesh>
            </group>
            
            {/* Prawa dłoń */}
            <group position={[0.6, 0, 0]} rotation={[0.4, -0.3, -0.5]}>
              <mesh>
                <boxGeometry args={[0.5, 0.12, 0.7]} />
                <meshStandardMaterial 
                  color="#7BC4DB" 
                  roughness={0.35} 
                  metalness={0.25}
                />
              </mesh>
              {/* Palce */}
              {[...Array(4)].map((_, i) => (
                <mesh key={i} position={[-0.15 + i * 0.1, 0.06, 0.4]}>
                  <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
                  <meshStandardMaterial color="#7BC4DB" roughness={0.35} />
                </mesh>
              ))}
              {/* Kciuk */}
              <mesh position={[-0.3, 0, 0.1]} rotation={[0, 0, 0.5]}>
                <capsuleGeometry args={[0.04, 0.12, 4, 8]} />
                <meshStandardMaterial color="#7BC4DB" roughness={0.35} />
              </mesh>
            </group>
          </group>
        </Float>

        {/* Orbitujące postaci/ludzie - społeczność */}
        {people.map((person, i) => (
          <Float key={i} speed={person.speed * 2} floatIntensity={0.4}>
            <group
              position={[
                Math.cos(person.angle) * person.radius,
                Math.sin(i * 0.5) * 0.5,
                Math.sin(person.angle) * person.radius,
              ]}
            >
              {/* Głowa */}
              <mesh position={[0, person.size * 1.5, 0]}>
                <sphereGeometry args={[person.size * 0.7, 16, 16]} />
                <meshStandardMaterial 
                  color="#A3DCF0" 
                  emissive="#8FD2E9"
                  emissiveIntensity={0.3}
                  roughness={0.3}
                />
              </mesh>
              {/* Ciało */}
              <mesh position={[0, 0, 0]}>
                <capsuleGeometry args={[person.size * 0.5, person.size * 1.5, 8, 16]} />
                <meshStandardMaterial 
                  color="#7BC4DB" 
                  emissive="#8FD2E9"
                  emissiveIntensity={0.2}
                  roughness={0.4}
                />
              </mesh>
            </group>
          </Float>
        ))}

        {/* Połączenia między ludźmi - linie społeczności */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[2.2, 0.015, 16, 64]} />
          <meshStandardMaterial 
            color="#8FD2E9" 
            transparent 
            opacity={0.4}
            emissive="#8FD2E9"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Gwiazdy nadziei */}
        {[...Array(8)].map((_, i) => (
          <Float key={i} speed={3 + i * 0.3} floatIntensity={0.8}>
            <mesh 
              position={[
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 3 + 0.5,
                (Math.random() - 0.5) * 3,
              ]} 
              rotation={[Math.random(), Math.random(), Math.random()]}
              scale={0.06 + Math.random() * 0.06}
            >
              <octahedronGeometry args={[1]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? '#8FD2E9' : '#A3DCF0'}
                emissive={i % 2 === 0 ? '#8FD2E9' : '#A3DCF0'}
                emissiveIntensity={0.6}
                roughness={0.1}
                metalness={0.8}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
}
