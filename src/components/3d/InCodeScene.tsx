import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import type { Group, Mesh } from 'three';

/**
 * InCodeScene - Terminal 3D z animowanym kodem
 * - Kolorowe prostokąty symulujące kod z efektem pisania
 * - Animowane particles w tle
 * - Migający kursor
 */

// Kolory składni (One Dark theme)
const COLORS = {
  purple: '#C678DD',
  blue: '#61AFEF',
  yellow: '#E5C07B',
  green: '#98C379',
  red: '#E06C75',
  gray: '#ABB2BF',
};

// Linie kodu jako segmenty kolorowych prostokątów
const CODE_LINES: { segments: { w: number; c: string; gap?: number }[] }[] = [
  // import React from "react";
  { segments: [{ w: 0.25, c: COLORS.purple }, { w: 0.2, c: COLORS.yellow, gap: 0.03 }, { w: 0.15, c: COLORS.purple, gap: 0.03 }, { w: 0.28, c: COLORS.green, gap: 0.03 }] },
  // pusta
  { segments: [] },
  // function App() {
  { segments: [{ w: 0.32, c: COLORS.purple }, { w: 0.15, c: COLORS.blue, gap: 0.03 }, { w: 0.08, c: COLORS.gray, gap: 0.02 }, { w: 0.03, c: COLORS.gray, gap: 0.03 }] },
  //   const [data] = useState([]);
  { segments: [{ w: 0.05, c: COLORS.gray }, { w: 0.22, c: COLORS.purple, gap: 0.02 }, { w: 0.25, c: COLORS.yellow, gap: 0.03 }, { w: 0.03, c: COLORS.gray, gap: 0.02 }, { w: 0.32, c: COLORS.blue, gap: 0.02 }] },
  // pusta
  { segments: [] },
  //   useEffect(() => {
  { segments: [{ w: 0.05, c: COLORS.gray }, { w: 0.35, c: COLORS.blue, gap: 0.02 }, { w: 0.25, c: COLORS.gray, gap: 0.02 }] },
  //     fetchData().then(setData);
  { segments: [{ w: 0.1, c: COLORS.gray }, { w: 0.38, c: COLORS.green, gap: 0.02 }, { w: 0.15, c: COLORS.gray, gap: 0.02 }, { w: 0.28, c: COLORS.yellow, gap: 0.02 }] },
  //   }, []);
  { segments: [{ w: 0.05, c: COLORS.gray }, { w: 0.2, c: COLORS.gray, gap: 0.02 }] },
  // pusta
  { segments: [] },
  //   return (
  { segments: [{ w: 0.05, c: COLORS.gray }, { w: 0.25, c: COLORS.purple, gap: 0.02 }, { w: 0.03, c: COLORS.gray, gap: 0.03 }] },
  //     <div className="app">
  { segments: [{ w: 0.1, c: COLORS.gray }, { w: 0.12, c: COLORS.red, gap: 0.02 }, { w: 0.38, c: COLORS.yellow, gap: 0.02 }, { w: 0.03, c: COLORS.red, gap: 0.02 }] },
  //       {data.map(item => (
  { segments: [{ w: 0.15, c: COLORS.gray }, { w: 0.15, c: COLORS.gray, gap: 0.02 }, { w: 0.12, c: COLORS.blue, gap: 0.02 }, { w: 0.22, c: COLORS.gray, gap: 0.02 }] },
  //         <Card key={item.id} />
  { segments: [{ w: 0.2, c: COLORS.gray }, { w: 0.18, c: COLORS.red, gap: 0.02 }, { w: 0.32, c: COLORS.yellow, gap: 0.02 }, { w: 0.08, c: COLORS.red, gap: 0.02 }] },
  //       ))}
  { segments: [{ w: 0.15, c: COLORS.gray }, { w: 0.12, c: COLORS.gray, gap: 0.02 }] },
  //     </div>
  { segments: [{ w: 0.1, c: COLORS.gray }, { w: 0.22, c: COLORS.red, gap: 0.02 }] },
  //   );
  { segments: [{ w: 0.05, c: COLORS.gray }, { w: 0.06, c: COLORS.gray, gap: 0.02 }] },
  // }
  { segments: [{ w: 0.03, c: COLORS.blue }] },
];

// Zlicz łączną liczbę segmentów
const TOTAL_SEGMENTS = CODE_LINES.reduce((sum, line) => sum + Math.max(1, line.segments.length), 0);
const TYPING_SPEED = 12; // segmentów na sekundę
const PAUSE_DURATION = 3; // sekundy pauzy po napisaniu całości
const CYCLE_DURATION = TOTAL_SEGMENTS / TYPING_SPEED + PAUSE_DURATION;

// Animowane particle w tle
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
            color="#52F066"
            emissive="#52F066"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Migający kursor - pozycja aktualizowana przez ref z InCodeScene
function Cursor({ cursorRef }: { cursorRef: React.RefObject<Mesh | null> }) {
  useFrame((state) => {
    if (cursorRef.current) {
      const blink = Math.sin(state.clock.elapsedTime * 5) > 0;
      cursorRef.current.visible = blink;
    }
  });
  
  return (
    <mesh ref={cursorRef} position={[-0.88, 0.48, 0.07]}>
      <boxGeometry args={[0.015, 0.045, 0.008]} />
      <meshStandardMaterial
        color="#52F066"
        emissive="#52F066"
        emissiveIntensity={1}
      />
    </mesh>
  );
}

