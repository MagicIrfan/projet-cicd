import {Request, Response} from "express";
import {CharacterService} from "../services/character.service";
import {fetchData} from "../services/api.service";

export class CharacterController {
    private characterService: CharacterService;

    constructor(characterService?: CharacterService) {
        this.characterService = characterService || new CharacterService(fetchData as any);
    }

    public getRandomCharacter = async (req: Request, res: Response): Promise<void> => {
        try {
            const character = await this.characterService.getRandomCharacter();
            res.json(character);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ error: errorMessage });
        }
    };
}
