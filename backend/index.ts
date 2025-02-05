import express from 'express';
import { CharacterController } from './src/controllers/character.controller';
import characterRoutes from "./src/routes/character.route";

const app = express();
const port = 8080;

app.use(express.json());

app.use('/characters', characterRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
