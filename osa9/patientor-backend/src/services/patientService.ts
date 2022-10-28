import patients from '../../data/patients';
import { v1 as uuid } from 'uuid'

import { Patient, PublicPatient, NewPatientEntry, NewEntry } from '../types';

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

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
    const patient = getEntry(id);
    if (patient) {
        for (var i = 0; i < patients.length; i++) {
            if (patients[i].id === id) {
                patients.splice(i, 1);
                i--;
            }
        }
        const oldEntries = patient?.entries;
        const newEntry = {
            id: uuid(),
            ...entry
        }
        const newPatient = {
            ...patient,
            entries: oldEntries?.concat(newEntry)
        };
        patients.push(newPatient);
        return newPatient;
    } else {
        return undefined;
    }
};

export default {
    getEntries,
    getSensitiveEntries,
    addPatient,
    getEntry,
    addEntry
};