import {fetchData} from "../services/api.service";
import {getRandomElement} from "../utils/array.utils";
import {Request, Response} from "express";

export const getRandomCharacter = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Récupérer les races
        const races = await fetchData('https://www.dnd5eapi.co/api/races');
        const randomRace = getRandomElement(races.results);

        // Récupérer les classes
        const classes = await fetchData('https://www.dnd5eapi.co/api/classes');
        const randomClass = getRandomElement(classes.results);

        // @ts-ignore
        const characterClass = await fetchData(`https://www.dnd5eapi.co/api/classes/${randomClass.index}`);

        // Vérifier si la classe a un équipement de départ
        // @ts-ignore
        const startingEquipment = characterClass?.starting_equipment;

        const response: any = {
            race: randomRace,
            class : randomClass,
            equipment : startingEquipment
        };

        // Retourner les résultats
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
};
