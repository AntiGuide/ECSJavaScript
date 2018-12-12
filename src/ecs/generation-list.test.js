import {GenerationList} from './generation-list';

test('it allocates an entity', () => {
    const list = new GenerationList(1);

    const entity = list.allocate();

    expect(list.isAlive(entity)).toBe(true);
});

test('it frees an entity', () => {
    const list = new GenerationList(1);

    const entity = list.allocate();

    list.free(entity);

    expect(list.isAlive(entity)).toBe(false);
});

test('it can not allocate beyond its size', () => {
    const list = new GenerationList(1);
    list.allocate();

    expect(() => list.allocate()).toThrow();
});

test('', () => {
    const list = new GenerationList(2);
    const first = list.allocate();
    const second = list.allocate();

    list.free(first);

    const third = list.allocate();

    expect(list.isAlive(first)).toBe(false);
    expect(list.isAlive(second)).toBe(true);
    expect(list.isAlive(third)).toBe(true);
});