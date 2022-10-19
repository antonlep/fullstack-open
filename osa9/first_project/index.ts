import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();
const jsonParser = bodyParser.json();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(400).json({ error: 'malformatted input' });
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.send({ weight: weight, height: height, bmi: bmi });
});

app.post('/exercises', jsonParser, (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;
    if (!target || !daily_exercises) return res.status(400).send({ error: 'parameters missing' });
    if (isNaN(Number(target))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    const resul = [];
    for (const value of daily_exercises) {
        if (isNaN(Number(value))) return res.status(400).send({ error: 'malformatted parameters' });
        resul.push(Number(value));
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercise(resul, target);
    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});