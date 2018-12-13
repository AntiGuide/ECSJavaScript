import {System} from './ecs';

export class RotateSystem extends System {
    execute(){
        this.schedule(['rotation'], (rotation) => {
            rotation[0] += 0.01;
            rotation[1] += 0.02;
        });
    }
}