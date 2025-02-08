import { Router } from 'express';
import {CharacterClassController} from "../controllers/character-class.controller";
import {asyncHandler} from "../middleware/asyncHandler";

const router = Router();
const classController = new CharacterClassController();

router.get('/compare', asyncHandler(async (req, res) => {
    await classController.compareClasses(req, res);
}));

router.get('/', asyncHandler(async (req, res) => {
    await classController.getClassNames(req, res);
}));

export default router;

