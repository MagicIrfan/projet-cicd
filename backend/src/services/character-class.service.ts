import { Proficiency } from "../models/proficiency.model";
import { SpecialAbility } from "../models/special-ability.model";
import { CompareClass } from "../models/compare-class.model";
import {NotFoundError} from "../errors/notfound.error";

export class CharacterClassService {
    private readonly fetchData: (url: string) => Promise<any>;

    constructor(fetchDataImpl?: (url: string) => Promise<any>) {
        this.fetchData = fetchDataImpl || (async (url) => {
            const response: Response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            }
            return response.json();
        });
    }

    public async getComparedClasses(class1: string, class2: string): Promise<CompareClass> {
        const classNames = await this.getClassNames();
        const classNamesLower = classNames.map(name => name.toLowerCase());

        if (!classNamesLower.includes(class1.toLowerCase()) || !classNamesLower.includes(class2.toLowerCase())) {
            throw new NotFoundError(`Class not found: ${!classNamesLower.includes(class1.toLowerCase()) ? class1 : class2}`);
        }

        const [class1Details, class2Details] = await Promise.all([
            this.fetchData(`/api/classes/${class1}`),
            this.fetchData(`/api/classes/${class2}`)
        ]);

        if (!class1Details || !class2Details) {
            throw new Error("Invalid class data received");
        }

        const [class1SpecialAbilitiesData, class2SpecialAbilitiesData] = await Promise.all([
            this.fetchData(class1Details.class_levels),
            this.fetchData(class2Details.class_levels)
        ]);

        const [class1SpecialAbilities, class2SpecialAbilities] = await Promise.all([
            this.getSpecialAbilities(class1SpecialAbilitiesData),
            this.getSpecialAbilities(class2SpecialAbilitiesData)
        ]);

        const [class1Proficiencies, class2Proficiencies, class1Subclasses, class2Subclasses] = await Promise.all([
            this.getProficiencies(class1Details.proficiencies),
            this.getProficiencies(class2Details.proficiencies),
            this.getSubClasses(class1Details.subclasses),
            this.getSubClasses(class2Details.subclasses)
        ]);

        return {
            class1: {
                name: class1Details.name,
                hitPoints: class1Details.hit_die ?? 0,
                armorWeapons: class1Proficiencies,
                specialAbilities: class1SpecialAbilities,
                subclasses: class1Subclasses,
            },
            class2: {
                name: class2Details.name,
                hitPoints: class2Details.hit_die ?? 0,
                armorWeapons: class2Proficiencies,
                specialAbilities: class2SpecialAbilities,
                subclasses: class2Subclasses,
            }
        };
    }

    public async getClassNames(): Promise<string[]> {
        try {
            const classNamesData: any = await this.fetchData(`/api/classes`);

            if (!classNamesData || !Array.isArray(classNamesData.results)) {
                throw new Error("Invalid data format received from /api/classes");
            }

            return classNamesData.results.map((className: any) => className.name);
        } catch (error) {
            console.error("Error fetching class names:", error);
            throw new Error("Failed to retrieve class names");
        }
    }

    private async getProficiencies(armorWeapons: any[]): Promise<Proficiency[]> {
        const result = armorWeapons ?? []
        return Promise.all(result.map(async (armorWeapon: any) => {
            try {
                const data = await this.fetchData(`/api/proficiencies/${armorWeapon.index}`);
                return {
                    name: data.name,
                    category: data.type || "Unknown"
                };
            } catch (error) {
                console.error(`Error fetching proficiency ${armorWeapon.index}:`, error);
                return { name: "Unknown", category: "Unknown" };
            }
        }));
    }

    private async getSpecialAbilities(levels: any[]): Promise<SpecialAbility[]> {
        return Promise.all(levels.map(async (level: any) => {
            try {
                const features: string[] = level.features ? level.features.map((feature: any) => feature.name) : [];
                return { level: level.level, features };
            } catch (error) {
                console.error(`Error fetching special abilities for level ${level.level}:`, error);
                return { level: level.level, features: [] };
            }
        }));
    }

    private async getSubClasses(subclasses: any[]): Promise<string[]> {
        const result = subclasses ?? []
        return Promise.all(result.map(async (subclass: any) => {
            return subclass.name;
        }));
    }
}
