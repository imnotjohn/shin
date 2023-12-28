import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';

const bgColor = "#2A2C42";

const Shin00 = () => {
    const r = useRef(null);

    useEffect(() => {

        const ref = r;
        let scene, camera, renderer, cylinder;
        // initialize threejs scene here
        scene = new THREE.Scene();

        // plane
        const planeGeom = new THREE.PlaneGeometry(10, 10, 32)
        const planeMat = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
            side: THREE.DoubleSide,
            transparent: true,
            wireframe: true,
        });
        const plane = new THREE.Mesh(planeGeom, planeMat);
        plane.rotateX(-45);
        plane.position.z = -0;
        plane.receiveShadow = true;
        scene.add(plane);
        // light
        const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
        pointLight.position.set(10, 10, 10);
        pointLight.intensity = 2;
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 100;
        pointLight.shadow.mapSize.height = 100;
        pointLight.shadow.camera.near = 1;
        pointLight.shadow.camera.far = 500;
        scene.add(pointLight);

        const aspect = window.innerWidth / window.innerHeight;
        const d = 20;
        camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
        camera.position.set(15, 30, 15); // all components equal
        camera.lookAt(scene.position); // or the origin
        renderer = new THREE.WebGLRenderer({alpha: true});

        renderer.setSize(window.innerWidth, window.innerHeight);
        r.current.appendChild(renderer.domElement);
        camera.position.z = 15;

        const renderCylinders = () => {
            // add cylinder geometry
            const geometry = new THREE.CylinderGeometry(.055, .055, 2.5, 32);
            const material = new THREE.MeshNormalMaterial({wireframe: true, color: 0x00ff00, opacity: 0.5, transparent: true});
            const p = new THREE.Vector3(-4.5, -8.5, 0); // starting position
            
            for (let i = 0; i < 8; i++) {
                cylinder = new THREE.Mesh(geometry, material);
                p.add(new THREE.Vector3(1, 2, 0))
                cylinder.position.set(p.x, p.y, p.z);
                scene.add(cylinder);
            }
        }

        const renderScene = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
        };

        const handleResize = window.addEventListener("resize", () => {
            const w = window.innerWidth;
            const h = window.innerHeight;

            camera.aspect = w / h;
            camera.updateProjectionMatrix();

            renderer.setSize(w, h);
        })
    
        renderCylinders();
        renderScene();

        return () => {
            window.removeEventListener("resize", handleResize)
            ref.current.removeChild(renderer.domElement);

        }
    }, []);

    return (
        <div ref={r} id="View" style={{backgroundColor: bgColor}}><span id="CenterText">00</span></div>
    )
}

export default Shin00;