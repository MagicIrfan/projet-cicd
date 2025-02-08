import { Character } from "../models/character.model";
import { Equipment } from "../models/equipment.model";
import { getRandomElement } from "../utils/array.utils";

export class CharacterService {
    private readonly fetchData: (url: string) => Promise<any>;

    constructor(fetchDataImpl?: (url: string) => Promise<any>) {
        this.fetchData = fetchDataImpl || (async (url) => {
            const response : Response = await fetch(url);
            return response.json();
        });
    }

    private async getRandomClass(): Promise<string> {
        try {
            const classes = await this.fetchData('/api/classes');
            const randomClass : any = getRandomElement(classes.results);
            return randomClass?.name ?? '';
        } catch (error) {
            console.error("Error retrieving a class", error);
            throw new Error("Impossible to get a random class");
        }
    }

    private async getRandomRace(): Promise<string> {
        try {
            const races = await this.fetchData('/api/races');
            const randomRace : any = getRandomElement(races.results);
            return randomRace?.name ?? '';
        } catch (error) {
            console.error("Error retrieving a race", error);
            throw new Error("Impossible to get a random race");
        }
    }

    private async formatEquipment(equipments: any[]): Promise<Equipment[]> {
        return Promise.all(equipments.map(async (equipment: any) => {
            try {
                if (!equipment.equipment) {
                    return { name: 'Unknown', quantity: 0, category: '' };
                }

                const { name, url } = equipment.equipment;
                const quantity = equipment.quantity;

                if (url) {
                    const equipmentData = await this.fetchData(url);
                    return {
                        name,
                        quantity,
                        category: equipmentData?.equipment_category?.name ?? '',
                    };
                }

                return { name, quantity, category: '' };

            } catch (error) {
                console.error(`Error during equipment format`, error);
                return { name: 'Unknown', quantity: 0, category: '' };
            }
        }));
    }

    public async getRandomCharacter(): Promise<Character> {
        try {
            const race = await this.getRandomRace();
            const className = await this.getRandomClass();

            const characterClass = await this.fetchData(`/api/classes/${className.toLowerCase()}`);
            const startingEquipment = characterClass?.starting_equipment ?? [];

            const equipments = await this.formatEquipment(startingEquipment);

            return { race, class: className, equipments };
        } catch (error) {
            console.error("Error during character creation", error);
            throw new Error("Impossible to get a random character");
        }
    }
}
