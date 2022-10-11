import React, {Suspense} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {useLoader} from '@react-three/fiber';
import {Environment} from '@react-three/drei';
import {useAtomValue} from 'jotai';
import {customColorAtom} from '../App';

const Car = () => {
  const customColor = useAtomValue(customColorAtom);

  const gltfs = useLoader(GLTFLoader, 'tsla_m3.gltf', loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  gltfs.scene.traverse(node => {
    if (
      node instanceof THREE.Mesh &&
      node.material instanceof THREE.MeshStandardMaterial
    ) {
      node.receiveShadow = true;
      node.castShadow = true;
      if (node.material?.name === 'carpaint') {
        node.material.color.set(customColor['carpaint']);
        node.material.roughness = 0.6;
      } else if (node.material?.name === 'GlossyInterior') {
        node.material.color.set(customColor['interior']);
      }
    }
  });

  return (
    <Suspense fallback={null}>
      <primitive object={gltfs.scene} />
      <Environment files={'hdr.hdr'} />
    </Suspense>
  );
};

export default Car;
