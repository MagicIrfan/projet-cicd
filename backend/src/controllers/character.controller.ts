import {Request, Response} from "express";
import {CharacterService} from "../services/character.service";

export class CharacterController {
    private characterService: CharacterService;

    constructor() {
        this.characterService = new CharacterService();
    }

    async getRandomCharacter(req: Request, res: Response): Promise<void> {
        try {
            const character = await this.characterService.getRandomCharacter();
            res.json(character);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création du personnage' });
        }
    }
}
