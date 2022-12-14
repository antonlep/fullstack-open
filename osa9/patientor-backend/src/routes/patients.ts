import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.getEntry(req.params.id);
    if (!patient) {
        res.status(404).send("id not found")
    } else {
        res.send(patient);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body)
        const addedPatient = patientService.addPatient(newPatient)
        return res.json(addedPatient)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        return res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body)
        const addedEntry = patientService.addEntry(req.params.id, newEntry)
        return res.json(addedEntry)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        return res.status(400).send(errorMessage);
    }
});

export default router;