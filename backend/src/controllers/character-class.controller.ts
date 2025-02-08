import {CharacterClassService} from "../services/character-class.service";
import {Request, Response} from "express";
import {fetchData} from "../services/api.service";

export class CharacterClassController {
    private classService: CharacterClassService;

    constructor(classService?: CharacterClassService) {
        this.classService = classService || new CharacterClassService();
    }

    public compareClasses = async (req: Request, res: Response): Promise<void> => {
        try {
            const { class1, class2 } = req.query;

            if (!class1 || !class2) {
                res.status(400).json({ error: 'Deux classes doivent être spécifiées.' });
            }

            const comparisonResult = await this.classService.getComparedClasses(class1 as string, class2 as string);

            res.json(comparisonResult);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ error: errorMessage });
        }
    }

    public getClassNames = async (req: Request, res: Response): Promise<void> => {
        try {

            const classNames : string[] = await this.classService.getClassNames();

            res.json(classNames);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ error: errorMessage });
        }
    };
}
