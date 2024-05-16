import express from "express";

const router = express.Router();

import patientService from "../services/patientService";

import { v1 as uuid } from 'uuid'


router.get('/', (_req, res) => {
    return res.send((patientService.getEntriesSecure()));
});

router.post('/', (req,res) => {
    const id = uuid();
   const addedEntry = patientService.AddNewEntry({...req.body,
        id: id});
   return res.json(addedEntry);
});

export default router;