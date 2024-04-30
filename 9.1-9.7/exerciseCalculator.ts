import { isNotNumber } from "./utils";

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating:  1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

interface MultiplyValues {
    value1: number;
    value2: number[];
  }

const parseArguments = (arg1: number, arg2: number[]): MultiplyValues => {
    if ( arg2.length == 0 || !arg1) throw new Error('parameters missing');
   
    if(isNotNumber(Number(arg1))) throw new Error('malformatted parameters');
    
    arg2.forEach(element => { if(isNotNumber(Number(element))) throw new Error('malformatted parameters')});
 
  
    return {
        value1: arg1,
        value2: arg2
    }
  }
  
  


const calculateExrecises = (target: number, dailyExerciseHourse: number []): Result => {

    const result: Result  =
     { 
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating:  1,
        ratingDescription: "",
        target: 0,
        average: 0
    };

    result.periodLength = dailyExerciseHourse.length;
    result.trainingDays = 0;
    let total = 0;
    dailyExerciseHourse.forEach(element => {
        if(element!==0){
            result.trainingDays++;
            total +=element;
        }
    });

      result.average = total/dailyExerciseHourse.length;

     result.target = target;

     result.success = target <= result.average;

     if(result.success)
        {
            result.rating = 3;
            result.ratingDescription = "You are ahead of your target"
        }
        else if(result.average + 0.5 >= target)
            {
                result.rating = 2;
                result.ratingDescription = "You did not reach the target, but ok"
            }
            else{
                result.rating = 1;
                result.ratingDescription = "You are well below the target line"
            }
    
    return result;
}

const compoundFunction = (target: number, dailyExerciseHourse: number []): Result|string => {
  
  try{
    const { value1, value2 } = parseArguments(target, dailyExerciseHourse);
  console.log("values are: ", value1," ", value2);
  return calculateExrecises(value1, value2);
}catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  return errorMessage;
}
}

export default compoundFunction;

