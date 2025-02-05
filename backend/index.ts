import express from 'express';
import characterRoutes from "./src/routes/character.route";
import classRoutes from "./src/routes/class.route";

const app = express();
const port = 8080;

app.use(express.json());

app.use('/characters', characterRoutes);
app.use('/classes', classRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
