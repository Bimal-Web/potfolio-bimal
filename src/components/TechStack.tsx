import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/javascript.webp",
  "/images/react2.webp",
  "/images/html5.webp",
  "/images/davinci.webp",
  "/images/aftereffects.webp",
  "/images/blender2.webp",
  "/images/css3.webp",
  "/images/bootstrap.webp",
  "/images/git.webp",
  "/images/bash2.webp",
  "/images/hydra.webp",
  "/images/nmap.webp",
  "/images/metasploit.webp",
  "/images/aws.webp",
  "/images/python2.webp",
  "/images/linux2.webp",
  "/images/illustrator.webp",
  "/images/java.webp",
  "/images/aircrack.webp",
  "/images/beef.webp",
  "/images/iot.webp",
  "/images/photoshop.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(imageUrls.length)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

/**
 * Dynamically adjusts camera distance based on viewport aspect ratio:
 * On desktop (wide), camera distance remains at default z = 20.
 * On mobile/tablet (portrait), camera pulls back smoothly so the 3D bubble cluster
 * has ample room to form a round cluster in the center without being squished.
 */
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    if (aspect < 1.1) {
      // Mobile / portrait: scale z back gracefully up to 26
      const targetZ = Math.min(26, 20 * (1.1 / Math.max(0.6, aspect)));
      camera.position.z = targetZ;
    } else {
      camera.position.z = 20;
    }
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" ref={containerRef} id="techstack">
      {/* 1. First place: The title header */}
      <div className="techstack-header">
        <h2>MY TECHSTACK</h2>
      </div>

      {/* 2. Then those bubbles: 3D interactive physics canvas */}
      <div className="techstack-canvas-container">
        <Canvas
          shadows={false}
          dpr={[1, 1.5]}
          gl={{
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true,
            antialias: false,
          }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ResponsiveCamera />
          <ambientLight intensity={1} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow={false}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {spheres.map((props, i) => (
              <SphereGeo
                key={i}
                {...props}
                material={materials[i % materials.length]}
                isActive={isActive}
              />
            ))}
          </Physics>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false} multisampling={0}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} halfRes quality="low" />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

export default TechStack;
