import diagnoseEntries from '../data/diagnoses.data';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnoseEntries;
};

export default { getDiagnoses };
