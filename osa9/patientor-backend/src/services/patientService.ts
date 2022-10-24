import patients from '../../data/patients';
import { v1 as uuid } from 'uuid'

import { Patient, PublicPatient, NewPatientEntry } from '../types';

const getEntries = (): Patient[] => {
    return patients;
};

const getEntry = (id: string): Patient | undefined => {
    return patients.find(a => a.id === id);
};

const getSensitiveEntries = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
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
    addPatient,
    getEntry
};