import {Chunk} from './chunk';

test('it works', () => {
    const chunk = new Chunk(16);
    
    expect(chunk.sizeInBytes).toBe(16);
    expect(chunk.buffer.byteLength).toBe(16);
});

test('', () => {
    const buffer = new ArrayBuffer(4);
    const intBuffer = new Int32Array(buffer);
    const byteBuffer = new Int8Array(buffer);

    expect(intBuffer[0]).toBe(0);

    intBuffer[0] = 1337;

    console.log(byteBuffer[0], byteBuffer[1], byteBuffer[2], byteBuffer[3])

    expect(byteBuffer[0]).toBe(57);
    expect(byteBuffer[1]).toBe(5);
    expect(byteBuffer[2]).toBe(0);
    expect(byteBuffer[3]).toBe(0);
});