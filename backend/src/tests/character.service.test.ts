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

    test('getRandomClass should return a class name', async () => {
        const mockClassResponse = { results: [{ name: 'Wizard' }] };
        (fetchData as jest.Mock).mockResolvedValue(mockClassResponse);
        (getRandomElement as jest.Mock).mockReturnValue(mockClassResponse.results[0]);

        const className = await characterService.getRandomClass();

        expect(className).toBe('Wizard');
        expect(fetchData).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/classes');
    });

    test('getRandomRace should return a race name', async () => {
        const mockRaceResponse = { results: [{ name: 'Elf' }] };
        (fetchData as jest.Mock).mockResolvedValue(mockRaceResponse);
        (getRandomElement as jest.Mock).mockReturnValue(mockRaceResponse.results[0]);

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

        const mockEquipmentData = { equipment_category: { name: 'Weapon' } };
        (fetchData as jest.Mock).mockResolvedValueOnce(mockEquipmentData);

        const formattedEquipments = await characterService.formatEquipment(mockEquipments);

        expect(formattedEquipments).toEqual([
            {
                name: 'Dagger',
                quantity: 2,
                category: 'Weapon'
            }
        ]);

        expect(fetchData).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/equipment/dagger');
    });

    test('formatEquipment should return default equipment if no equipment or url', async () => {
        const mockEquipments = [
            {
                equipment: null,
                quantity: 2
            }
        ];

        const formattedEquipments = await characterService.formatEquipment(mockEquipments);

        expect(formattedEquipments).toEqual([
            {
                name: 'Unknown',
                quantity: 0,
                category: ''
            }
        ]);
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
