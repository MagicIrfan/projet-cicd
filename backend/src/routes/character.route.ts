import { Router } from 'express';
import {CharacterController} from "../controllers/character.controller";

const router = Router();
const characterController = new CharacterController();

router.get('/random', async (req, res) => {
    try {
        const character = await characterController.getRandomCharacter(req, res);
        res.json(character);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during character creation.' });
    }
});

export default router;
