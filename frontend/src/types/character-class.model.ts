import {Proficiency} from "./proficiency.model.ts";
import {SpecialAbility} from "./special-ability.model.ts";

export interface CharacterClass {
    name:string,
    hitPoints:number,
    armorWeapons:Proficiency[],
    specialAbilities:SpecialAbility[],
    subclasses:string[]
}
