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
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Realistic Paper Craft Lighting (Key daylight, soft paper bounce, tactile contrast)
    const ambientLight = new THREE.AmbientLight(0xFFF9F0, 1.6);
    scene.add(ambientLight);

    const keySunLight = new THREE.DirectionalLight(0xFFFFFF, 2.4);
    keySunLight.position.set(16, 22, 18);
    scene.add(keySunLight);

    const cobaltFillLight = new THREE.DirectionalLight(0x3155E7, 1.2);
    cobaltFillLight.position.set(-18, -12, 10);
    scene.add(cobaltFillLight);

    const orangeAccentLight = new THREE.PointLight(0xFF7139, 1.8, 60);
    orangeAccentLight.position.set(0, -12, 12);
    scene.add(orangeAccentLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 3. Central Folded Origami Polyhedron (Faceted Paper Sculpture)
    const coreGeo = new THREE.IcosahedronGeometry(5.4, 0); // Low-poly flat faces like folded paper
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xFDFCF7, // Ivory paper sheet
      roughness: 0.95,
      metalness: 0.04,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, paperMat);
    mainGroup.add(coreMesh);

    // Ink crease edges along the folds
    const wireGeo = new THREE.WireframeGeometry(coreGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x202020,
      transparent: true,
      opacity: 0.35,
    });
    const creaseLines = new THREE.LineSegments(wireGeo, wireMat);
    coreMesh.add(creaseLines);

    // Inner Origami Star (Butter Yellow / Cobalt Paper facets)
    const innerGeo = new THREE.OctahedronGeometry(3.6, 0);
    const yellowPaperMat = new THREE.MeshStandardMaterial({
      color: 0xFFD85A,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, yellowPaperMat);
    mainGroup.add(innerMesh);

    const innerWireGeo = new THREE.WireframeGeometry(innerGeo);
    const innerCrease = new THREE.LineSegments(innerWireGeo, new THREE.LineBasicMaterial({ color: 0x202020, transparent: true, opacity: 0.4 }));
    innerMesh.add(innerCrease);

    // Central Radiant Paper Core (Bright Orange Origami Tetrahedron)
    const jewelGeo = new THREE.TetrahedronGeometry(1.6, 0);
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xFF7139,
      roughness: 0.85,
      flatShading: true,
    });
    const jewelMesh = new THREE.Mesh(jewelGeo, orangeMat);
    mainGroup.add(jewelMesh);

    // 4. Orbiting Paper Ribbons / Geometric Origami Cutouts
    const orbitGroup = new THREE.Group();
    mainGroup.add(orbitGroup);

    const paperColors = [0x3155E7, 0xFF7139, 0xFFD85A, 0xE94B50, 0xB7A5E8, 0xFDFCF7];
    const cutouts: THREE.Mesh[] = [];

    // Create 18 floating paper cutout planes around the sculpture
    for (let i = 0; i < 18; i++) {
      const radius = 8.5 + (i % 4) * 2.2;
      const angle = (i / 18) * Math.PI * 2;
      const elevation = Math.sin(i * 1.5) * 5;

      // Varied paper shapes: triangular dart or folded quad
      const shapeGeo = (i % 2 === 0) 
        ? new THREE.ConeGeometry(0.9, 1.8, 3) 
        : new THREE.BoxGeometry(1.4, 1.4, 0.05);

      const color = paperColors[i % paperColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.92,
        metalness: 0.02,
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

    // 5. Drifting Paper Confetti Particles
    const confettiCount = 180;
    const confettiGeo = new THREE.BufferGeometry();
    const cCoords = new Float32Array(confettiCount * 3);
    const cColors = new Float32Array(confettiCount * 3);

    const confettiPalette = [
      new THREE.Color(0x3155E7), // Cobalt
      new THREE.Color(0xFF7139), // Orange
      new THREE.Color(0xFFD85A), // Butter Yellow
      new THREE.Color(0xE94B50), // Cherry Red
      new THREE.Color(0xB7A5E8), // Soft Lavender
      new THREE.Color(0x202020), // Deep Ink speckles
    ];

    for (let i = 0; i < confettiCount; i++) {
      cCoords[i * 3] = (Math.random() - 0.5) * 48;
      cCoords[i * 3 + 1] = (Math.random() - 0.5) * 48;
      cCoords[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const clr = confettiPalette[Math.floor(Math.random() * confettiPalette.length)];
      cColors[i * 3] = clr.r;
      cColors[i * 3 + 1] = clr.g;
      cColors[i * 3 + 2] = clr.b;
    }

    confettiGeo.setAttribute('position', new THREE.BufferAttribute(cCoords, 3));
    confettiGeo.setAttribute('color', new THREE.BufferAttribute(cColors, 3));

    const confettiMat = new THREE.PointsMaterial({
      size: 0.32,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const confettiPoints = new THREE.Points(confettiGeo, confettiMat);
    scene.add(confettiPoints);

    // 6. Smooth Mouse Parallax Tracking
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

    // 7. Responsive Resizing
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // 8. Render Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera/group interpolation with tactile damping
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

      orbitGroup.rotation.y = -elapsed * 0.08;
      orbitGroup.rotation.x = Math.sin(elapsed * 0.05) * 0.15;

      // Gentle wobble of orbiting cutouts
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
      paperMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      yellowPaperMat.dispose();
      innerWireGeo.dispose();
      jewelGeo.dispose();
      orangeMat.dispose();
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
