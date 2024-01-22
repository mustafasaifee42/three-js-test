/* eslint-disable no-inner-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { Datatype } from "../Types";
import { scaleLinear } from 'd3-scale';

interface Props {
  width: number;
  height: number;
  data: Datatype;
  colors: [string, string];
}

const BoxViewCanvas = (props: Props) => {
  const {
    width,
    height,
    data,
    colors,
  } = props
  const graphDiv = useRef<HTMLDivElement>(null);
  const colorScale = scaleLinear<string, string>()
    .domain([0, 1])
    .range(colors);
  useEffect(() => {
    if(graphDiv.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      camera.position.z = 5;
      renderer.setSize(width, height);
      graphDiv.current.appendChild(renderer.domElement);
  
      const geometry = new THREE.PlaneGeometry( 0.01, 0.01 );
      const material = new THREE.MeshBasicMaterial();
      const mesh  = new THREE.InstancedMesh(geometry, material, data.res_x * data.res_y);
      scene.add(mesh)
      const planes  = new THREE.Object3D()
      for (let  i = 0; i < data.res_x * data.res_y; i = i + 1) {
        planes.position.x = -5 + ((i % data.res_y) * 0.01);
        planes.position.y = 2.5 - (Math.floor(i / data.res_y) * 0.01);
        planes.position.z = 0;
        planes.updateMatrix()
        mesh.setMatrixAt(i, planes.matrix)
        mesh.setColorAt(i, new THREE.Color(data.data[i] === -1 ? '#000000' : colorScale(data.data[i])))
      }
      const controls = new MapControls( camera, window.document.body);

      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.25;

      controls.screenSpacePanning = true;

      controls.maxPolarAngle = Math.PI / 2;
      renderer.render(scene, camera);

      const animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        graphDiv.current?.removeChild(renderer.domElement);
      };

    }
  }, [graphDiv]);

  return <div ref={graphDiv} />;
};

export default BoxViewCanvas;
