
// @ts-nocheck
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  Environment, 
  Sphere,
  Points,
  PointMaterial,
  Line
} from '@react-three/drei';
import * as THREE from 'three';

const DNAStrand = ({ offset = 0, color = "#00A676" }) => {
  const count = 30;
  const radius = 1.5;
  const heightStep = 0.3;

  const spheres = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 0.4) + offset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (i - count / 2) * heightStep;
      list.push({ pos: [x, y, z], scale: 0.12 });
    }
    return list;
  }, [offset]);

  return (
    <group>
      {spheres.map((s, i) => (
        <Sphere key={i} position={s.pos} args={[s.scale, 16, 16]}>
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={1.5} 
            toneMapped={false}
          />
        </Sphere>
      ))}
    </group>
  );
};

const DNABonds = () => {
  const count = 30;
  const radius = 1.5;
  const heightStep = 0.3;

  const lines = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      if (i % 2 === 0) { // Faqat har ikkinchi nuqtada bog'lovchi chiziq
        const angle1 = (i * 0.4);
        const angle2 = (i * 0.4) + Math.PI;
        
        const start = [Math.cos(angle1) * radius, (i - count / 2) * heightStep, Math.sin(angle1) * radius];
        const end = [Math.cos(angle2) * radius, (i - count / 2) * heightStep, Math.sin(angle2) * radius];
        list.push({ start, end });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {lines.map((l, i) => (
        <Line 
          key={i} 
          points={[l.start, l.end]} 
          color="#ffffff" 
          lineWidth={0.5} 
          transparent 
          opacity={0.2} 
        />
      ))}
    </group>
  );
};

const ParticleField = () => {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef();
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <PointMaterial 
        transparent 
        color="#00A676" 
        size={0.05} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.3}
      />
    </points>
  );
};

const HelixScene = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <DNAStrand offset={0} color="#00A676" />
      <DNAStrand offset={Math.PI} color="#FFA600" />
      <DNABonds />
    </group>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div 
      className="w-full h-full min-h-[450px]" 
      role="img" 
      aria-label="An interactive, rotating 3D DNA helix model representing scientific innovation and structural analysis."
    >
      <Suspense fallback={null}>
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00A676" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#FFA600" />
          
          <Environment preset="city" />
          
          <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
            <HelixScene />
          </Float>

          <ParticleField />

          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={false} 
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Hero3D;
