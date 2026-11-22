import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Hogwarts Midnight Magical Lighting
    const ambientLight = new THREE.AmbientLight(0x15182A, 1.4); // Hogwarts Navy Ambient
    scene.add(ambientLight);

    const keyGoldLight = new THREE.DirectionalLight(0xF3D58A, 2.8); // Warm Candlelight & Starlight
    keyGoldLight.position.set(16, 22, 18);
    scene.add(keyGoldLight);

    const burgundyRimLight = new THREE.DirectionalLight(0x762E42, 1.8); // Deep Burgundy Rim Glow
    burgundyRimLight.position.set(-18, -12, 10);
    scene.add(burgundyRimLight);

    const coreGoldLight = new THREE.PointLight(0xD6B36A, 2.2, 50); // Radiant Core Beacon
    coreGoldLight.position.set(0, 0, 0);
    scene.add(coreGoldLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 3. Central Enchanted Celestial Astrolabe (Faceted Antique Gold Relic)
    const coreGeo = new THREE.IcosahedronGeometry(5.4, 0);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD6B36A, // Antique Gold
      roughness: 0.32,
      metalness: 0.82,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, goldMat);
    mainGroup.add(coreMesh);

    // Glowing Runic Edge Filigree
    const wireGeo = new THREE.WireframeGeometry(coreGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xF3D58A,
      transparent: true,
      opacity: 0.55,
    });
    const creaseLines = new THREE.LineSegments(wireGeo, wireMat);
    coreMesh.add(creaseLines);

    // Inner Celestial Star (Magical Radiant Gold)
    const innerGeo = new THREE.OctahedronGeometry(3.6, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xF3D58A,
      roughness: 0.22,
      metalness: 0.9,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    const innerWireGeo = new THREE.WireframeGeometry(innerGeo);
    const innerCrease = new THREE.LineSegments(innerWireGeo, new THREE.LineBasicMaterial({ color: 0xD6B36A, transparent: true, opacity: 0.65 }));
    innerMesh.add(innerCrease);

    // Central Philosopher's Relic Core (Enchanted Burgundy Crystal)
    const jewelGeo = new THREE.TetrahedronGeometry(1.7, 0);
    const burgundyMat = new THREE.MeshStandardMaterial({
      color: 0x8E3850,
      roughness: 0.2,
      metalness: 0.6,
      flatShading: true,
    });
    const jewelMesh = new THREE.Mesh(jewelGeo, burgundyMat);
    mainGroup.add(jewelMesh);

    // 4. Armillary Sphere Orbital Celestial Rings
    const ringGeo1 = new THREE.TorusGeometry(7.6, 0.1, 8, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xD6B36A,
      metalness: 0.85,
      roughness: 0.3,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat);
    mainGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(8.8, 0.08, 8, 48);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat);
    ringMesh2.rotation.x = Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 6;
    mainGroup.add(ringMesh2);

    // 5. Orbiting Enchanted Celestial Glyphs & Crystals
    const orbitGroup = new THREE.Group();
    mainGroup.add(orbitGroup);

    const magicColors = [0xD6B36A, 0xF3D58A, 0x762E42, 0x245B43, 0xE9D9B5, 0xB8BAC8];
    const cutouts: THREE.Mesh[] = [];

    for (let i = 0; i < 16; i++) {
      const radius = 9.2 + (i % 3) * 2.2;
      const angle = (i / 16) * Math.PI * 2;
      const elevation = Math.sin(i * 1.6) * 4.5;

      const shapeGeo = (i % 2 === 0) 
        ? new THREE.OctahedronGeometry(0.7, 0) 
        : new THREE.TetrahedronGeometry(0.85, 0);

      const color = magicColors[i % magicColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.75,
        flatShading: true,
      });

      const cutout = new THREE.Mesh(shapeGeo, mat);
      cutout.position.set(
        Math.cos(angle) * radius,
        elevation,
        Math.sin(angle) * radius
      );
      cutout.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      
      orbitGroup.add(cutout);
      cutouts.push(cutout);
    }

    // 6. Floating Golden Stardust Swarm
    const confettiCount = 180;
    const confettiGeo = new THREE.BufferGeometry();
    const cCoords = new Float32Array(confettiCount * 3);
    const cColors = new Float32Array(confettiCount * 3);

    const magicPalette = [
      new THREE.Color(0xF3D58A), // Magical Gold
      new THREE.Color(0xD6B36A), // Antique Gold
      new THREE.Color(0xE9D9B5), // Parchment Starlight
      new THREE.Color(0x8E3850), // Enchanted Burgundy
      new THREE.Color(0x2E7356), // Emerald Spark
      new THREE.Color(0xB8BAC8), // Spell Silver
    ];

    for (let i = 0; i < confettiCount; i++) {
      cCoords[i * 3] = (Math.random() - 0.5) * 48;
      cCoords[i * 3 + 1] = (Math.random() - 0.5) * 48;
      cCoords[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const clr = magicPalette[Math.floor(Math.random() * magicPalette.length)];
      cColors[i * 3] = clr.r;
      cColors[i * 3 + 1] = clr.g;
      cColors[i * 3 + 2] = clr.b;
    }

    confettiGeo.setAttribute('position', new THREE.BufferAttribute(cCoords, 3));
    confettiGeo.setAttribute('color', new THREE.BufferAttribute(cColors, 3));

    const confettiMat = new THREE.PointsMaterial({
      size: 0.36,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const confettiPoints = new THREE.Points(confettiGeo, confettiMat);
    scene.add(confettiPoints);

    // 7. Parallax Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      targetX = (clientX / window.innerWidth - 0.5) * 2;
      targetY = (clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // 8. Responsive Resizing
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // 9. Render Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera/group interpolation
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      mainGroup.rotation.y = elapsed * 0.1 + currentX * 0.35;
      mainGroup.rotation.x = Math.sin(elapsed * 0.08) * 0.12 - currentY * 0.25;

      coreMesh.rotation.y = elapsed * 0.15;
      coreMesh.rotation.z = Math.sin(elapsed * 0.1) * 0.08;

      innerMesh.rotation.y = -elapsed * 0.22;
      innerMesh.rotation.x = elapsed * 0.16;

      jewelMesh.rotation.y = elapsed * 0.4;
      jewelMesh.rotation.z = -elapsed * 0.3;

      ringMesh1.rotation.z = elapsed * 0.12;
      ringMesh2.rotation.x = -elapsed * 0.15;

      orbitGroup.rotation.y = -elapsed * 0.08;
      orbitGroup.rotation.x = Math.sin(elapsed * 0.05) * 0.15;

      cutouts.forEach((cutout, idx) => {
        cutout.rotation.x += 0.015 * (idx % 2 === 0 ? 1 : -1);
        cutout.rotation.y += 0.02;
      });

      confettiPoints.rotation.y = -elapsed * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      goldMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      innerWireGeo.dispose();
      jewelGeo.dispose();
      burgundyMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat.dispose();
      confettiGeo.dispose();
      confettiMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 85%)',
      }}
      aria-hidden="true"
    />
  );
};
