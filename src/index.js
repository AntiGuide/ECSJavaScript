import * as THREE from 'three';
import { Archetype, Component, Chunk } from './ecs';
import {RotateSystem} from './rotate-system';


const cubeArchetypes = Archetype.fromComponents(
    Component.float3('position'),
    Component.float3('rotation')
);

const chunk = new Chunk(12, cubeArchetypes);
const rotateSystem = new RotateSystem([chunk]);

const entities = [];
for(let i = 0;i < 12;i++){
    entities[i] = chunk.createEntity();
}

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2,0.2,0.2);
const material = new THREE.MeshNormalMaterial();

const meshes = entities.map(entities => {
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return mesh;
});

const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const render = () => {
    requestAnimationFrame(render);
    
    rotateSystem.update();

    for(let i = 0;i < 12;i++){
        const entity = entities[i];
        const mesh = meshes[i];
        
        const position = chunk.getComponentData(0, entity);
        mesh.position.x = position[0];
        mesh.position.y = position[1];
        mesh.position.z = position[2];
        
        const rotation = chunk.getComponentData(1, entity);
        mesh.rotation.x = rotation[0];
        mesh.rotation.y = rotation[1];
        mesh.rotation.z = rotation[2];
    }
    
    renderer.render(scene, camera);
}

render();