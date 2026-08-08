import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./Model";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 40],
        fov: 10,
      }}
      shadows
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <ambientLight intensity={0.15} />

      <directionalLight position={[8, 6, 10]} intensity={2} />

      <directionalLight position={[-8, 5, 8]} intensity={1.2} />

      <directionalLight position={[0, -5, 6]} intensity={0.5} />

      <Environment
        preset="studio"
        background={false}
        environmentIntensity={2.5}
        environmentRotation={[0, Math.PI / 4, 0]}
      />

      <Model />
    </Canvas>
  );
}
