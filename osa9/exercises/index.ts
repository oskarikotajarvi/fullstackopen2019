import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const isNumberArray = <T>(arr: Array<T>) => {
    if (!Array.isArray(arr)) {
        return false;
    } else {
        if (arr.some((el) => isNaN(Number(el)))) {
            return false;
        }
        return true;
    }
};

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello fullstack');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(400).json({ error: 'Malformatted parameters' });
    }

    const result = calculateBmi(Number(height), Number(weight));
    const responseObj = { weight, height, bmi: result };
    return res.status(200).json(responseObj);
});

app.post('/exercises', (req, res) => {
    const { target, daily_exercises } = req.body;
    if (!target || !daily_exercises) {
        return res.status(400).json({ error: 'Parameters missing' });
    }

    if (!isNumberArray(daily_exercises) || isNaN(Number(target))) {
        return res.status(400).json({ error: 'Malformatted parameters' });
    }

    const exerciseResult = calculateExercises(target, daily_exercises);
    return res.status(200).json(exerciseResult);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
