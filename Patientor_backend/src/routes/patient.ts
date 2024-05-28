import express from "express";

const router = express.Router();

import patientService from "../services/patientService";




router.get('/', (_req, res) => {
    return res.send((patientService.getEntriesSecure()));
});


router.get('/:id', (req, res) => {
    const result = patientService.getPatientEntries(req.params.id)
    
 if(result)
    {
        return res.send(result);
       
    }
    else{
        return res.status(404).send({
            message: 'This is an error!'
         });
    }
  
});


router.post('/', (req,res) => {
    
   const addedEntry = patientService.AddNewPatient({...req.body});

   
   return res.json(addedEntry);
});


router.post('/:id/entries', (req,res) => {
    
    const addedEntry = patientService.AddNewEntry({...req.body}, req.params.id);
    
      
    if('message' in addedEntry){
    console.log("Error about to be jsoned", addedEntry);
    return res.json(addedEntry.message)
    }
        return res.json(addedEntry); 

})

export default router;