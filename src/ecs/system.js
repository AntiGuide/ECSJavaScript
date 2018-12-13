export class System{
    constructor(chunks){
        this.chunks = chunks;
    }

    update(){
        this.execute();
    }
    
    execute(){

    }

    schedule(components, callback){
        this.chunks.forEach(chunk => {
            const archetype = chunk.archetype;
            const indices = components.map(c => archetype.getComponentIndex(c));
            if(!indices.every(i => i >= 0)){
                return;
            }

            chunk.execute(indices, callback);
        });
    }
}