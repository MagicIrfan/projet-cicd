import {fetchData} from "./api.service";
import {Proficiency} from "../models/proficiency.model";
import {SpecialAbility} from "../models/special-ability.model";
import {CompareClass} from "../models/compare-class.model";

export class CharacterClassService {
    private readonly fetchData: (url: string) => Promise<any>;

    constructor(fetchDataImpl?: (url: string) => Promise<any>) {
        this.fetchData = fetchDataImpl || (async (url) => {
            const response: Response = await fetch(url);
            return response.json();
        });
    }

    public async getComparedClasses(class1:string, class2:string) : Promise<CompareClass>{
        const class1Details = await fetchData(`https://www.dnd5eapi.co/api/classes/${class1}`);
        const class2Details = await fetchData(`https://www.dnd5eapi.co/api/classes/${class2}`);

        const class1SpecialAbilitiesData : any[] = await fetchData(`https://www.dnd5eapi.co${class1Details.class_levels}`);
        const class2SpecialAbilitiesData: any[] = await fetchData(`https://www.dnd5eapi.co${class2Details.class_levels}`);

        const class1SpecialAbilities: SpecialAbility[] = await this.getSpecialAbilities(class1SpecialAbilitiesData);
        const class2SpecialAbilities: SpecialAbility[] = await this.getSpecialAbilities(class2SpecialAbilitiesData);

        const class1Proficiencies: Proficiency[] = await this.getProficiencies(class1Details.proficiencies);
        const class2Proficiencies: Proficiency[] = await this.getProficiencies(class2Details.proficiencies);

        const class1Subclasses = await this.getSubClasses(class1Details.subclasses);
        const class2Subclasses = await this.getSubClasses(class2Details.subclasses);

        return {
            class1: {
                name: class1,
                hitPoints: class1Details.hit_die,
                armorWeapons: class1Proficiencies,
                specialAbilities: class1SpecialAbilities,
                subclasses: class1Subclasses,
            },
            class2: {
                name: class2,
                hitPoints: class2Details.hit_die,
                armorWeapons: class2Proficiencies,
                specialAbilities: class2SpecialAbilities,
                subclasses: class2Subclasses,
            }
        };
    }

    public async getClassNames() : Promise<string[]>{
        const classNamesData : any = await fetchData(`https://www.dnd5eapi.co/api/classes`);
        const classNames : any[] = classNamesData.results;
        return Promise.all(classNames.map(async (className: any) => {
            return className.name;
        }));
    }

    private async getProficiencies(armorWeapons: any[]): Promise<Proficiency[]> {
        return Promise.all(armorWeapons.map(async (armorWeapon: any) => {
            const data = await fetchData(`https://www.dnd5eapi.co/api/proficiencies/${armorWeapon.index}`);

            return {
                name: data.name,
                category: data.type || "Unknown"
            };
        }));
    }

    private async getSpecialAbilities(levels: any[]): Promise<SpecialAbility[]> {
        return Promise.all(levels.map(async (level: any) => {
            const features: string[] = await Promise.all(level.features.map(async (feature: any) => {
                return feature.name;
            }));

            return {
                level: level.level,
                features: features
            };
        }));
    }

    private async getSubClasses(subclasses: any[]): Promise<string[]> {
        return Promise.all(subclasses.map(async (subclass: any) => {
            return subclass.name;
        }));
    }
}
