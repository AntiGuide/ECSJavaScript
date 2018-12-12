export class Chunk {
    constructor(sizeInBytes){
        this.sizeInBytes = sizeInBytes;
        this.buffer = new ArrayBuffer(sizeInBytes);
    }
}