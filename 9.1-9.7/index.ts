import express from 'express';
const app = express();
import qs from 'qs';
import bmiCalculator from './bmiCalculator'
import { Operation, calculator } from './calculator';
import  exerciseCalculator  from './exerciseCalculator';
app.set('query parser',
//eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  (str: string) => qs.parse(str, { /* custom options */ }))

  app.use(express.json());
  
  // ...
  
  app.post('/calculate', (req, res) => {

  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;

    if ( !value1 || isNaN(Number(value1)) ) 
      {   
       
         return res.status(400).send({ error: '...'}); 
         }

  // more validations here...
   //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = calculator(
    Number(value1), Number(value2), op as Operation );

   return  res.send({ result });
  });


app.post('/exercises', (req, res) => {
const { target, daily_exercises } = req.body;
const result = exerciseCalculator(target, daily_exercises);
res.send(result);
})

app.get('/bmi', (req, res) => {
  interface Objekat {
    height: string;
    weight: string;
    bmi: string;
  }
   //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
 const object: Objekat = { height: String(req.query.height),
   //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                weight: String(req.query.weight),
                 //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                bmi: bmiCalculator(String(req.query.height), String(req.query.weight))
  }
  res.send(object)
})

app.get('/hello', (_req, res) => {
  res.send('Hello fullStack');
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});