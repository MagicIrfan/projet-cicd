import {ClassService} from "../services/class.service";
import {Request, Response} from "express";
import {fetchData} from "../services/api.service";

export class ClassController {
    private classService: ClassService;

    constructor(classService?: ClassService) {
        this.classService = classService || new ClassService();
    }

    public compareClasses = async (req: Request, res: Response): Promise<void> => {
        try {
            const { class1, class2 } = req.query;

            if (!class1 || !class2) {
                res.status(400).json({ error: 'Deux classes doivent être spécifiées.' });
            }

            const class1Details = await fetchData(`https://www.dnd5eapi.co/api/classes/${class1}`);
            const class2Details = await fetchData(`https://www.dnd5eapi.co/api/classes/${class2}`);

            const class1Subclasses = class1Details.subclasses;
            const class2Subclasses = class2Details.subclasses;

            const comparisonResult = {
                class1: {
                    name: class1,
                    hitPoints: class1Details.hit_die,
                    armorWeapons: class1Details.proficiencies,
                    specialAbilities: class1Details.class_levels,
                    subclasses: class1Subclasses,
                },
                class2: {
                    name: class2,
                    hitPoints: class2Details.hit_die,
                    armorWeapons: class2Details.proficiencies,
                    specialAbilities: class2Details.class_levels,
                    subclasses: class2Subclasses,
                }
            };

            res.json(comparisonResult);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ error: errorMessage });
        }
    };
}
