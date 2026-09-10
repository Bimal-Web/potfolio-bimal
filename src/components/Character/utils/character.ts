import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const PASSWORD = "MyCharacter12";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = (onProgressCallback?: (progress: number) => void) => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      const KNOWN_SIZE = 181547476;
      let blobUrl: string;

      try {
        if (onProgressCallback) onProgressCallback(5);
        const decrypted = await decryptFile("/models/character.enc?v=2", PASSWORD);
        const blob = new Blob([decrypted], { type: "model/gltf-binary" });
        blobUrl = URL.createObjectURL(blob);
        if (onProgressCallback) onProgressCallback(20);
      } catch (err) {
        console.error("Failed to decrypt character model:", err);
        return reject(err);
      }

      loader.load(
        blobUrl,
        async (gltf) => {
          try {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                // Change clothing colors to match site theme
                if (mesh.material) {
                  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
                  if (mesh.name === "BODY.SHIRT") {
                    const newMat = (mat as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#8B4513");
                    mesh.material = newMat;
                  } else if (mesh.name === "Pant") {
                    const newMat = (mat as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000000");
                    mesh.material = newMat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();

            const footR = character.getObjectByName("footR");
            if (footR) footR.position.y = 3.36;
            const footL = character.getObjectByName("footL");
            if (footL) footL.position.y = 3.36;

            URL.revokeObjectURL(blobUrl);
            dracoLoader.dispose();
          } catch (err) {
            console.error("Error setting up character:", err);
            resolve(gltf);
          }
        },
        (xhr) => {
          const total = xhr.total > 0 ? xhr.total : KNOWN_SIZE;
          const raw = Math.min(100, Math.floor((xhr.loaded / total) * 100));
          const p = Math.min(99, 20 + Math.floor((raw * 79) / 100));
          if (onProgressCallback) {
            onProgressCallback(p);
          }
        },
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
