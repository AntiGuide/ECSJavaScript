import { GenerationalList } from "./generational-list";
import { View } from './view';

export class Chunk {
    constructor(entityCount, archetype){
        this.entityCount = entityCount;
        this.archetype = archetype;

        this.entities = new GenerationalList(entityCount);
        this.entityIndices = Array(entityCount).map(() => -1);

        this.bumpPointer = 0;

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

            this.views.push(new View(
                offset,
                stride,
                component.elementCount,
                new type(this.buffer, offset, items),
            ));

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
        const view = this.views[componentIndex];
        const index = this.entityIndices[entity.id];

        view.setData(index, data);
    }

    getComponentData(componentIndex, entity){
        const view = this.views[componentIndex];
        const index = this.entityIndices[entity.id];

        return view.getData(index);
    }

    execute(indices, callback){
        const views = indices.map(i => this.views[i]);

        for(let i = 0; i < this.bumpPointer; i++){
            const data = views.map(v => v.getData(i));
            callback.apply(null, data);
            views.map((v, index) => v.setData(i, data[index]));
        }
    }
}