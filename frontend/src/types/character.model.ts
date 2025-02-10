import {Equipment} from './equipment.model.ts';

export interface Character{
    race:string,
    class:string,
    equipments:Equipment[]
}
