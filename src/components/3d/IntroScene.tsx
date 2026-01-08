import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh, Group } from 'three';

/**
 * IntroScene - Profesjonalna scena 3D dla WB Partners
 * - Główna kula szklana z efektem refrakcji
 * - Orbitujące elementy reprezentujące 4 marki
 * - Particles w tle
 * - Dynamiczne oświetlenie
 */
export function IntroScene() {
  const mainRef = useRef<Mesh>(null);
  const orbitRef = useRef<Group>(null);
  const particlesRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);

  // Generuj pozycje cząsteczek
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 2;
      temp.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ] as [number, number, number],
        scale: 0.02 + Math.random() * 0.04,
      });
    }
    return temp;
  }, []);

  // Kolory dla 4 marek
  const brandColors = useMemo(() => ['#DB5F1B', '#52F066', '#D6AF5B', '#8FD2E9'], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Główna kula - delikatna rotacja
    if (mainRef.current) {
      mainRef.current.rotation.y = t * 0.15;
      mainRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }

    // Orbitujące elementy
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.4;
    }

    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
    }

    // Animacja particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <>
      {/* Oświetlenie */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#4A78AB" />
      <pointLight position={[5, -5, -5]} intensity={0.4} color="#0A457B" />
      
      {/* Główna kula z distort */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={mainRef} scale={1.3}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#0A457B"
            roughness={0.15}
            metalness={0.9}
            distort={0.25}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Wewnętrzna świecąca kula */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh scale={0.6}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#4A78AB"
            emissive="#0A457B"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Orbitujące elementy - reprezentują 4 marki */}
      <group ref={orbitRef}>
        {brandColors.map((color, i) => {
          const angle = (i / brandColors.length) * Math.PI * 2;
          const radius = 2.2;
          return (
            <Float key={i} speed={2 + i * 0.3} floatIntensity={0.3}>
              <mesh
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(i * 0.8) * 0.4,
                  Math.sin(angle) * radius,
                ]}
                scale={0.18}
              >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.2}
                  metalness={0.8}
                  emissive={color}
                  emissiveIntensity={0.4}
                />
              </mesh>
              {/* Ślad za kulą */}
              <mesh
                position={[
                  Math.cos(angle - 0.3) * radius,
                  Math.sin(i * 0.8) * 0.4,
                  Math.sin(angle - 0.3) * radius,
                ]}
                scale={0.08}
              >
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
              </mesh>
            </Float>
          );
        })}
      </group>

      {/* Zewnętrzny pierścień główny */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#0A457B"
            roughness={0.2}
            metalness={0.95}
            emissive="#0A457B"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Drugi pierścień - skośny */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2, 0.015, 16, 80]} />
          <meshStandardMaterial
            color="#2A679D"
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>

      {/* Trzeci pierścień */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.4, 0.01, 16, 60]} />
          <meshStandardMaterial
            color="#4A78AB"
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      {/* Particles w tle */}
      <group ref={particlesRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={particle.position} scale={particle.scale}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#4A78AB" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </>
  );
}
