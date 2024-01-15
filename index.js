const express = require('express');
const fs = require('fs');

const server = express();
const port = process.env.PORT || 3000;
const exercisesDataPath = './src/exercises.json';

// Read and parse JSON data during server startup
const exerciciosData = JSON.parse(fs.readFileSync(exercisesDataPath));

const validTypes = [
    'phyton', 'javascript', 'c', 'java', 'c++', 'c#', 'ruby', 'swift',
    'php', 'html&css', 'go', 'kotlin', 'rust', 'typescript', 'sql'
];

server.get('/random_exercise_language/:type', (req, res) => {
    const type = req.params.type;

    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid type...' });
    }

    const exercises = exerciciosData[type];
    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];

    res.json(randomExercise);
});

server.listen(port, () => {
    console.log('Server is working');
});