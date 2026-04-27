import { useEffect, useRef } from "react";
import * as THREE from "three";

const clampPixelRatio = () => Math.min(window.devicePixelRatio || 1, 1.65);

function makePointField({ count, spreadX, spreadY, spreadZ, size, opacity, palette }) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    const depth = Math.random();
    const sideBias = Math.random() > 0.55 ? 1 : -1;

    positions[i3] = (Math.random() - 0.5) * spreadX + sideBias * Math.random() * 1.2;
    positions[i3 + 1] = (Math.random() - 0.5) * spreadY;
    positions[i3 + 2] = (Math.random() - 0.5) * spreadZ - depth * 1.8;

    const base = palette[Math.floor(Math.random() * palette.length)].clone();
    const lift = new THREE.Color("#f4ffe8");
    if (Math.random() > 0.86) base.lerp(lift, 0.36);

    colors[i3] = base.r;
    colors[i3 + 1] = base.g;
    colors[i3 + 2] = base.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size,
    vertexColors: true,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return {
    mesh: new THREE.Points(geometry, material),
    geometry,
    material,
  };
}

function makeOrbitRing({ radiusX, radiusY, segments = 192, color = "#9dffd7", opacity = 0.18 }) {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * radiusX, Math.sin(a) * radiusY, 0));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return {
    mesh: new THREE.Line(geometry, material),
    geometry,
    material,
  };
}

function makeShard({ width, height, color = "#dfffee", opacity = 0.12 }) {
  const shape = new THREE.Shape();
  shape.moveTo(0, height * 0.52);
  shape.lineTo(width * 0.48, 0);
  shape.lineTo(width, height);
  shape.lineTo(0, height * 0.52);

  const geometry = new THREE.ShapeGeometry(shape);
  geometry.center();

  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });

  return {
    mesh: new THREE.Mesh(geometry, material),
    geometry,
    material,
  };
}

