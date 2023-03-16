import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Grid, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import { XWing } from './components/Ship/XWing';
import { Ship } from './components/Ship/Ship';

import { shipApi } from './api/ship';
import { SciFiButton } from './components/SciFiButton/index';
import { ReactComponent as Logo } from './logo.svg';

import './styles.css';

const SHIP_TYPES = ['Y-wing', 'X-wing', 'A-wing', 'B-wing', 'V-wing'];

export default function App() {
    const [ships, setShips] = useState([]);
    const [hoverId, setHoverId] = useState(false)
    const ref = useRef();

    useEffect(() => {
        shipApi.getAll().then(data => setShips(data));
    }, []);

    const clickAddShip = ({ model }) => {
        shipApi.addShip({ model }).then(ship => setShips([...ships, ship]));
    }

    const shipClick = ({ e, id }) => {
        e.stopPropagation();
        const nextShips = ships.map((s) => {
            if (s._id !== id) return s;

            s.timesClicked++;
            shipApi.edit({ ship: s });

            return s;
        });

        setShips(nextShips);
    }

    return (
        <div className={'wrapper'}>
            <header>
                <div className={'logo-container'}>
                    <Logo className={'logo'}/>
                    <div className={'header-content'}>Visualizer</div>
                </div>
                <div className={'buttons-container'}>
                    { SHIP_TYPES.map((el) => <SciFiButton onClick={() => clickAddShip({ model: el })} key={el}>Create {el}</SciFiButton>) }
                </div>
            </header>
            <main>
                <aside>
                    { ships.map(ship => <div
                                key={ship._id}
                                className={`aside-list ${hoverId === ship._id ? 'active' : ''}`}
                            >
                                {ship.model} ({ship.timesClicked})
                        </div>)
                    }
                </aside>
                <Canvas gl={{ logarithmicDepthBuffer: true }} shadows camera={{ position: [-15, 0, 10], fov: 25 }}>
                    <Suspense fallback={null}>
                        <Stage intensity={0.5} environment="city" shadows={{ type: 'accumulative', bias: -0.001 }} adjustCamera={false}>
                            { ships.map((ship, index) => <Ship
                                model={ship.model}
                                key={ship._id}
                                onClick={(e) => shipClick({ e, id: ship._id })}
                                position={[index * 50, 20, 0]}
                                onPointerOver={(event) => setHoverId(ship._id)}
                                onPointerOut={(event) => setHoverId(null)}
                            />) }
                        </Stage>
                        <Grid renderOrder={-1} position={[0, -1.85, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={250} />
                        <EffectComposer disableNormalPass>
                            <Bloom luminanceThreshold={1} mipmapBlur />
                        </EffectComposer>
                        <Environment background preset="sunset" blur={0.8} />
                    </Suspense>
                    <OrbitControls ref={ref} autoRotate={false} />
                </Canvas>
            </main>

        </div>
    )
}
