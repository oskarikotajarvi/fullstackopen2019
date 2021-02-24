import { v1 as uuid } from 'uuid';

import patientEntries from '../data/patients.data';
import { Patient, PublicPatient, NewPatientEntry } from '../types';

const getDescreetPatients = (): Array<PublicPatient> => {
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

const getPatient = (id: string): PublicPatient => {
    const patient = patientEntries.filter((patient) => patient.id === id);
    if (!patient) {
        throw new Error('Patient not found');
    } else {
        return patient[0];
    }
};

export default { getDescreetPatients, getPatients, addPatient, getPatient };
