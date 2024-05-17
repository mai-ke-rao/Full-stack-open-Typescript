/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

const router = express.Router();

import diaryService from '../services/diaryService';

import toNewDiaryEntry from '../utils';

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

/*
router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});*/

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});


router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;