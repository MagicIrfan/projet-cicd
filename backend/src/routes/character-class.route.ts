import { Router } from 'express';
import {CharacterClassController} from "../controllers/character-class.controller";

const router = Router();
const classController = new CharacterClassController();

router.get('/compare', async (req, res) => {
    await classController.compareClasses(req, res);
});


router.get('/', async (req, res) => {
    await classController.getClassNames(req, res);
});

export default router;
