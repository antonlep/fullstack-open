import patients from '../../data/patients';
import { v1 as uuid } from 'uuid'

import { SensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getSensitiveEntries = (): SensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const id = uuid()
    const newPatient = {
        id: id,
        ...entry
    }
    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getSensitiveEntries,
    addPatient
};