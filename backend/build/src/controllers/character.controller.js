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
exports.CharacterController = void 0;
const character_service_1 = require("../services/character.service");
class CharacterController {
    constructor() {
        this.characterService = new character_service_1.CharacterService();
    }
    getRandomCharacter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const character = yield this.characterService.getRandomCharacter();
                res.json(character);
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la création du personnage' });
            }
        });
    }
}
exports.CharacterController = CharacterController;
