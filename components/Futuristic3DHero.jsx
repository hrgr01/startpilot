// components/Futuristic3DHero.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";

function RotatingSphere() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}> {/* Lite vriden från start */}
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color="#0ff" wireframe={true} />
    </mesh>
  );
}

export default function Futuristic3DHero() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Stars radius={50} depth={50} count={5000} factor={4} fade={true} />
          <RotatingSphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
