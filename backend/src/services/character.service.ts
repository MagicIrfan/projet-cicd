import {fetchData} from "./api.service";
import {getRandomElement} from "../utils/array.utils";
import {Character} from "../models/character.model";
import {Equipment} from "../models/equipment.model";

export class CharacterService {
    async getRandomClass() : Promise<string> {
        const classes : any = await fetchData('https://www.dnd5eapi.co/api/classes');
        const randomClass : any  = getRandomElement(classes.results);
        return randomClass?.name ?? '';
    }

    async getRandomRace() : Promise<string>{
        const races : any = await fetchData('https://www.dnd5eapi.co/api/races');
        const randomRaces : any  = getRandomElement(races.results);
        return randomRaces?.name ?? '';
    }

    async formatEquipment(equipments: any[]): Promise<Equipment[]> {
        const formattedEquipments: Equipment[] = [];
        for(const equipment of equipments){
            const { name, url, desc } = equipment.equipment;
            const quantity = equipment.quantity;
            if (url) {
                try {
                    const equipmentData: any = await fetchData(`https://www.dnd5eapi.co${url}`);

                    formattedEquipments.push({
                        name: name,
                        quantity: quantity,
                        description: equipmentData?.desc ?? '',
                    });
                } catch (error) {
                    console.error(`Erreur lors de la récupération des équipements pour l'URL: ${url}`, error);
                }
            } else {
                formattedEquipments.push({
                    name: name,
                    quantity: quantity,
                    description: desc ?? '',
                });
            }
        }
        return formattedEquipments;
    }

    async getRandomCharacter(): Promise<Character> {
        const race : string = await this.getRandomRace();
        const className : string = await this.getRandomClass();

        const characterClass : any = await fetchData(`https://www.dnd5eapi.co/api/classes/${className.toLowerCase()}`);

        const startingEquipment : any = characterClass?.starting_equipment ?? [];

        const equipments : Equipment[] = await this.formatEquipment(startingEquipment);

        return {
            race: race,
            class : className,
            equipments : equipments
        };
    };
}

