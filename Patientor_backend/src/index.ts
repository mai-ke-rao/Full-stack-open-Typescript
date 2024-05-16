import  express  from "express";
const app = express();
import diagnosisRouter from './routes/diagnosis'
import patientRouter from './routes/patient'
var cors = require('cors')

app.use(cors())
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    
console.log("Someone pinged");  
res.send('pong');

})

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, ()=> {
    
    console.log(`Server running on port ${PORT}`);
    
})