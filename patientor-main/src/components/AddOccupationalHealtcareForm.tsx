import {  TextField, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import patientService from '../services/patients'
import {useState} from 'react'
import { HealthCheckRating as HRating, Patient } from '../types';
import { Description } from '@mui/icons-material';
import { useParams} from 'react-router-dom'

interface setProp{
  setPatient: React.Dispatch<React.SetStateAction<Patient|undefined>>
  setNotification: React.Dispatch<React.SetStateAction<string|undefined>>
  setOccupationalHealthcareFormVisible: React.Dispatch<React.SetStateAction<boolean>>
  occupationalHealthcareFormVisible: boolean
  diagnosisOptions: string[]
}


export const AddOccupationalHealtcareForm:React.FC<setProp> = (props: setProp) => {
      


      //base
    const [descritpion, setDescritpion] = useState<string|undefined>();
    const [date, setDate] = useState<string|undefined|null>();
    const [specialist, setSpecialist] = useState<string|undefined>();
    const [diagnosisCodes, setDiagnosisCodes] = useState<string []>([]);
    //base over


 
    //OccupationalHealthcare
     const [employerName, setEmployerName] = useState<string|undefined>();
     const [startDate, setStartDate] = useState<string|undefined>();
     const [endDate, setEndDate] = useState<string|undefined>();

    
    if(!props.occupationalHealthcareFormVisible)
{
 return(<></>)
}
const onDiagnosisCodeChange = (event: SelectChangeEvent<string>) => {
  event.preventDefault();
  if ( typeof event.target.value === "string") {
    const value = event.target.value;
     const choice = props.diagnosisOptions.find(el => el === value)
     if(choice){
     setDiagnosisCodes([...diagnosisCodes, choice])
     }
  }
};


     var id:string|undefined  = useParams().id;

 const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if(id){
      patientService.addOneEntry({
      description: descritpion === ''? undefined: descritpion,
      date: date  === ''? undefined:date,
      specialist: specialist  === ''? undefined:specialist,
      diagnosisCodes: diagnosisCodes,
      type:"OccupationalHealthcare",
      employerName:employerName === ''? undefined:employerName,
      sickLeave:{
        startDate: startDate,
        endDate: endDate
      }


     }, id).then(data => {
     
      if(data.entries){
      props.setPatient(data as unknown as Patient);
      console.log("I am in if");
      
      }else{
      props.setNotification(String(data))
      setTimeout(() => {
        props.setNotification('')
      }, 5000)
        console.log(String(data));
      }
      
     
    }
  
     )

     setDate('');
     setDiagnosisCodes([]);
     setDescritpion('');
     setSpecialist('');

     setEmployerName('');
     setStartDate('');
     setEndDate('');

     
    }
    else{
      throw new Error ("Internal server error: I dont have patients ID")
    }

}

return(
  <div>
    <form onSubmit={addEntry}>
<TextField 
  label="Description"
  value={descritpion}
  onChange={({ target }) => setDescritpion(target.value)}
  /><br></br>
  <TextField 
  label="Date"
  value={date}
  onChange={({target}) => setDate(target.value)}
  /><br></br>
   <TextField 
  label="Specialist"
  value={specialist}
  onChange={({target}) => setSpecialist(target.value)}
  /><br></br>
   <TextField 
  label="Empolyer name"
  value={employerName}
  onChange={({target}) => setEmployerName(target.value)}
  /> 
  <p> Sick leave: </p>
    <TextField 
  label="Start date"
  value={startDate}
  onChange={({target}) => setStartDate(target.value)}
  /> 
   <TextField 
  label="End Date"
  value={endDate}
  onChange={({target}) => setEndDate(target.value)}
  /> 
  <br></br>
  <TextField 
  label="Diagnosis codes"
  value={diagnosisCodes}
  onChange={({target}) => setDiagnosisCodes(target.value.split(','))}
  />
    <Select
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes.toString()}
          onChange={onDiagnosisCodeChange}
>
{props.diagnosisOptions.map(el => 
      <MenuItem
      key={el}
      value={el}
    >
      {el}
    </MenuItem>
  )}

</Select>
  <br></br>
 <button type='button' onClick={()=> props.setOccupationalHealthcareFormVisible(false)}>Cancel</button><button type='submit'>Add</button> 
    </form>
  </div>
)
}

