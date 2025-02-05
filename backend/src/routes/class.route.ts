import { Router } from 'express';
import {ClassController} from "../controllers/class.controller";

const router = Router();
const classController = new ClassController();

router.get('/compare', async (req, res) => {
    try {
        await classController.compareClasses(req, res);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during compare classes.' });
    }
});

export default router;
