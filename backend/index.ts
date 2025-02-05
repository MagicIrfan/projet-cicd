import express from 'express';
import {getRandomCharacter} from "./src/controllers/random-character.controller";

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World from Express and TypeScript!');
});

app.get('/random-character', (req, res) => {
    getRandomCharacter(req,res);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
