import {createAdder, Adder, addAll, addOneToAllElements} from './index'

test('it works', () => {
    console.log('yay');

    //throw new Error('failed.');
});

test('it works with classes', () => {
    const adder = new Adder(10);

    const result = adder.apply(5);

    expect(result).toBe(15);
});

test('it adds all numbers', () => {
    const result = addAll(1,3,7,11);

    expect(result).toBe(22);
});

test('it adds one to all elements', () => {
    const result = addOneToAllElements(1,2);

    expect(result).toEqual([2,3]);
});