import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleArchiveScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.className = "particleArchiveCanvas";
    mount.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 900 : 1900;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const green = new THREE.Color("#baff73");
    const cyan = new THREE.Color("#5affc8");
    const pale = new THREE.Color("#ecffd8");

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 13;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 11;

      const mixed = green.clone().lerp(cyan, Math.random() * 0.55);
      if (Math.random() > 0.9) mixed.lerp(pale, 0.45);

      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.016 : 0.022,
      vertexColors: true,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const signalCount = isMobile ? 70 : 130;
    const signalPositions = new Float32Array(signalCount * 3);

    for (let i = 0; i < signalCount; i += 1) {
      const i3 = i * 3;

      signalPositions[i3] = (Math.random() - 0.5) * 10.5;
      signalPositions[i3 + 1] = (Math.random() - 0.5) * 6.5;
      signalPositions[i3 + 2] = (Math.random() - 0.5) * 9;
    }

    const signalGeometry = new THREE.BufferGeometry();
    signalGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(signalPositions, 3)
    );

    const signalMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.042 : 0.058,
      color: "#d8ff91",
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const signals = new THREE.Points(signalGeometry, signalMaterial);
    scene.add(signals);

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    let scrollProgress = 0;
    let frameId = null;
    let visible = true;

    const updateScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);
    };

    const onPointerMove = (event) => {
      mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    };

    const onVisibilityChange = () => {
      visible = !document.hidden;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    updateScroll();

    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!visible) return;

      const elapsed = clock.getElapsedTime();
      const motion = reducedMotion ? 0.12 : 1;

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      particles.rotation.y = elapsed * 0.018 * motion + mouse.x * 0.08;
      particles.rotation.x = mouse.y * 0.035;
      particles.position.z = scrollProgress * 1.65;

      signals.rotation.y = -elapsed * 0.026 * motion + mouse.x * 0.1;
      signals.rotation.x = mouse.y * 0.045;
      signals.position.z = scrollProgress * 2.1;

      const targetZ = 7.8 - scrollProgress * 2.2;
      camera.position.z += (targetZ - camera.position.z) * 0.035;
      camera.position.x += (mouse.x * 0.34 - camera.position.x) * 0.035;
      camera.position.y += (-mouse.y * 0.22 - camera.position.y) * 0.035;

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      particleGeometry.dispose();
      particleMaterial.dispose();
      signalGeometry.dispose();
      signalMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="particleArchiveScene" ref={mountRef} aria-hidden="true" />;
}