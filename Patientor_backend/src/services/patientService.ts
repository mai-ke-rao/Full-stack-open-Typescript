import patient from '../../data/patients'

import { Patient, NonSensitivePatient, Entry } from '../types'
import { toNewEntryEntry } from '../utils';
import { v1 as uuid } from 'uuid'

const getEntriesSecure = (): NonSensitivePatient[] => {

    return patient.map(({id, name, dateOfBirth, gender, occupation}) => 
    
    ({id, name, dateOfBirth, gender, occupation}));
};


const getPatientEntries = (params: string): Patient|undefined => {
   var response: Patient|undefined;
    patient.forEach(element => {
      if(element.id == String(params))
        {
           response = element;
        }
   })
 return response
}


const AddNewPatient = (Entry: Patient):Patient => {
  
  let id:string;
  do{
   id = uuid();
   
   var check:Boolean[] = patient.map((individual) => individual.id.toLowerCase().includes(id))
   
  }while(check.includes(true))
  Entry.id = id;
  Entry.entries = [];
  console.log(Entry);
  patient.push(Entry);
return Entry;
} 


const AddNewEntry = (Entry: Entry, patientID: string):Patient|Error => {

  
  //retroactively add entry to the list of entries of the patient
  //  ...
var openPatient = patient.find((pat) => pat.id === patientID)
console.log("patient is: ", openPatient);

if(openPatient){
let id:string;
  do{
   id = uuid();
   
   var check:Boolean[] = openPatient.entries.map((individualEntry) => individualEntry.id.toLowerCase().includes(id))
   
  }while(check.includes(true))
   Entry.id = id;
   try{
    console.log("Entry before utill", Entry);
    
    const newEntry = toNewEntryEntry(Entry);
    console.log("New entry after util", newEntry);
    
    openPatient.entries.push(newEntry);
    console.log("openPatient", openPatient);
    
   const indeks:number =  patient.findIndex((patient) => patient.id === openPatient?.id);
   patient[indeks] = openPatient;
   console.log("novi pacijent", patient[indeks]);
   
    return patient[indeks];
   }catch(e){
   
    
    
    return e as Error
   }
  

  }else{
    throw new Error("patient is not find");
  }

}

export default {
  getEntriesSecure,
  AddNewPatient,
  getPatientEntries,
 AddNewEntry
};