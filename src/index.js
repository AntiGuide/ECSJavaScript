export function createAdder(number) {
    return (x) => {
        return x + number;
    };
}

export class Adder {
    constructor(number) {
        this.number = number;
    }

    apply(x) {
        return x + this.number;
    }
}

export function addAll(...args){
    return args.reduce((a, b) => a + b, 0);
}

export function addOneToAllElements(...args){
    return args.map(v => v + 1);
}