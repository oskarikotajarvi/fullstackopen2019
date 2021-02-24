/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, Entry } from './types';

export const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseStringField(object.name),
        dateOfBirth: parseStringField(object.dateOfBirth),
        ssn: parseStringField(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseStringField(object.occupation),
        entries: parseEntries(object.entries),
    };
};

const isEntryArray = (entries: any): entries is Array<Entry> => {
    if (!isArray(entries)) {
        throw new Error('Malformatted entries');
    }

    const typeCheck = entries.some((entry) => {
        entry.type === 'HealthCheck' || entry.type === 'OccupationalHealthCare' || entry.type === 'Hospital';
    });

    return !typeCheck;
};

const parseEntries = (entries: any): Array<Entry> => {
    if (!isArray(entries)) {
        throw new Error('Malformatted entries');
    }

    if (entries.length === 0) {
        return [];
    } else if (!isEntryArray(entries)) {
        throw new Error('Malformatted entries');
    } else {
        return entries;
    }
};

const isArray = (entries: any): entries is Array<any> => {
    return Array.isArray(entries);
};

const parseStringField = (field: any): string => {
    if (!field || !isString(field)) {
        throw new Error('Incorrect or missing field: ' + field);
    }
    return field;
};

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
