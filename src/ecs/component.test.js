import {Component} from './component';

test ('it works', () => {
    const component = new Component('testComponent', Int8Array, Int8Array.BYTES_PER_ELEMENT, 1);
    
    expect(component.name).toEqual('testComponent');
    expect(component.type).toEqual(Int8Array);
    expect(component.elementSize).toEqual(Int8Array.BYTES_PER_ELEMENT);
    expect(component.elementCount).toEqual(1);
});