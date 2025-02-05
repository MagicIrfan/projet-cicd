import express from 'express';

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World from Express and TypeScript!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
