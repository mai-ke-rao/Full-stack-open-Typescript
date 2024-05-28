import {MedicalServices, MedicalServicesOutlined, MonitorHeart, Favorite}from '@mui/icons-material';
import {Entry} from '../types'


const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled type: ${JSON.stringify(value)}`
    );
  };
  
interface EntryType{
    entry: Entry
}
const EntryDetails = ({entry}: EntryType) => {

  

    switch (entry.type) {
      case "Hospital":
        return(<div>
            {entry.date}<MedicalServices/>
            <br></br>
            {entry.description}
            <br></br>
            Discharge: {entry.discharge.date} {entry.discharge.criteria}
            <br></br>
            Diagnosed by: {entry.specialist}
        </div>)
       
        case "HealthCheck":
            let HearthColor: string = "";
  switch (entry.healthCheckRating){
    case 0:
        HearthColor='green'
        break;
        case 1:
            HearthColor='yellow'
            break;
            case 2:
                HearthColor='orange'
                break;
                case 3: 
                HearthColor='red'
                break;
                default:
                    console.log("color error");
                      break;                    
  }
            return(<div>
                {entry.date}<MonitorHeart/>
                <br></br>
                {entry.description}
                <br></br>
                
                <Favorite  sx={{color:HearthColor }}/>
                
                <br></br>
                Diagnosed by: {entry.specialist}
            </div>)
            
            case "OccupationalHealthcare":
                return(<div>
                    {entry.date}<MedicalServicesOutlined/> {entry.employerName}
                    <br></br>
                    {entry.description}
                    <br></br>
                    Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
                    <br></br>
                    Diagnosed by: {entry.specialist}
                </div>)
           
            default:
                assertNever(entry);
                break;
    }

}


export default EntryDetails;