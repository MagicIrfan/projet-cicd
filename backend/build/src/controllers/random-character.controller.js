"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomCharacter = void 0;
const api_service_1 = require("../services/api.service");
const array_utils_1 = require("../utils/array.utils");
const getRandomCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérer les races
        const races = yield (0, api_service_1.fetchData)('https://www.dnd5eapi.co/api/races');
        const randomRace = (0, array_utils_1.getRandomElement)(races.results);
        // Récupérer les classes
        const classes = yield (0, api_service_1.fetchData)('https://www.dnd5eapi.co/api/classes');
        const randomClass = (0, array_utils_1.getRandomElement)(classes.results);
        // @ts-ignore
        const characterClass = yield (0, api_service_1.fetchData)(`https://www.dnd5eapi.co/api/classes/${randomClass.index}`);
        // Vérifier si la classe a un équipement de départ
        // @ts-ignore
        const startingEquipment = characterClass === null || characterClass === void 0 ? void 0 : characterClass.starting_equipment;
        const response = {
            race: randomRace,
            class: randomClass,
            equipment: startingEquipment
        };
        // Retourner les résultats
        return res.json(response);
    }
    catch (error) {
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
});
exports.getRandomCharacter = getRandomCharacter;
