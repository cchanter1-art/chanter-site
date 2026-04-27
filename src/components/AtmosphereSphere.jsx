import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AtmosphereSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.position.set(isMobile ? 1.35 : 2.35, isMobile ? -0.62 : -0.06, 0);
    root.scale.setScalar(isMobile ? 0.68 : 0.86);
    scene.add(root);

    const orbGeometry = new THREE.SphereGeometry(1.72, isMobile ? 48 : 72, isMobile ? 32 : 48);
    const orbMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#13284f"),
      emissive: new THREE.Color("#0b3650"),
      emissiveIntensity: 0.12,
      metalness: 0.08,
      roughness: 0.18,
      transmission: 0.38,
      transparent: true,
      opacity: 0.22,
      thickness: 1.9,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      ior: 1.45,
      depthWrite: false,
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    root.add(orb);

    const wireGeometry = new THREE.SphereGeometry(1.78, isMobile ? 32 : 48, isMobile ? 18 : 24);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#9fc9ff"),
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.032 : 0.045,
      depthWrite: false,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    root.add(wire);

    const auraGeometry = new THREE.SphereGeometry(2.02, isMobile ? 32 : 48, isMobile ? 18 : 24);
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#54dbc5"),
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.010 : 0.018,
      depthWrite: false,
    });
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    root.add(aura);

    const particleCount = isMobile ? 55 : 95;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.35 + Math.random() * 1.65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#b8d8ff"),
      size: isMobile ? 0.012 : 0.016,
      transparent: true,
      opacity: isMobile ? 0.14 : 0.20,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    root.add(particles);

    const keyLight = new THREE.PointLight(0x9fc9ff, 1.15, 16);
    keyLight.position.set(-3.2, 2.5, 4.2);
    scene.add(keyLight);

    const tealLight = new THREE.PointLight(0x42d8c8, 0.62, 12);
    tealLight.position.set(2.8, -2.2, 3.8);
    scene.add(tealLight);

    const ambientLight = new THREE.AmbientLight(0x7f9fd6, 0.26);
    scene.add(ambientLight);

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        root.rotation.y = elapsed * 0.014;
        root.rotation.x = Math.sin(elapsed * 0.14) * 0.026;
        orb.rotation.y = elapsed * 0.042;
        wire.rotation.y = -elapsed * 0.024;
        wire.rotation.z = elapsed * 0.010;
        aura.rotation.y = elapsed * 0.014;
        particles.rotation.y = elapsed * 0.010;
        particles.rotation.x = Math.sin(elapsed * 0.08) * 0.016;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const nextIsMobile = window.matchMedia("(max-width: 768px)").matches;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, nextIsMobile ? 1.25 : 1.6));
      renderer.setSize(window.innerWidth, window.innerHeight);
      root.position.set(nextIsMobile ? 1.25 : 2.15, nextIsMobile ? -0.72 : -0.12, 0);
      root.scale.setScalar(nextIsMobile ? 0.78 : 1);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);

      scene.remove(root);
      scene.remove(keyLight);
      scene.remove(tealLight);
      scene.remove(ambientLight);

      orbGeometry.dispose();
      orbMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      auraGeometry.dispose();
      auraMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="c-atmosphere-sphere" ref={mountRef} aria-hidden="true" />;
}
