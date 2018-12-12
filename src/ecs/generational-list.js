import{Entity} from './entity';

export class GenerationalList{
    constructor(size){
        this.entries = [];
        this.freeList = [];
        this.size = size;
    }

    allocate(){

        if(this.freeList.length > 0){
            const entry = this.freeList.pop();
            entry.isAlive = true;

            return new Entity(entry.id, entry.generation);
        }

        if(this.entries.length >= this.size){
            throw new Error('GenerationList is full');
        }

        const entry = {
            id: this.entries.length,
            isAlive: true,
            generation: 0,
        };

        this.entries.push(entry);

        return new Entity(entry.id, 0);
    }

    free(entity){
        if(!this.isAlive(entity)){
            throw new Error('entity is not alive');
        }

        const entry = this.entries[entity.id];
        entry.isAlive = false;
        entry.generation += 1;

        this.freeList.push(entry);
    }

    isAlive(entity){
        const entry = this.entries[entity.id];
        return entry.isAlive && entry.generation === entity.generation;
    }
}