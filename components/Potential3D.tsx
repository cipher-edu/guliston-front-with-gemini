
// @ts-nocheck
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

const TechSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x += mouse.y * 0.2;
      meshRef.current.rotation.z += mouse.x * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.8}>
      <MeshDistortMaterial
        color="#00A676"
        attach="material"
        distort={0.4}
        speed={2.5}
        roughness={0.1}
        metalness={0.9}
        emissive="#00A676"
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
};

const NodeNetwork = () => {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      pointsRef.current.rotation.x = mouse.y * 0.1;
      pointsRef.current.rotation.z = mouse.x * 0.1;
    }
  });

  return (
    <Points ref={pointsRef}>
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
        color="#FFA600"
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const DataLines = () => {
  const linesRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = -state.clock.getElapsedTime() * 0.05;
    }
  });

  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 6; i++) {
      const radius = 4 + Math.random() * 2;
      temp.push({
        radius,
        speed: 0.5 + Math.random(),
        offset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((l, i) => (
        <mesh key={i} rotation={[Math.random(), Math.random(), 0]}>
          <ringGeometry args={[l.radius, l.radius + 0.02, 64]} />
          <meshBasicMaterial color="#00A676" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

const Potential3D: React.FC = () => {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '500px' }}>
      <Suspense fallback={<div className="flex items-center justify-center h-full text-white/20">Yuklanmoqda...</div>}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 40 }} gl={{ alpha: true }}>
          <AdaptiveDpr pixelated />
          <ambientLight intensity={1} />
          <spotLight position={[15, 20, 10]} angle={0.25} penumbra={1} intensity={2} color="#00A676" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#FFA600" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
            <TechSphere />
            <NodeNetwork />
            <DataLines />
          </Float>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Potential3D;
