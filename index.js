const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

const exerciciosData = JSON.parse(fs.readFileSync('./src/exercises.json'));

server.get('/random_exercise_language/:type', (req, res) => {
    const type = req.params.type;
    if (
        type !== 'phyton' &&
        type !== 'javascript' &&
        type !== 'c' &&
        type !== 'java' &&
        type !== 'c++' &&
        type !== 'c#' &&
        type !== 'ruby' &&
        type !== 'swift' &&
        type !== 'php' &&
        type !== 'html&css' &&
        type !== 'go' &&
        type !== 'kotlin' &&
        type !== 'rust' &&
        type !== 'typescript' &&
        type !== 'sql'
    ) {
        return res.status(400).json({ error: 'Invalid type...' });
    } 
        
    let selectedType = type;

    const exercises = exerciciosData[selectedType];
    randomExercise = exercises[Math.floor(Math.random() * exercises.length)];

    res.json(randomExercise);
})

server.listen(port, () => {
    console.log('server is working')
});