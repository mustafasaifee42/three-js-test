/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';

const Cube = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  useEffect(() => {
    // Set up scene
    camera.position.z = 5;
    renderer.setSize(window.innerWidth, window.innerHeight);
    (document.getElementById('instanced-cubes-container') as any).appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry( 0.01, 0.01 );
    const material = new THREE.MeshBasicMaterial();
    const mesh  = new THREE.InstancedMesh(geometry, material, 1000000);
    scene.add(mesh)
    // Create a single cube geometry
    const dummy  = new THREE.Object3D()
    for (let  j = 0; j < 1000000; j = j + 1) {
      dummy.position.x = -5 + ((j % 2000) * 0.01);
      dummy.position.y = 2.5 - (Math.floor(j / 2000) * 0.01);
      dummy.position.z = 0;
      dummy.updateMatrix()
      mesh.setMatrixAt(j, dummy.matrix)
      mesh.setColorAt(j, new THREE.Color(Math.random() * 0xFFFFFF))
    }

    const controls = new DragControls( [mesh], camera, renderer.domElement );
    controls.addEventListener( 'drag', render );

    function render() {

      renderer.render( scene, camera );

    }

    renderer.render(scene, camera);
    // Animation loop
    const handleScroll = (event: any) => {
      const fovIncrement = 0.1; // Adjust this value based on how fast you want the zoom
      camera.fov += event.deltaY * fovIncrement;
      camera.updateProjectionMatrix();
      render()
    };
    render()
    // Event listener for scroll
    window.addEventListener('wheel', handleScroll);
    // Clean up on component unmount
    return () => {
      window.removeEventListener('wheel', handleScroll);
      (document.getElementById('instanced-cubes-container') as any).removeChild(renderer.domElement);
    };
  }, []);

  return <div id="instanced-cubes-container" />;
};

export default Cube;
