import patient from '../../data/patients'

import { PatientSecure, Patient } from '../types'

const getEntriesSecure = (): PatientSecure[] => {

    return patient.map(({id, name, dateOfBirth, gender, occupation}) => 
    
    ({id, name, dateOfBirth, gender, occupation}));
};

const AddNewEntry = (Entry: Patient):Patient => {
  console.log(Entry);
  patient.push(Entry);
return Entry;
} 

export default {
  getEntriesSecure,
  AddNewEntry
};