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
exports.CharacterService = void 0;
const api_service_1 = require("./api.service");
const array_utils_1 = require("../utils/array.utils");
class CharacterService {
    getRandomClass() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const classes = yield (0, api_service_1.fetchData)('https://www.dnd5eapi.co/api/classes');
            const randomClass = (0, array_utils_1.getRandomElement)(classes.results);
            return (_a = randomClass === null || randomClass === void 0 ? void 0 : randomClass.name) !== null && _a !== void 0 ? _a : '';
        });
    }
    getRandomRace() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const races = yield (0, api_service_1.fetchData)('https://www.dnd5eapi.co/api/races');
            const randomRaces = (0, array_utils_1.getRandomElement)(races.results);
            return (_a = randomRaces === null || randomRaces === void 0 ? void 0 : randomRaces.name) !== null && _a !== void 0 ? _a : '';
        });
    }
    formatEquipment(equipments) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const formattedEquipments = [];
            for (const equipment of equipments) {
                const { name, url, desc } = equipment.equipment;
                const quantity = equipment.quantity;
                if (url) {
                    try {
                        const equipmentData = yield (0, api_service_1.fetchData)(`https://www.dnd5eapi.co${url}`);
                        formattedEquipments.push({
                            name: name,
                            quantity: quantity,
                            description: (_a = equipmentData === null || equipmentData === void 0 ? void 0 : equipmentData.desc) !== null && _a !== void 0 ? _a : '',
                        });
                    }
                    catch (error) {
                        console.error(`Erreur lors de la récupération des équipements pour l'URL: ${url}`, error);
                    }
                }
                else {
                    formattedEquipments.push({
                        name: name,
                        quantity: quantity,
                        description: desc !== null && desc !== void 0 ? desc : '',
                    });
                }
            }
            return formattedEquipments;
        });
    }
    getRandomCharacter() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const race = yield this.getRandomRace();
            const className = yield this.getRandomClass();
            const characterClass = yield (0, api_service_1.fetchData)(`https://www.dnd5eapi.co/api/classes/${className.toLowerCase()}`);
            const startingEquipment = (_a = characterClass === null || characterClass === void 0 ? void 0 : characterClass.starting_equipment) !== null && _a !== void 0 ? _a : [];
            const equipments = yield this.formatEquipment(startingEquipment);
            return {
                race: race,
                class: className,
                equipments: equipments
            };
        });
    }
    ;
}
exports.CharacterService = CharacterService;
