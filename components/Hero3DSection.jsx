// /components/Hero3DSection.jsx
"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function FloatingCube() {
  const meshRef = useRef();

  useEffect(() => {
    let frameId;
    const animate = () => {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00ADB5" />
    </mesh>
  );
}

export default function Hero3DSection() {
  return (
    <div className="w-full h-[80vh] bg-black text-white">
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} />
        <OrbitControls enableZoom={false} />
        <FloatingCube />
      </Canvas>
      <div className="absolute top-[30%] left-0 w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Bygg din AI-startup</h1>
        <p className="text-lg md:text-xl mt-4 text-gray-300">
          Interaktiv 3D-upplevelse – powered by Startpilot
        </p>
      </div>
    </div>
  );
}