export default function ParticleArchiveScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 62 : 56,
      window.innerWidth / window.innerHeight,
      0.1,
      140
    );
    camera.position.set(0, 0, isMobile ? 8.4 : 8.1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(clampPixelRatio());
    renderer.domElement.className = "particleArchiveCanvas";
    mount.appendChild(renderer.domElement);

    const palette = [
      new THREE.Color("#baff73"),
      new THREE.Color("#5affc8"),
      new THREE.Color("#75a8ff"),
      new THREE.Color("#ecffd8"),
    ];

    const disposables = [];

    const backField = makePointField({
      count: isMobile ? 700 : 1350,
      spreadX: isMobile ? 10 : 15,
      spreadY: isMobile ? 8 : 9,
      spreadZ: 18,
      size: isMobile ? 0.012 : 0.016,
      opacity: 0.38,
      palette,
    });
    backField.mesh.position.z = -3.2;
    scene.add(backField.mesh);
    disposables.push(backField);

    const midField = makePointField({
      count: isMobile ? 420 : 860,
      spreadX: isMobile ? 8.5 : 12.5,
      spreadY: isMobile ? 6.2 : 7.2,
      spreadZ: 11,
      size: isMobile ? 0.018 : 0.023,
      opacity: 0.52,
      palette,
    });
    midField.mesh.position.z = -0.7;
    scene.add(midField.mesh);
    disposables.push(midField);

    const foreField = makePointField({
      count: isMobile ? 90 : 170,
      spreadX: isMobile ? 7.2 : 9.5,
      spreadY: isMobile ? 5.4 : 6.4,
      spreadZ: 5.2,
      size: isMobile ? 0.032 : 0.044,
      opacity: 0.34,
      palette,
    });
    foreField.mesh.position.z = 1.6;
    scene.add(foreField.mesh);
    disposables.push(foreField);

    const rig = new THREE.Group();
    rig.position.set(isMobile ? 1.95 : 2.95, isMobile ? -0.2 : -0.12, -0.85);
    rig.rotation.set(0.2, -0.5, -0.08);
    rig.scale.setScalar(isMobile ? 0.72 : 1);
    scene.add(rig);

    const rings = [
      makeOrbitRing({ radiusX: 1.95, radiusY: 0.72, color: "#baff73", opacity: 0.17 }),
      makeOrbitRing({ radiusX: 2.42, radiusY: 0.92, color: "#65ffd0", opacity: 0.11 }),
      makeOrbitRing({ radiusX: 1.36, radiusY: 0.42, color: "#dffff2", opacity: 0.14 }),
    ];

    rings.forEach((ring, index) => {
      ring.mesh.rotation.x = 1.18 + index * 0.16;
      ring.mesh.rotation.y = -0.36 + index * 0.22;
      ring.mesh.rotation.z = index * 0.95;
      rig.add(ring.mesh);
      disposables.push(ring);
    });

    const shards = [
      makeShard({ width: 0.55, height: 0.9, opacity: 0.12 }),
      makeShard({ width: 0.36, height: 0.72, opacity: 0.09 }),
      makeShard({ width: 0.44, height: 0.8, opacity: 0.10 }),
      makeShard({ width: 0.3, height: 0.62, opacity: 0.08 }),
    ];

    const shardLayout = [
      [0.88, 0.64, 0.26, 0.7, -0.22, 0.38],
      [-1.28, 0.22, -0.18, -0.35, 0.18, -0.45],
      [1.42, -0.62, -0.08, 0.2, 0.52, 0.8],
      [-0.42, -0.92, 0.34, -0.18, -0.42, 0.26],
    ];

    shards.forEach((shard, index) => {
      const [x, y, z, rx, ry, rz] = shardLayout[index];
      shard.mesh.position.set(x, y, z);
      shard.mesh.rotation.set(rx, ry, rz);
      rig.add(shard.mesh);
      disposables.push(shard);
    });

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollProgress = 0;
    let frameId = null;
    let visible = true;

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
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
      renderer.setPixelRatio(clampPixelRatio());
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

      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      backField.mesh.rotation.y = elapsed * 0.006 * motion + mouse.x * 0.035;
      backField.mesh.rotation.x = mouse.y * 0.018;
      backField.mesh.position.z = -3.2 + scrollProgress * 0.9;

      midField.mesh.rotation.y = -elapsed * 0.014 * motion + mouse.x * 0.068;
      midField.mesh.rotation.x = mouse.y * 0.03;
      midField.mesh.position.z = -0.7 + scrollProgress * 1.55;

      foreField.mesh.rotation.y = elapsed * 0.024 * motion + mouse.x * 0.12;
      foreField.mesh.rotation.x = mouse.y * 0.052;
      foreField.mesh.position.z = 1.6 + scrollProgress * 2.1;

      rig.rotation.y = -0.5 + Math.sin(elapsed * 0.28) * 0.08 + mouse.x * 0.11;
      rig.rotation.x = 0.2 + Math.cos(elapsed * 0.21) * 0.045 - mouse.y * 0.06;
      rig.rotation.z = -0.08 + Math.sin(elapsed * 0.18) * 0.025;
      rig.position.y = (isMobile ? -0.2 : -0.12) + Math.sin(elapsed * 0.34) * 0.08 - scrollProgress * 0.34;
      rig.position.z = -0.85 + Math.sin(elapsed * 0.24) * 0.18 + scrollProgress * 0.7;

      rings.forEach((ring, index) => {
        ring.mesh.rotation.z += (0.0015 + index * 0.0007) * motion;
        ring.material.opacity = (index === 0 ? 0.16 : 0.11) + Math.sin(elapsed * 0.9 + index) * 0.025;
      });

      shards.forEach((shard, index) => {
        shard.mesh.rotation.z += (index % 2 === 0 ? 0.0009 : -0.0007) * motion;
        shard.mesh.position.y += Math.sin(elapsed * 0.42 + index) * 0.0008 * motion;
      });

      const targetZ = (isMobile ? 8.4 : 8.1) - scrollProgress * 1.65;
      camera.position.z += (targetZ - camera.position.z) * 0.035;
      camera.position.x += (mouse.x * 0.42 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.26 - camera.position.y) * 0.04;
      camera.lookAt(isMobile ? 0.28 : 0.55, -0.04, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      disposables.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="particleArchiveScene" ref={mountRef} aria-hidden="true" />;
}
