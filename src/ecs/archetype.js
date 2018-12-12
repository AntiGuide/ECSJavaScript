export class Archetype{
    constructor(components) {
        this.components = components;
    }

    static fromComponents(...components){
        return new Archetype(components);
    }

    getSizePerEntity(){
        return this.components.reduce((a, c) => a + (c.elementSize * c.elementCount), 0);
    }
}