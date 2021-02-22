import diagnoseEntries from '../data/diagnoses.data';
import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoseEntries;
};

export default { getDiagnoses };
