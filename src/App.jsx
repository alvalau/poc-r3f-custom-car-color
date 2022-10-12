import {useRef, useEffect} from 'react';
import {
  BackSide,
  PCFSoftShadowMap,
  CineonToneMapping,
  ACESFilmicToneMapping,
  NoToneMapping,
} from 'three';
import {Canvas, useThree} from '@react-three/fiber';
import {OrbitControls, Environment} from '@react-three/drei';
import {atom} from 'jotai';
import Palette from './components/Palette';
import Car from './components/Car';
import './App.scss';
import * as lil from 'lil-gui';

export const customColorAtom = atom({
  carpaint: '#ffffff',
});

export const updateCustomColorAtom = atom(null, (get, set, action) => {
  set(customColorAtom, {
    ...get(customColorAtom),
    [action.key]: action.value,
  });
});

const Controls = () => {
  const {camera, domElement} = useThree(state => ({
    camera: state.camera,
    domElement: state.gl.domElement,
  }));

  return (
    <OrbitControls
      enablePan={false}
      maxDistance={22}
      minDistance={11}
      maxPolarAngle={Math.PI / 2}
      args={[camera, domElement]}
    />
  );
};

const DirLight = () => {
  const dirLightRef = useRef();
  // useShadowHelper(dirLightRef);
  return (
    <directionalLight
      ref={dirLightRef}
      args={[0xffffff, 0.7]}
      position={[-2, 15, 1]}
      castShadow
      shadow-camera-far={20}
      shadow-camera-top={10}
      shadow-camera-right={12}
      shadow-camera-bottom={-10}
      shadow-camera-left={-12}
      shadow-mapSize-height={512}
      shadow-mapSize-width={512}
      shadow-normalBias={0.05}></directionalLight>
  );
};

// const gui = new lil.GUI();
const ToneMapping = () => {
  const gl = useThree(state => state.gl);

  // useEffect(() => {
  //   gl.toneMapping = CineonToneMapping;
  //   gui.add(gl, 'toneMapping', {
  //     No: NoToneMapping,
  //     ACESFilmic: ACESFilmicToneMapping,
  //     Cineon: CineonToneMapping,
  //   });
  //   gui.add(gl, 'toneMappingExposure').min(0).max(5).step(0.01);
  // }, []);
};

function App() {
  return (
    <>
      <Canvas
        className="webgl"
        shadows={PCFSoftShadowMap}
        camera={{
          fov: 60,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.01,
          far: 300,
          position: [9, 9, 10],
        }}>
        <DirLight />
        <ambientLight args={[0xffffff, 0.3]} />
        <Controls />
        <Car />
        <mesh rotation-x={-Math.PI * 0.5} position-y={-2} receiveShadow={true}>
          <planeGeometry args={[300, 300, 1]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>
        <mesh receiveShadow={false}>
          <boxGeometry args={[300, 300, 300]} />
          <meshStandardMaterial side={BackSide} color={0xffffff} />
        </mesh>
        <Environment files={'hdr.hdr'} />
        <ToneMapping />
      </Canvas>
      <Palette />
    </>
  );
}

export default App;
