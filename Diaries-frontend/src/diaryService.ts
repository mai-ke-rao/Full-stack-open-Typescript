import axios from 'axios';
import {DiaryEntry, NewDiaryEntry} from './types.ts';


const baseUrl = "http://localhost:3000/api/diaries/";

export const getAllDiaries = () => {
    return axios.get<DiaryEntry[]>(baseUrl)
    .then(response =>  response.data)

}

export const createDiary = async(object: NewDiaryEntry) => {
    try{
    const response = await axios
      .post<NewDiaryEntry>(baseUrl, object)
      .then(response => response.data)
      return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response);
            return error;
            // Do something with this error...
          } else {
            console.error(error);
            return error;
          }
    }
   
  }