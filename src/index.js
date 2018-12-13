import * as THREE from 'three';
import { Archetype, Component, Chunk } from './ecs';
import {RotateSystem} from './rotate-system';


const cubeArchetypes = Archetype.fromComponents(
    Component.float3('position'),
    Component.float3('rotation')
);
const cubesX = 29;
const cubesY = 32;
const componentCount = cubesX * cubesY;

const chunk = new Chunk(componentCount, cubeArchetypes);
const rotateSystem = new RotateSystem([chunk]);

const entities = [];
for(let i = 0;i < componentCount;i++){
    entities[i] = chunk.createEntity();
}

let i = 0;
for(let x = 0;x < cubesX;x++){
    for(let y = 0;y < cubesY;y++){
        const entity = entities[i++];

        chunk.setComponentData(0, entity, [((-cubesX / 2) + x) * 0.04, ((-cubesY / 2) + y) * 0.04, 0]);
    }   
}

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.02,0.02,0.02);
const material = new THREE.MeshNormalMaterial();

const meshes = entities.map((entities) => {
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

    for(let i = 0;i < componentCount;i++){
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