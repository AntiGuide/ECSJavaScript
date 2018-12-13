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

    hasComponent(name){
        for(let component of this.components){
            if(component.name === name){
                return true;
            }
        }

        return false;
    }

    getComponentIndex(name){
        for(let i = 0;i < this.components.length;i++){
            if(this.components[i].name === name){
                return i;
            }
        }
        
        return -1;
    }
}