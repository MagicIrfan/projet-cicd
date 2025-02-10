import { CharacterClassService } from '../services/character-class.service';
import { fetchData } from '../services/api.service';
import { NotFoundError } from "../errors/notfound.error";

jest.mock('../services/api.service');

describe('CharacterClassService', () => {
    let characterClassService: CharacterClassService;

    beforeEach(() => {
        characterClassService = new CharacterClassService(fetchData as any);
        jest.clearAllMocks();
    });

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    test('getComparedClasses should return valid comparison', async () => {
        const mockClassNames = { results: [{ name: 'Rogue' }, { name: 'Wizard' }] };

        const mockClassDetailsRogue = {
            class_levels: '/api/classes/rogue/levels',
            hit_die: 8,
            proficiencies: undefined,
            subclasses: undefined,
            name:'Rogue',
        };

        const mockClassDetailsWizard = {
            class_levels: '/api/classes/wizard/levels',
            hit_die: 6,
            proficiencies: undefined,
            subclasses: undefined,
            name:'Wizard',
        };

        (fetchData as jest.Mock)
            .mockResolvedValueOnce(mockClassNames)
            .mockResolvedValueOnce(mockClassDetailsRogue)
            .mockResolvedValueOnce(mockClassDetailsWizard)
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([]);

        const result = await characterClassService.getComparedClasses('rogue', 'wizard');

        expect(result.class1.name).toBe('Rogue');
        expect(result.class2.name).toBe('Wizard');
        expect(result.class1.hitPoints).toBe(8);
        expect(result.class2.hitPoints).toBe(6);

        expect(fetchData).toHaveBeenCalledTimes(5);
    });

    test('getComparedClasses should throw NotFoundError if class does not exist', async () => {
        jest.spyOn(characterClassService, 'getClassNames').mockResolvedValueOnce(["Rogue", "Wizard"]);

        await expect(characterClassService.getComparedClasses("Rogue", "DummyClass"))
            .rejects.toThrow(NotFoundError);
    });

    test('getComparedClasses should throw NotFoundError if both classes are not exist', async () => {
        jest.spyOn(characterClassService, 'getClassNames').mockResolvedValueOnce(["Rogue", "Wizard"]);

        await expect(characterClassService.getComparedClasses("Jaaj", "DummyClass"))
            .rejects.toThrow(NotFoundError);
    });

    test('getClassNames should return a list of class names', async () => {
        (fetchData as jest.Mock).mockResolvedValueOnce({
            count: 2,
            results: [
                { name: "Rogue" },
                { name: "Wizard" }
            ]
        });

        const result = await characterClassService.getClassNames();

        expect(result).toEqual(['Rogue', 'Wizard']);
        expect(fetchData).toHaveBeenCalledTimes(1);
    });

    test('getComparedClasses should throw an error if fetchData fails', async () => {
        (fetchData as jest.Mock).mockRejectedValue(new Error());

        await expect(characterClassService.getComparedClasses('rogue', 'wizard'))
            .rejects.toThrowError("Failed to retrieve class names");
    });

    test('getClassNames should throw an error if fetchData fails', async () => {
        (fetchData as jest.Mock).mockRejectedValue(new Error());

        await expect(characterClassService.getClassNames()).rejects.toThrowError("Failed to retrieve class names");
    });
});
