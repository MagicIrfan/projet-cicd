"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const random_character_controller_1 = require("./src/controllers/random-character.controller");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World from Express and TypeScript!');
});
app.get('/random-character', (req, res) => {
    (0, random_character_controller_1.getRandomCharacter)(req, res);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
