import { Router } from 'express';
import {CharacterController} from "../controllers/character.controller";
import {asyncHandler} from "../middleware/asyncHandler";

const router : Router = Router();
const characterController = new CharacterController();

router.get('/random', asyncHandler(async (req, res) => {
    await characterController.getRandomCharacter(req, res);
}));

export default router;
