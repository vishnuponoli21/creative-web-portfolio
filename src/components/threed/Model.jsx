import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

export default function Model() {
  const { scene } = useGLTF("/models3d/phone25.glb");

  const group = useRef();

  const mouse = useRef({ x: 0, y: 0 });

  const lastMove = useRef(0);

  // // VIDEO TEXTURE
  // const videoTexture = useMemo(() => {
  //   const video = document.createElement("video");

  //   video.src = "src/assets/demo2.mp4";
  //   video.loop = true;
  //   video.muted = true;
  //   video.autoplay = true;
  //   video.playsInline = true;

  //   video.play();

  //   const texture = new THREE.VideoTexture(video);

  //   texture.colorSpace = THREE.SRGBColorSpace;
  //   texture.minFilter = THREE.LinearFilter;
  //   texture.magFilter = THREE.LinearFilter;

  //   return texture;
  // }, []);

  // // APPLY VIDEO TO SCREEN
  // useEffect(() => {
  //   scene.traverse((child) => {
  //     if (child.isMesh) {
  //       console.log("Mesh:", child.name);

  //       if (child.name === "Screen") {
  //         child.material = new THREE.MeshBasicMaterial({
  //           map: videoTexture,
  //           toneMapped: false,
  //         });
  //       }
  //     }
  //   });
  // }, [scene, videoTexture]);

  // MOUSE MOVEMENT
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;

      lastMove.current = performance.now();
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ANIMATION
  useFrame((state) => {
    if (!group.current) return;

    const idle = performance.now() - lastMove.current > 2000;

    if (idle) {
      // AUTO ROTATION

      group.current.rotation.y += 0.003;

      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        0,
        0.05,
      );
    } else {
      // MOUSE ROTATION (LIMITED)

      const targetX = THREE.MathUtils.clamp(
        -mouse.current.y * 0.15,
        -0.15,
        0.15,
      );

      const targetY = THREE.MathUtils.clamp(
        mouse.current.x * 0.25,
        -0.25,
        0.25,
      );

      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetX,
        0.08,
      );

      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetY,
        0.08,
      );
    }

    // FLOATING

    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.3) * 0.15;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models3d/phone14.glb");
