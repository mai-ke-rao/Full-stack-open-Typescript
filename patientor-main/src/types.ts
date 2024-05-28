export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}




interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  //it refers to the 'code' field in Diagnosis interface, and an array of that. 
  //Helpful if we ever changed type of that field.
  diagnosisCodes?: Array<Diagnosis['code']>;
  //entries: Array<Entry>
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
 
export interface SickLeave{
  startDate: BaseEntry['date'];
  endDate:BaseEntry['date'];
} 

export interface Discharge{
  date: BaseEntry['date'];
  criteria: string
}


interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
   sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry{
  type:"Hospital";
  discharge: Discharge;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;


export type PatientFormValues = Omit<Patient, "id" | "entries">;