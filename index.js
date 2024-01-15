const express = require('express');
const fs = require('fs');

const server = express();
const port = process.env.PORT || 3000;
const exercisesDataPath = './src/exercises.json';

const exerciciosData = JSON.parse(fs.readFileSync(exercisesDataPath));
const validTypes = [
    'phyton', 'javascript', 'c', 'java', 'c++', 'c#', 'ruby', 'swift',
    'php', 'html&css', 'go', 'kotlin', 'rust', 'typescript', 'sql'
];

// Armazenar exercícios já retornados para evitar repetição
const returnedExercises = {};

server.get('/random_exercise_language/:type', (req, res) => {
    const type = req.params.type;

    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid type...' });
    }

    const exercises = exerciciosData[type];

    if (!exercises || exercises.length === 0) {
        return res.status(404).json({ error: 'No exercises available for the specified type.' });
    }

    // Filtrar exercícios que ainda não foram retornados
    const remainingExercises = exercises.filter(exercise => !returnedExercises[exercise.id]);

    if (remainingExercises.length === 0) {
        return res.status(400).json({ error: 'No more unique exercises available for the specified type.' });
    }

    // Escolher aleatoriamente um exercício dos restantes
    const randomIndex = Math.floor(Math.random() * remainingExercises.length);
    const randomExercise = remainingExercises[randomIndex];

    // Registrar o exercício retornado
    returnedExercises[randomExercise.id] = true;

    res.json(randomExercise);
});

server.listen(port, () => {
    console.log('Server is working');
});