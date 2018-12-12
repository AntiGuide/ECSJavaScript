import {Archetype} from './archetype';
import { Component } from './component';

test('it works', () => {
    const position = Component.float2('position');
    const acceleration = Component.float2('acceleration');
    const velocity = Component.float2('velocity');
    const archetype = Archetype.fromComponents(position, acceleration, velocity);

    expect(archetype.components[0]).toBe(position);
    expect(archetype.components[1]).toBe(acceleration);
    expect(archetype.components[2]).toBe(velocity);
});

test('it returns the correct size per entity', () => {
    const position = Component.float2('position');
    const acceleration = Component.float2('acceleration');
    const velocity = Component.float2('velocity');
    const archetype = Archetype.fromComponents(position, acceleration, velocity);

    expect(archetype.getSizePerEntity()).toBe(24);
});