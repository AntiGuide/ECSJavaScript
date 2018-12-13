import { GenerationalList } from "./generational-list";
export class Chunk {
    constructor(entityCount, archetype){
        this.entityCount = entityCount;
        this.archetype = archetype;

        this.entities = new GenerationalList(entityCount);
        this.entityIndices = Array(entityCount).map(() => -1);


        const sizePerEntity = this.archetype.getSizePerEntity();
        this.buffer = new ArrayBuffer(entityCount * sizePerEntity);
        this.views = [];

        let offset = 0;
        for(let i = 0; i < this.archetype.components.length; i++){
            const component = this.archetype.components[i];

            const stride = component.elementSize * component.elementCount;
            const length = this.entityCount * stride;
            const type = component.type;
            const items = this.entityCount * component.elementCount;

            this.views.push({
                offset,
                stride,
                array: new type(this.buffer, offset, items),
            });

            offset += length;
        }
    }

    createEntity(){
        const entity = this.entities.allocate();
        const index = this.bumpPointer++;

        this.entityIndices[entity.id] = index;

        return entity;
    }

    setComponentData(componentIndex, entity, data){
        const component = this.archetype.components[componentIndex];
        const view = this.views[componentIndex];
        const index = this.entityIndices[entity.id];

        const offset = index * component.elementCount;
        
        for(let i = 0;i < component.elementCount;i++){
            view.Array[offset + i] = data[i];
        }
    }
}