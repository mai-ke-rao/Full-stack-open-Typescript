import { Patient, Gender, Entry, Diagnosis, HealthCheckRating} from "./types";
//import { v1 as uuid } from 'uuid'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isNumber = (value: unknown): value is number => {
    return typeof value === 'number' && isFinite(value);
  }
  

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

  const parseId = (id: unknown): string => {
    if(!isString(id)){
        throw new Error('Incorrect or missing id');
    }
  
    return id;
  }
  
  
  
  const parseEntries = (param: Entry[]):Entry[] => {
   
    param.forEach(el => {
      switch (el.type){
        case 'Hospital':
          break;
          case 'HealthCheck':
            break;
            case 'OccupationalHealthcare':
              break;
              default:
                throw new Error(
                  `Unhandled discriminated union member: `
                );
                }
     
    })
    return param;
  }
  
//Designed to work with extraneous data, used in data section.
export const toNewPatientEntry = (object: unknown): Patient => {

 if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
 }


 if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'id' in object
  && 'entries' in object)
    { 
     
            const newEntry: Patient = {
                   id: parseId(object.id),
                   name: parseName(object.name),
                   dateOfBirth: parseDateOfBirth(object.dateOfBirth),
                   ssn: parseSsn(object.ssn),
                   gender: parseGender(object.gender),
                   occupation: parseOcupation(object.occupation),
                   entries: parseEntries(object.entries as Entry[])
            }
            return newEntry
    }
    
   throw new Error('Incorrect data: some fields are missing');


};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v).includes(param);
}
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if(!isNumber(rating) || !isHealthCheckRating(rating)){
      throw new Error('Incorrect or missing rating');
  }
  return rating;
}
const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> =>  {
  

  return diagnosisCodes as Array<Diagnosis['code']>;
};




export const toNewEntryEntry = (object: unknown): Entry => {
  
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
 }else{
 if( 'id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'type' in object){
const type:string = parseType(object.type);
switch(type){
  case 'Hospital':
    if( 'Discharge' in object && typeof object.Discharge === 'object' && object.Discharge !== null && 'criteria' in object.Discharge && 'date' in object.Discharge){
      const newEntry: Entry = {
        id: String(object.id),
        description: String(object.description),
        date: String(object.date),
        specialist: String(object.specialist),
        diagnosisCodes: 'diagnosisCodes' in object? parseDiagnosisCodes(object.diagnosisCodes): ["Deste deco"],
        type: type,
        discharge: {date: String(object.Discharge.date),
        criteria: String(object.Discharge.criteria)}
      }
      return newEntry;
    }
    else{
      
      
      throw new Error ("discharge (date or criteria missing) ");
    }
    case 'OccupationalHealthcare':
         if('employerName' in object){
          const newEntry: Entry = {
            id: String(object.id),
            description: String(object.description),
            date: String(object.date),
            specialist: String(object.specialist),
            diagnosisCodes: 'diagnosisCodes' in object? parseDiagnosisCodes(object.diagnosisCodes): [],
            type: type,
            employerName: String(object.employerName),
            sickLeave: {startDate: (object as any).sickLeave.startDate, endDate:(object as any).sickLeave.endDate }
          }
          return newEntry;
         }
         else{
          throw new Error ("Employee name missing");
         }
         case 'HealthCheck':
          if('healthCheckRating' in object){
            const newEntry: Entry = {
              id: String(object.id),
              description: String(object.description),
              date: String(object.date),
              specialist: String(object.specialist),
              diagnosisCodes: 'diagnosisCodes' in object? parseDiagnosisCodes(object.diagnosisCodes): [],
              type: type,
              healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          }
          return newEntry;
}else{
  throw new Error ("Health Rating missing");
}
default:
  throw new Error ("Incorrect data: some fields are missing");


}
 }
 else{
  throw new Error ("Incorrect data: some universal fields are missing");
 }
 }
}





function parseType (type: unknown): string {
  if(!isString(type)){
      throw new Error('Incorrect or missing type');
  }

  return type;
}


