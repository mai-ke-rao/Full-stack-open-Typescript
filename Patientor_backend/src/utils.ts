import { Patient, Gender} from "./types";
import { v1 as uuid } from 'uuid'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender');
    }
    return gender;
}

  const parseSsn = (ssn: unknown): string => {
    if(!isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
  }

  const parseOcupation = (occuaption: unknown) : string => {
    if(!isString(occuaption)){
        throw new Error('Incorrect or missing occupation');
    }
    return occuaption;
  }

const parseName = (name: unknown): string => {
    if(!isString(name)){
        throw new Error('Incorrect or missing name');
    }

    return name;
}

const parseDateOfBirth = (date: unknown): string => {
    if ( !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const toNewPatientEntry = (object: unknown): Patient => {

 if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
 }

 if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)
    { 
        const id:string = uuid();
            const newEntry: Patient = {
                   id: id,
                   name: parseName(object.name),
                   dateOfBirth: parseDateOfBirth(object.dateOfBirth),
                   ssn: parseSsn(object.ssn),
                   gender: parseGender(object.gender),
                   occupation: parseOcupation(object.occupation)
            }
            return newEntry
    }
    
   throw new Error('Incorrect data: some fields are missing');


};

export default toNewPatientEntry;