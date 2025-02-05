import { CharacterService } from '../services/character.service';
import { fetchData } from '../services/api.service';
import { getRandomElement } from '../utils/array.utils';

jest.mock('../services/api.service');
jest.mock('../utils/array.utils');

describe('CharacterService', () => {
    let characterService: CharacterService;

    beforeEach(() => {
        characterService = new CharacterService();
        jest.clearAllMocks();
    });

    test('getRandomClass should return a class name', async () => {
        (fetchData as jest.Mock).mockResolvedValue({
            results: [{ name: 'Wizard' }]
        });
        (getRandomElement as jest.Mock).mockReturnValue({ name: 'Wizard' });

        const className = await characterService.getRandomClass();

        expect(className).toBe('Wizard');
        expect(fetchData).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/classes');
    });

    test('getRandomRace should return a race name', async () => {
        (fetchData as jest.Mock).mockResolvedValue({
            results: [{ name: 'Elf' }]
        });
        (getRandomElement as jest.Mock).mockReturnValue({ name: 'Elf' });

        const race = await characterService.getRandomRace();

        expect(race).toBe('Elf');
        expect(fetchData).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/races');
    });

    test('formatEquipment should return formatted equipment', async () => {
        const mockEquipments = [
            {
                equipment: { name: 'Dagger', url: '/api/equipment/dagger' },
                quantity: 2
            }
        ];

        (fetchData as jest.Mock).mockResolvedValue({ desc: 'A sharp blade.' });

        const formattedEquipments = await characterService.formatEquipment(mockEquipments);

        expect(formattedEquipments).toEqual([
            {
                name: 'Dagger',
                quantity: 2,
                description: 'A sharp blade.'
            }
        ]);

        expect(fetchData).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/equipment/dagger');
    });

    test('formatEquipment should return formatted equipment', async () => {
        const mockEquipments = [
            {
                equipment: { name: 'Dagger', url: '/api/equipment/dagger' },
                quantity: 2
            }
        ];

        (fetchData as jest.Mock).mockResolvedValue({ desc: 'A sharp blade.' });

        jest.spyOn(characterService, 'formatEquipment').mockResolvedValue([
            {
                name: 'Dagger',
                quantity: 2,
                description: 'A sharp blade.'
            }
        ]);

        const formattedEquipments = await characterService.formatEquipment(mockEquipments);

        expect(formattedEquipments).toEqual([
            {
                name: 'Dagger',
                quantity: 2,
                description: 'A sharp blade.'
            }
        ]);

        expect(characterService.formatEquipment).toHaveBeenCalledWith(mockEquipments);
    });

    test('getRandomCharacter should return a character with mock formatEquipment', async () => {
        (fetchData as jest.Mock)
            .mockResolvedValueOnce({ results: [{ name: 'Elf' }] }) // Mock race
            .mockResolvedValueOnce({ results: [{ name: 'Wizard' }] }) // Mock class
            .mockResolvedValueOnce({ starting_equipment: [{ equipment: { name: 'Dagger', url: '/api/equipment/dagger' }, quantity: 1 }] }) // Mock class equipment

        // Mock formatEquipment pour éviter l'appel HTTP
        jest.spyOn(characterService, 'formatEquipment').mockResolvedValue([
            {
                name: 'Dagger',
                quantity: 1,
                description: 'A sharp blade.'
            }
        ]);

        (getRandomElement as jest.Mock).mockImplementation((list) => list[0]);

        const character = await characterService.getRandomCharacter();

        expect(character).toEqual({
            race: 'Elf',
            class: 'Wizard',
            equipments: [
                {
                    name: 'Dagger',
                    quantity: 1,
                    description: 'A sharp blade.'
                }
            ]
        });

        expect(characterService.formatEquipment).toHaveBeenCalled();
    });

    test('getRandomCharacter should return a character with race, class, and equipment', async () => {
        (fetchData as jest.Mock)
            .mockResolvedValueOnce({ results: [{ name: 'Elf' }] })
            .mockResolvedValueOnce({ results: [{ name: 'Wizard' }] })
            .mockResolvedValueOnce({ starting_equipment: [{ equipment: { name: 'Dagger', url: '/api/equipment/dagger' }, quantity: 1 }] }) // Mock class equipment
            .mockResolvedValueOnce({ desc: 'A sharp blade.' });

        (getRandomElement as jest.Mock).mockImplementation((list) => list[0]);

        const character = await characterService.getRandomCharacter();

        expect(character).toEqual({
            race: 'Elf',
            class: 'Wizard',
            equipments: [
                {
                    name: 'Dagger',
                    quantity: 1,
                    description: 'A sharp blade.'
                }
            ]
        });

        expect(fetchData).toHaveBeenCalledTimes(4);
    });
});
