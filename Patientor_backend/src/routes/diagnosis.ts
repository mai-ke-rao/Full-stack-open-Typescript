import express from 'express';

const router = express.Router();

import dignosisService from '../services/dignosisService';

router.get('/', (_req, res) => {
    res.send(dignosisService.getEntries());
});

export default router;