import {Entity} from './entity';

test('it works', () => {
    const entity = new Entity(12,34);

    expect(entity.id).toBe(12);
    expect(entity.generation).toBe(34);
});