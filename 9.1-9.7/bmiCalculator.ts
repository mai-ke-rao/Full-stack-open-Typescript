import { isNotNumber } from "./utils";


interface MultiplyValues {
    value1: number;
    value2: number;
  }

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');
  
    if (!isNotNumber(Number(args[0])) && !isNotNumber(Number(args[1]))) {
      return {
        value1: Number(args[0]),
        value2: Number(args[1])
      }
    } else {
      throw new Error('malformatted parameters');
    }
  }

function calculateBi(height: number, weight: number): string {

    height = height/100;

    const bmi: number = weight / (height * height)

    console.log("BMI: ",bmi);
    
    if (bmi < 18.5) {
        return "Underweight"
    }
    else if (bmi < 24.9) {
        return "Normal healty weight"
    }
    else if (bmi < 29.9) {
        return "Overweight"
    }
    else {
        return "Obese"
    }
}
 //eslint-disable-next-line @typescript-eslint/no-explicit-any
const compoundFunction = (arg1:string, arg2:string):any => {
const compoundArgs: string[] = [arg1, arg2]
try{
const { value1, value2 } = parseArguments(compoundArgs);
return calculateBi(value1, value2);
}catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
  return errorMessage;
}

}

export default compoundFunction;



