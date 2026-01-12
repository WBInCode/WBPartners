import { Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

interface SceneWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  /** Optional accent color for the fallback gradient */
  fallbackColor?: string;
}

/**
 * SceneWrapper - wrapper dla scen 3D
 * - Suspense z fallback
 * - Lazy loading ready
 * - Canvas z podstawową konfiguracją
 * - Animacje 3D zawsze włączone
 */
export function SceneWrapper({
  children,
  className = '',
  cameraPosition = [0, 0, 5],
}: SceneWrapperProps) {
  return (
    <div className={className}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: cameraPosition, fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[var(--wb-primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function DefaultFallback({ color }: { color?: string }) {
  const bgColor = color || 'var(--wb-primary)';
  return (
    <div 
      className="w-full h-full flex items-center justify-center rounded-2xl"
      style={{ 
        background: `linear-gradient(135deg, ${bgColor}10, ${bgColor}20)` 
      }}
    >
      <div 
        className="w-24 h-24 rounded-xl"
        style={{ backgroundColor: `${bgColor}30` }}
      />
    </div>
  );
}

export { LoadingFallback, DefaultFallback };
