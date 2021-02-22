import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routes/diagnoses.route';
import patientRouter from './routes/patients.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
