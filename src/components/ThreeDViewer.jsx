import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

const ThreeDViewer = ({ modelURL }) => {
  const { scene } = useGLTF(modelURL);

  return (
    <Canvas className="w-full h-screen">
      <Suspense >
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 5, 5]} intensity={1.5} />
        <Environment files="/assets/8698.hdr" background />
        <OrbitControls />
        <mesh>
          <primitive object={scene} scale={[1, 1, 1]} />
        </mesh>
      </Suspense>
    </Canvas>
  );
};

export default ThreeDViewer;