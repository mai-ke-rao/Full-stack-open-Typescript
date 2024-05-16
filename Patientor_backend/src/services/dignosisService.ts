import diagnosis from '../../data/dignosis'

import { Diagnosis } from '../types'

const getEntries = (): Diagnosis[] => {

    return diagnosis;
};

export default {
  getEntries
};