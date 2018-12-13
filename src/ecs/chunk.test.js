import {Chunk} from './chunk';
import { Archetype } from './archetype';
import {Component} from './component'
import { Entity } from './entity';

function createArchetype(){
    const position = Component.float2('position');
    const acceleration = Component.float2('acceleration');
    const velocity = Component.float2('velocity');
    return Archetype.fromComponents(position, acceleration, velocity);
}

test('it works', () => {
    const archetype = createArchetype();
    const chunk = new Chunk(1, archetype);
    
    expect(chunk.entityCount).toBe(1);
    expect(chunk.buffer.byteLength).toBe(24);
});

test('it creates the correct views', () => {
    const archetype = createArchetype();
    const chunk = new Chunk(2, archetype);

    const positionView = chunk.views[0];
    expect(positionView.offset).toBe(0);
    expect(positionView.stride).toBe(8);
    expect(positionView.array.byteLength).toBe(16);

    const accelerationView = chunk.views[1];
    expect(accelerationView.offset).toBe(16);
    expect(accelerationView.stride).toBe(8);
    expect(accelerationView.array.byteLength).toBe(16);

    const velocityView = chunk.views[2];
    expect(velocityView.offset).toBe(32);
    expect(velocityView.stride).toBe(8);
    expect(velocityView.array.byteLength).toBe(16);

    for(let i = 0;i < chunk.views.length;i++){
        const view = chunk.views[i];


    }
});

test('it creates an entity', () => {
    const archetype = createArchetype();
    const chunk = new Chunk(512, archetype);

    const entity = chunk.createEntity();

    chunk.setComponentData(0, entity, [13,17]);

    const data = chunk.getComponentData(0, entity);

    expect(data[0]).toBe(13);
    expect(data[1]).toBe(17);
});