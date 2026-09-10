import React, { useEffect, useRef } from "react";
import "./styles/FallingLeaves.css";

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayPhase: number;
}

interface FallingLeavesProps {
  active: boolean;
}

const LEAF_COLORS = [
  "#4ade80", // bright tea leaf green
  "#22c55e", // emerald tea green
  "#16a34a", // deep leaf green
  "#86efac", // soft sprout green
  "#15803d", // forest tea green
  "#a3e635", // lime tea green
];

export const FallingLeaves: React.FC<FallingLeavesProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let leaves: Leaf[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const createLeaf = (isInitial = false): Leaf => {
      const size = Math.random() * 14 + 10; // 10px - 24px
      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height * 0.7 - 50 : -30,
        size,
        speedY: Math.random() * 1.5 + 1.2, // falling speed
        speedX: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.4 + 0.6,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
        type: Math.floor(Math.random() * 3),
        swayAmplitude: Math.random() * 2 + 1,
        swayFrequency: Math.random() * 0.03 + 0.015,
        swayPhase: Math.random() * Math.PI * 2,
      };
    };

    // Spawn initial wave of leaves when activated
    if (active) {
      for (let i = 0; i < 30; i++) {
        leaves.push(createLeaf(true));
      }
    }

    let spawnTimer = 0;

    const drawLeafShape = (ctx: CanvasRenderingContext2D, size: number, type: number) => {
      ctx.beginPath();
      if (type === 0) {
        // Classic oval tea leaf
        ctx.moveTo(0, -size);
        ctx.bezierCurveTo(size * 0.6, -size * 0.5, size * 0.7, size * 0.4, 0, size);
        ctx.bezierCurveTo(-size * 0.7, size * 0.4, -size * 0.6, -size * 0.5, 0, -size);
      } else if (type === 1) {
        // Curved tea shoot leaf
        ctx.moveTo(0, -size);
        ctx.quadraticCurveTo(size * 0.8, -size * 0.2, 0, size * 0.9);
        ctx.quadraticCurveTo(-size * 0.4, 0, 0, -size);
      } else {
        // Slender mountain tea leaf with stem detail
        ctx.moveTo(0, -size * 1.1);
        ctx.bezierCurveTo(size * 0.5, -size * 0.4, size * 0.6, size * 0.5, 0, size);
        ctx.bezierCurveTo(-size * 0.6, size * 0.5, -size * 0.5, -size * 0.4, 0, -size * 1.1);
      }
      ctx.fill();

      // Leaf center vein line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.lineTo(0, size * 0.7);
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new leaves if active
      if (activeRef.current) {
        spawnTimer++;
        if (spawnTimer % 6 === 0 && leaves.length < 50) {
          leaves.push(createLeaf(false));
        }
      }

      // Update and draw leaves
      leaves.forEach((leaf) => {
        leaf.y += leaf.speedY;
        leaf.swayPhase += leaf.swayFrequency;
        leaf.x += Math.sin(leaf.swayPhase) * leaf.swayAmplitude + leaf.speedX;
        leaf.rotation += leaf.rotationSpeed;

        // Fade out near bottom
        let alpha = leaf.opacity;
        if (leaf.y > canvas.height - 120) {
          alpha *= Math.max(0, (canvas.height - leaf.y) / 120);
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = leaf.color;
        ctx.shadowColor = "rgba(34, 197, 94, 0.4)";
        ctx.shadowBlur = 8;

        drawLeafShape(ctx, leaf.size, leaf.type);
        ctx.restore();
      });

      // Filter out off-screen or faded leaves
      leaves = leaves.filter((leaf) => leaf.y < canvas.height + 40);

      // Continue loop if active or leaves still falling
      if (activeRef.current || leaves.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return <canvas ref={canvasRef} className={`falling-leaves-canvas ${active ? "active" : ""}`} />;
};

export default FallingLeaves;
