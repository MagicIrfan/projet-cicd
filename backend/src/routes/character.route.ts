import { Router } from 'express';
import {CharacterController} from "../controllers/character.controller";

const router : Router = Router();
const characterController = new CharacterController();

router.get('/random', async (req, res) => {
    await characterController.getRandomCharacter(req, res);
});

export default router;