// Komponent linii kodu - segmenty kontrolowane przez visibility w useFrame
function AnimatedCodeLines({ segmentRefsMap, cursorRef }: { 
  segmentRefsMap: React.MutableRefObject<Map<string, Mesh>>; 
  cursorRef: React.RefObject<Mesh | null>;
}) {
  // Pre-oblicz pozycje wszystkich segmentów
  const linesData = useMemo(() => {
    return CODE_LINES.map((line, lineIdx) => {
      const segments: { x: number; w: number; c: string }[] = [];
      let xOffset = -0.9;
      for (const seg of line.segments) {
        if (seg.gap) xOffset += seg.gap;
        segments.push({ x: xOffset + seg.w / 2, w: seg.w, c: seg.c });
        xOffset += seg.w;
      }
      return { lineIdx, segments, endX: xOffset };
    });
  }, []);
  
  // Pre-oblicz indeksy startowe dla każdej linii
  const lineStartIndices = useMemo(() => {
    const indices: number[] = [];
    let count = 0;
    for (const line of CODE_LINES) {
      indices.push(count);
      count += Math.max(1, line.segments.length);
    }
    return indices;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cycleTime = t % CYCLE_DURATION;
    const typingTime = Math.min(cycleTime, TOTAL_SEGMENTS / TYPING_SPEED);
    const globalProgress = Math.floor(typingTime * TYPING_SPEED);
    
    // Aktualizuj widoczność segmentów
    let cursorLine = 0;
    let cursorX = -0.88;
    
    for (let lineIdx = 0; lineIdx < CODE_LINES.length; lineIdx++) {
      const line = CODE_LINES[lineIdx];
      const lineStart = lineStartIndices[lineIdx];
      const lineLength = Math.max(1, line.segments.length);
      
      // Ile segmentów pokazać na tej linii
      const localProgress = globalProgress - lineStart;
      const visibleCount = Math.max(0, Math.min(localProgress, line.segments.length));
      
      // Aktualizuj widoczność meshów
      for (let segIdx = 0; segIdx < line.segments.length; segIdx++) {
        const mesh = segmentRefsMap.current.get(`${lineIdx}-${segIdx}`);
        if (mesh) {
          mesh.visible = segIdx < visibleCount;
        }
      }
      
      // Aktualizuj pozycję kursora
      if (globalProgress >= lineStart && globalProgress < lineStart + lineLength) {
        cursorLine = lineIdx;
        let xOffset = -0.9;
        for (let i = 0; i < visibleCount && i < line.segments.length; i++) {
          const seg = line.segments[i];
          if (seg.gap) xOffset += seg.gap;
          xOffset += seg.w;
        }
        cursorX = xOffset + 0.02;
      }
    }
    
    // Aktualizuj kursor
    if (cursorRef.current) {
      cursorRef.current.position.set(cursorX, 0.48 - cursorLine * 0.065, 0.07);
    }
  });

  return (
    <group>
      {linesData.map(({ lineIdx, segments }) => (
        <group key={lineIdx}>
          {/* Numer linii */}
          <mesh position={[-1.0, 0.48 - lineIdx * 0.065, 0.06]}>
            <boxGeometry args={[0.025, 0.025, 0.005]} />
            <meshStandardMaterial color="#4a5568" transparent opacity={0.5} />
          </mesh>
          
          {/* Segmenty kodu */}
          {segments.map((seg, segIdx) => (
            <mesh 
              key={segIdx}
              ref={(el) => {
                if (el) segmentRefsMap.current.set(`${lineIdx}-${segIdx}`, el);
              }}
              position={[seg.x, 0.48 - lineIdx * 0.065, 0.06]}
              visible={false}
            >
              <boxGeometry args={[seg.w, 0.038, 0.008]} />
              <meshStandardMaterial
                color={seg.c}
                emissive={seg.c}
                emissiveIntensity={0.4}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export function InCodeScene() {
  const groupRef = useRef<Group>(null);
  const cursorRef = useRef<Mesh>(null);
  const segmentRefsMap = useRef<Map<string, Mesh>>(new Map());

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
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#52F066" />

      {/* Animowane particles w tle */}
      <BackgroundParticles />

      <group ref={groupRef}>
        {/* Terminal 3D */}
        <group position={[0, 0, 0]}>
          {/* Ramka terminala */}
          <RoundedBox args={[2.3, 1.5, 0.1]} radius={0.06}>
            <meshStandardMaterial color="#1e1e2e" roughness={0.7} metalness={0.2} />
          </RoundedBox>
          
          {/* Ekran */}
          <mesh position={[0, -0.03, 0.055]}>
            <planeGeometry args={[2.1, 1.28]} />
            <meshStandardMaterial color="#0d1117" roughness={0.95} />
          </mesh>

          {/* Pasek tytułowy */}
          <mesh position={[0, 0.65, 0.055]}>
            <planeGeometry args={[2.1, 0.12]} />
            <meshStandardMaterial color="#2d2d3d" roughness={0.9} />
          </mesh>

          {/* Przyciski okna */}
          <group position={[-0.92, 0.65, 0.06]}>
            <mesh position={[0, 0, 0]}>
              <circleGeometry args={[0.025, 16]} />
              <meshStandardMaterial color="#FF5F56" emissive="#FF5F56" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0.07, 0, 0]}>
              <circleGeometry args={[0.025, 16]} />
              <meshStandardMaterial color="#FFBD2E" emissive="#FFBD2E" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0.14, 0, 0]}>
              <circleGeometry args={[0.025, 16]} />
              <meshStandardMaterial color="#27CA40" emissive="#27CA40" emissiveIntensity={0.3} />
            </mesh>
          </group>

          {/* Animowane linie kodu */}
          <AnimatedCodeLines segmentRefsMap={segmentRefsMap} cursorRef={cursorRef} />

          {/* Kursor */}
          <Cursor cursorRef={cursorRef} />
        </group>
      </group>
    </>
  );
}
