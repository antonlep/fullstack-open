import { NewPatientEntry, Gender, NewEntry } from './types'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

const parseDate = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date');
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {
    const newPatient: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
    return newPatient;
};

const checkProps = (props: EntryFields, fields: string[]): boolean => {
    let check = true;
    fields.forEach(element => {
        if (!props.hasOwnProperty(element)) {
            check = false;
        }
    });
    return check
}

type EntryFields = { [key: string]: any };

// export const toNewEntry = ({ description, date, specialist, type, diagnosisCodes, healthCheckRating, discharge, employerName, sickLeave }: EntryFields): NewEntry => {
export const toNewEntry = (props: EntryFields): NewEntry => {
    if (!props.type) {
        throw new Error('Type missing');
    }
    if (props.type === 'HealthCheck') {
        if (!checkProps(props, ['description', 'date', 'specialist', 'healthCheckRating'])) {
            throw new Error('Required fields missing');
        }
        const newEntry: NewEntry = {
            type: props.type,
            description: props.description,
            date: props.date,
            specialist: props.specialist,
            healthCheckRating: props.healthCheckRating,
        }
        return newEntry;
    } else if (props.type === 'Hospital') {
        if (!checkProps(props, ['description', 'date', 'specialist', 'discharge'])) {
            throw new Error('Required fields missing');
        }
        const newEntry: NewEntry = {
            type: props.type,
            description: props.description,
            date: props.date,
            specialist: props.specialist,
            discharge: {
                date: props.discharge.date,
                criteria: props.discharge.criteria
            }
        }
        return newEntry;
    } else if (props.type === 'OccupationalHealthcare') {
        if (!checkProps(props, ['description', 'date', 'specialist', 'employerName'])) {
            throw new Error('Required fields missing');
        }
        const newEntry: NewEntry = {
            type: props.type,
            description: props.description,
            date: props.date,
            specialist: props.specialist,
            employerName: props.employerName
        }
        return newEntry;
    } else {
        throw new Error('Wrong type');
    }
};

export default toNewPatient;