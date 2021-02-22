import { v1 as uuid } from 'uuid';

import patientEntries from '../data/patients.data';
import { Patient, DescreetPatient, NewPatientEntry } from '../types';

const getDescreetPatients = (): Array<DescreetPatient> => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatients = (): Array<Patient> => {
    return patientEntries;
};

const addPatient = (patient: NewPatientEntry): Patient => {
    const newPatientEntry = { id: uuid(), ...patient };
    patientEntries.push(newPatientEntry);
    return newPatientEntry;
};

export default { getDescreetPatients, getPatients, addPatient };
