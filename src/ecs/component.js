export class Component {
    constructor(name, type, elementSize, elementCount){
        this.name = name;
        this.type = type;
        this.elementSize = elementSize;
        this.elementCount = elementCount;
    }

    static float(name) {
        return new Component(name, Float32Array, Float32Array.BYTES_PER_ELEMENT, 1);
    }

    static float2(name) {
        return new Component(name, Float32Array, Float32Array.BYTES_PER_ELEMENT, 2);
    }

    static float3(name) {
        return new Component(name, Float32Array, Float32Array.BYTES_PER_ELEMENT, 3);
    }
}