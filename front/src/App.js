import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Grid, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import { Ship } from './Ship';

import './styles.css'

function Box(props) {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    useFrame((state, delta) => (ref.current.rotation.x += delta));

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export default function App() {
    const ref = useRef()

    return (
        <div className={'wrapper'}>
            <header>
                <div className={'header-content'}>sdfdsfdsfsdfds</div>
            </header>
            <main>
                <aside>
                    <div className={'aside-list'}>aaaaa</div>
                    <div className={'aside-list'}>aaaaa</div>
                    <div className={'aside-list'}>aaaaa</div>
                    <div className={'aside-list active'}>aaaaa</div>
                </aside>
                <Canvas gl={{ logarithmicDepthBuffer: true }} shadows camera={{ position: [-15, 0, 10], fov: 25 }}>
                    <Suspense fallback={null}>
                        <Stage intensity={0.5} environment="city" shadows={{ type: 'accumulative', bias: -0.001 }} adjustCamera={false}>
                            <Ship position={[0, 0, 0]}/>
                            <Ship position={[50, 10, 0]}/>
                            <Ship position={[100, 20, -3]}/>
                        </Stage>
                        <Grid renderOrder={-1} position={[0, -1.85, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={400} />
                        <EffectComposer disableNormalPass>
                            <Bloom luminanceThreshold={1} mipmapBlur />
                        </EffectComposer>
                        <Environment background preset="sunset" blur={0.8} />
                    </Suspense>
                    <OrbitControls ref={ref} autoRotate />
                </Canvas>
            </main>

        </div>
    )
}
