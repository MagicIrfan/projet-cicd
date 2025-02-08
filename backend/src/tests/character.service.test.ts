import { CharacterService } from '../services/character.service';
import { fetchData } from '../services/api.service';
import { getRandomElement } from '../utils/array.utils';

jest.mock('../services/api.service');
jest.mock('../utils/array.utils');

describe('CharacterService', () => {
    let characterService: CharacterService;

    beforeEach(() => {
        characterService = new CharacterService(fetchData as any);
        jest.clearAllMocks();
    });

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    test('getRandomCharacter should return a character with race, class, and equipment', async () => {
        const mockRaceResponse = { results: [{ name: 'Elf' }] };
        const mockClassResponse = { results: [{ name: 'Wizard' }] };
        const mockClassDetails = { starting_equipment: [{ equipment: { name: 'Dagger', url: '/api/equipment/dagger' }, quantity: 1 }] };
        const mockEquipmentData = { equipment_category: { name: 'Weapon' } };

        (fetchData as jest.Mock)
            .mockResolvedValueOnce(mockRaceResponse)
            .mockResolvedValueOnce(mockClassResponse)
            .mockResolvedValueOnce(mockClassDetails)
            .mockResolvedValueOnce(mockEquipmentData);

        (getRandomElement as jest.Mock).mockImplementation((list) => list[0]);

        const character = await characterService.getRandomCharacter();

        expect(character).toEqual({
            race: 'Elf',
            class: 'Wizard',
            equipments: [
                {
                    name: 'Dagger',
                    quantity: 1,
                    category: 'Weapon'
                }
            ]
        });

        expect(fetchData).toHaveBeenCalledTimes(4);
    });

    test('getRandomCharacter should throw an error if fetch fails', async () => {
        (fetchData as jest.Mock).mockRejectedValue(new Error("Network error"));

        await expect(characterService.getRandomCharacter()).rejects.toThrowError("Impossible to get a random character");
    });

    test('getRandomCharacter should handle missing equipment data gracefully', async () => {
        const mockRaceResponse = { results: [{ name: 'Elf' }] };
        const mockClassResponse = { results: [{ name: 'Wizard' }] };
        const mockClassDetails = { starting_equipment: [] };

        (fetchData as jest.Mock)
            .mockResolvedValueOnce(mockRaceResponse) // Mock race
            .mockResolvedValueOnce(mockClassResponse) // Mock class
            .mockResolvedValueOnce(mockClassDetails); // Mock class starting equipment

        (getRandomElement as jest.Mock).mockImplementation((list) => list[0]);

        const character = await characterService.getRandomCharacter();

        expect(character).toEqual({
            race: 'Elf',
            class: 'Wizard',
            equipments: []
        });

        expect(fetchData).toHaveBeenCalledTimes(3);
    });
});
