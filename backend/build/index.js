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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const character_controller_1 = require("./src/controllers/character.controller");
const app = (0, express_1.default)();
const port = 8080;
// Instancier le contrôleur
const characterController = new character_controller_1.CharacterController();
app.use(express_1.default.json());
// Route d'accueil
app.get('/', (req, res) => {
    res.send('Hello World from Express and TypeScript!');
});
// Route pour obtenir un personnage aléatoire
app.get('/random-character', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Appeler la méthode de la classe contrôleur
        const character = yield characterController.getRandomCharacter(req, res);
        res.json(character);
    }
    catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du personnage.' });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
