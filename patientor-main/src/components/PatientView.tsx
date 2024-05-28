import patientService from '../services/patients'
import diagnosisService from '../services/diagnosis'
import { useParams} from 'react-router-dom'
import { useState, useEffect} from 'react'
import {Patient, Diagnosis} from '../types'
import EntryDetails from './EntryDetails'
import { AddHealthCheckForm } from './AddHealthCheckForm'
import { AddOccupationalHealtcareForm} from './AddOccupationalHealtcareForm'
import { AddHospitalForm} from './AddHospitalForm'
import { Female, Male, Transgender}  from '@mui/icons-material';



export const PatientView = () => {
    //const [diagnosisOptions, setDiagnosisOptions] = useState<string[]>([]);
    const [healthCheckFormVisible, setHealthCheckFormVisible] = useState(false);
    const [occupationalHealthcareFormVisible, setOccupationalHealthcareFormVisible] = useState(false);
    const [hospitalFormVisible, setHospitalFormVisible] = useState(false);
    const [notification, setNotification] = useState<string>();
    const [patient, setPatient] = useState<Patient>();
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
console.log("id in Patient is ",useParams().id);
var id:string|undefined  = useParams().id;




useEffect(()=> {
    const fetchPatient = async () => {
        if(id){
        const temp = await patientService.getOne(id);
        setPatient(temp);
        }
      
      };
      void fetchPatient();
}, []);

useEffect(()=> {
    const fetchDiagnosis = async () => {
       
        const temp = await diagnosisService.getAll();
        setDiagnosis(temp);
        
      };
        
      void fetchDiagnosis;
}, []);



console.log("Diagnosis", diagnosis);

return (
<div>
      
    <h3>{patient?.name}{patient?.gender == 'male'? (<Male color="primary"/>):null}{patient?.gender == 'female'? (<Female color="primary"/>):null}
    {patient?.gender == 'other'? (<Transgender color="primary"/>):null}</h3>             
    <br></br>
ssn: {patient?.ssn}<br></br>
occupation: {patient?.occupation}
<br></br>
<span style={{backgroundColor:'red'}}>{notification}</span>
<br></br>
{healthCheckFormVisible? <AddHealthCheckForm setPatient={setPatient} setNotification={setNotification} setHealthCheckFormVisible={setHealthCheckFormVisible} healthCheckFormVisible={healthCheckFormVisible} /*diagnosisOptions={diagnosisOptions}*//> : null}
{occupationalHealthcareFormVisible? <AddOccupationalHealtcareForm setPatient={setPatient} setNotification={setNotification} setOccupationalHealthcareFormVisible={setOccupationalHealthcareFormVisible} occupationalHealthcareFormVisible={occupationalHealthcareFormVisible}/> : null}
{hospitalFormVisible? <AddHospitalForm setPatient={setPatient} setNotification={setNotification} setHospitalFormVisible={setHospitalFormVisible} hospitalFormVisible={hospitalFormVisible}/> : null}
<br></br>
<button onClick={() => setHealthCheckFormVisible(true)}> Add Healthcheck entry </button>
<button onClick={() => setHospitalFormVisible(true)}> Add Hospital entry </button>
<button onClick={() => setOccupationalHealthcareFormVisible(true)}> Add Occupational Healthcare entry </button>
<h3>Entries</h3>
<>
{patient? patient?.entries?.map(el => (
<div key={el.id} style={{border: 2, borderStyle: 'solid', borderColor:'black'}}>
<p>
    <EntryDetails entry={el}/>
</p>

<ul key={el.id}>
    {el.diagnosisCodes?.map(code => (
        <li key={code}>{code} {diagnosis?.map((el) => el.code === code? el.name:null)}  </li>
))}
  </ul>  
  </div >
)):null
}

</>
</div>)

}
