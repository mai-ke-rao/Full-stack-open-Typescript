import {  TextField, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import patientService from '../services/patients'
import {useState} from 'react'
import { HealthCheckRating as HRating, Patient } from '../types';
import { Description } from '@mui/icons-material';
import { useParams} from 'react-router-dom'

interface setProp{
  setPatient: React.Dispatch<React.SetStateAction<Patient|undefined>>
  setNotification: React.Dispatch<React.SetStateAction<string|undefined>>
  setHospitalFormVisible: React.Dispatch<React.SetStateAction<boolean>>
  hospitalFormVisible: boolean
  diagnosisOptions: string[]
}


export const AddHospitalForm:React.FC<setProp> = (props: setProp) => {
      


      //base
    const [descritpion, setDescritpion] = useState<string|undefined>();
    const [date, setDate] = useState<string|undefined>();
    const [specialist, setSpecialist] = useState<string|undefined>();
    const [diagnosisCodes, setDiagnosisCodes] = useState<string []>([]);
    //base over

    //Hospital
    const [DischargeDate, setDischargeDate] = useState<string|undefined>();
    const [criteria, setCriteria] = useState<string|undefined>(); 
  

    
    if(!props.hospitalFormVisible)
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
      type:"Hospital",
      Discharge:{
        date: DischargeDate  === ''? undefined:DischargeDate,
        criteria:criteria  === ''? undefined:criteria
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

      //base
      setDate('');
      setDescritpion('');
      setSpecialist('');

      setDischargeDate('');
      setCriteria('');

     
      setDiagnosisCodes([]);
     

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
  />
  <TextField 
  label="Date"
  value={date}
  onChange={({target}) => setDate(target.value)}
  />
   <TextField 
  label="Specialist"
  value={specialist}
  onChange={({target}) => setSpecialist(target.value)}
  />
   <TextField 
  label="Discharge date"
  value={DischargeDate}
  onChange={({target}) => setDischargeDate(target.value)}
  /> 
     <TextField 
  label="Criteria"
  value={criteria}
  onChange={({target}) => setCriteria(target.value)}
  /> 
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
 <button type='button' onClick={()=> props.setHospitalFormVisible(false)}>Cancel</button><button type='submit'>Add</button> 
    </form>
  </div>
)
}

