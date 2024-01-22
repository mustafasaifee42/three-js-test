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
}

const BoxViewCanvas = (props: Props) => {
  const {
    width,
    height,
    data,
  } = props
  const graphDiv = useRef<HTMLDivElement>(null);
  const colorScale = scaleLinear<string, string>()
    .domain([0, 1])
    .range(['#000000', '#ffffff']);
  useEffect(() => {
    if(graphDiv.current) {
      const scene = new THREE.Scene();
      const scene2 = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      camera.position.z = 5;

      const geometry1 = new THREE.BoxGeometry();
      const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  
      const cube1 = new THREE.Mesh(geometry1, material1);
      scene2.add(cube1);
      /*
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      */
      renderer.setSize(width, height);
      graphDiv.current.appendChild(renderer.domElement);
  
      const geometry = new THREE.PlaneGeometry( 0.01, 0.01 );
      const material = new THREE.MeshBasicMaterial();
      const mesh  = new THREE.InstancedMesh(geometry, material, data.res_x * data.res_y);
      scene.add(mesh)
      // Create a single cube geometry
      const planes  = new THREE.Object3D()
      for (let  i = 0; i < data.res_x * data.res_y; i = i + 1) {
        planes.position.x = -5 + ((i % data.res_y) * 0.01);
        planes.position.y = 2.5 - (Math.floor(i / data.res_y) * 0.01);
        planes.position.z = 0;
        planes.updateMatrix()
        mesh.setMatrixAt(i, planes.matrix)
        mesh.setColorAt(i, new THREE.Color(colorScale(data.data[i])))
      }
      const controls = new MapControls( camera, window.document.body);

      //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.25;

      controls.screenSpacePanning = true;

      controls.maxPolarAngle = Math.PI / 2;
  /*
      function render() {
        raycaster.setFromCamera( pointer, camera );
        const intersection = raycaster.intersectObjects( [mesh] );
        if ( intersection.length > 0 ) {
  
          // const instanceId = intersection[ 0 ].instanceId;
          // console.log('hello', instanceId)
  
        }
  
        renderer.render( scene, camera );
  
      }
  */
      renderer.render(scene, camera);

      const animate = function () {
        requestAnimationFrame(animate);
  
        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();
  
        renderer.render(scene, camera);
      };
  
      animate();
      /*
      const handleScroll = (event: any) => {
        camera.position.z += event.deltaY * 0.01;
  
        // Limit the zoom to a reasonable range
        camera.position.z = Math.max(0.1, camera.position.z);
        render()
      };
      render()
      // Event listener for scroll
      window.addEventListener('wheel', handleScroll);
      */
      // Clean up on component unmount
      return () => {
        // window.removeEventListener('wheel', handleScroll);
        graphDiv.current?.removeChild(renderer.domElement);
      };

    }
  }, [graphDiv]);

  return <div ref={graphDiv} />;
};

export default BoxViewCanvas;
