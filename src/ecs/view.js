export class View{
    constructor(offset, stride, elementCount, array){
        this.offset = offset;
        this.stride = stride;
        this.elementCount = elementCount;
        this.array = array;
    }

    getData(index){
        const data = [];
        const offset = index * this.elementCount;

        for(let i = 0;i < this.elementCount;i++){
            data.push(this.array[offset + i]);
        }

        return data;
    }

    setData(index, data){
        const offset = index * this.elementCount;

        for(let i = 0;i < this.elementCount;i++){
            this.array[offset + i] = data[i];
        }
    }
}