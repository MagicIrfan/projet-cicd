import express from 'express';
import { CharacterController } from './src/controllers/character.controller';

const app = express();
const port = 8080;

// Instancier le contrôleur
const characterController = new CharacterController();

app.use(express.json());

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Hello World from Express and TypeScript!');
});

// Route pour obtenir un personnage aléatoire
app.get('/random-character', async (req, res) => {
    try {
        // Appeler la méthode de la classe contrôleur
        const character = await characterController.getRandomCharacter(req, res);
        res.json(character);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du personnage.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
