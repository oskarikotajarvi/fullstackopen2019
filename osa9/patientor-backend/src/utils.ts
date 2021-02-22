/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

export const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseStringField(object.name),
        dateOfBirth: parseStringField(object.dateOfBirth),
        ssn: parseStringField(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseStringField(object.occupation),
    };
};

const parseStringField = (field: any): string => {
    if (!field || !isString(field)) {
        throw new Error('Incorrect or missing field: ' + field);
    }
    return field;
};

// const parseDate = (date: any): string => {
//     if (!date || isString(date) || isDate(date)) {
//         throw new Error('Incorrect or missing date: ' + date);
//     }
//     return date;
// };

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };
