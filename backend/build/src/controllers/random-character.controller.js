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
const character_service_1 = require("../services/character.service");
const getRandomCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const race = yield (0, character_service_1.getRandomRace)();
        const className = yield (0, character_service_1.getRandomClass)();
        // @ts-ignore
        const characterClass = yield (0, api_service_1.fetchData)(`https://www.dnd5eapi.co/api/classes/${className.toLowerCase()}`);
        // Vérifier si la classe a un équipement de départ
        // @ts-ignore
        const startingEquipment = characterClass === null || characterClass === void 0 ? void 0 : characterClass.starting_equipment;
        const response = {
            race: race,
            class: className,
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
