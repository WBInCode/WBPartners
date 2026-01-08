import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Mesh, Group } from 'three';

/**
 * IntroScene - Planeta Ziemia z prostą animacją
 * Stabilna wersja bez wyjazdu z boxa
 */
export function IntroScene() {
  const planetRef = useRef<Mesh>(null);
  const ringsRef = useRef<Group>(null);
  
  // Tekstura planety
  const planetTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    
    // Oceany
    ctx.fillStyle = '#1a75c4';
    ctx.fillRect(0, 0, size, size);
    
    // Lądy - zielone
    const landColor = '#4CAF50';
    
    // Ameryka Północna
    ctx.fillStyle = landColor;
    ctx.beginPath();
    ctx.moveTo(70, 80);
    ctx.lineTo(110, 65);
    ctx.lineTo(130, 90);
    ctx.lineTo(120, 130);
    ctx.lineTo(85, 145);
    ctx.lineTo(60, 120);
    ctx.closePath();
    ctx.fill();
    
    // Ameryka Południowa
    ctx.beginPath();
    ctx.moveTo(95, 200);
    ctx.lineTo(120, 195);
    ctx.lineTo(125, 260);
    ctx.lineTo(105, 310);
    ctx.lineTo(85, 290);
    ctx.lineTo(80, 230);
    ctx.closePath();
    ctx.fill();
    
    // Europa
    ctx.fillStyle = '#66BB6A';
    ctx.beginPath();
    ctx.moveTo(265, 70);
    ctx.lineTo(295, 60);
    ctx.lineTo(310, 80);
    ctx.lineTo(300, 105);
    ctx.lineTo(270, 100);
    ctx.closePath();
    ctx.fill();
    
    // Afryka
    ctx.fillStyle = landColor;
    ctx.beginPath();
    ctx.moveTo(275, 140);
    ctx.lineTo(310, 135);
    ctx.lineTo(325, 180);
    ctx.lineTo(320, 250);
    ctx.lineTo(290, 270);
    ctx.lineTo(265, 230);
    ctx.lineTo(260, 170);
    ctx.closePath();
    ctx.fill();
    
    // Azja
    ctx.fillStyle = '#66BB6A';
    ctx.beginPath();
    ctx.moveTo(340, 55);
    ctx.lineTo(400, 50);
    ctx.lineTo(430, 100);
    ctx.lineTo(420, 160);
    ctx.lineTo(370, 170);
    ctx.lineTo(330, 130);
    ctx.lineTo(325, 85);
    ctx.closePath();
    ctx.fill();
    
    // Australia
    ctx.fillStyle = landColor;
    ctx.beginPath();
    ctx.moveTo(405, 290);
    ctx.lineTo(450, 285);
    ctx.lineTo(465, 320);
    ctx.lineTo(455, 355);
    ctx.lineTo(420, 360);
    ctx.lineTo(400, 330);
    ctx.closePath();
    ctx.fill();
    
    // Bieguny
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(0, 0, size, 35);
    ctx.fillRect(0, size - 35, size, 35);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Wolna rotacja planety
    if (planetRef.current) {
      planetRef.current.rotation.y = t * 0.05;
    }
    
    // Delikatna rotacja pierścieni
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <>
      {/* Oświetlenie */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 3, 4]} intensity={1.2} />
      <pointLight position={[-3, 2, 2]} intensity={0.3} color="#64B5F6" />

      {/* Główna grupa - wycentrowana */}
      <group scale={0.85} position={[0, 0, 0]}>
        
        {/* Planeta */}
        <mesh ref={planetRef} rotation={[0.1, 0, 0.1]}>
          <sphereGeometry args={[1.3, 48, 48]} />
          <meshStandardMaterial
            map={planetTexture}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Atmosfera */}
        <mesh>
          <sphereGeometry args={[1.38, 32, 32]} />
          <meshBasicMaterial
            color="#64B5F6"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Pierścień orbitalny - prosty */}
        <group ref={ringsRef} rotation={[1.3, 0.2, 0]}>
          <mesh>
            <ringGeometry args={[1.6, 1.9, 64]} />
            <meshBasicMaterial
              color="#0A457B"
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* 4 punkty na orbicie - kolory marek */}
          {[0, 1, 2, 3].map((i) => {
            const colors = ['#DB5F1B', '#52F066', '#D6AF5B', '#8FD2E9'];
            const angle = (i / 4) * Math.PI * 2;
            const r = 1.75;
            return (
              <mesh 
                key={i} 
                position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}
                scale={0.06}
              >
                <sphereGeometry args={[1, 12, 12]} />
                <meshBasicMaterial color={colors[i]} />
              </mesh>
            );
          })}
        </group>
        
        {/* Gwiazdy w tle - małe, statyczne */}
        {Array.from({ length: 40 }).map((_, i) => (
          <mesh
            key={`star-${i}`}
            position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 5,
              -2 - Math.random() * 2
            ]}
            scale={0.015 + Math.random() * 0.02}
          >
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
        
        {/* Cień pod planetą */}
        <mesh position={[0.2, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.2, 0.6, 1]}>
          <circleGeometry args={[1, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.2} />
        </mesh>
      </group>
    </>
  );
}
