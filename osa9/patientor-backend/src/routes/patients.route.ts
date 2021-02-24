import express from 'express';

import { toNewPatientEntry } from '../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    const descreetPatients = patientService.getDescreetPatients();
    res.json(descreetPatients);
});

router.post('/', (req, res) => {
    try {
        const { name, dateOfBirth, ssn, gender, occupation } = req.body;

        const newPatientEntry = patientService.addPatient(toNewPatientEntry({ name, dateOfBirth, ssn, gender, occupation }));
        res.json(newPatientEntry);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/:id', (req, res) => {
    try {
        const patient = patientService.getPatient(req.params.id);
        res.json(patient);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export default router;
