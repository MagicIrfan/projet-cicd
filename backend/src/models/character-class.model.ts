import {Proficiency} from "./proficiency.model";
import {SpecialAbility} from "./special-ability.model";

export interface CharacterClass {
    name:string,
    hitPoints:number,
    armorWeapons:Proficiency[],
    specialAbilities:SpecialAbility[],
    subclasses:string[]
}
