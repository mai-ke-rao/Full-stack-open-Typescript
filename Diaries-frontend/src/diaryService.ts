import axios from 'axios';
import {DiaryEntry, NewDiaryEntry} from './types.ts';


const baseUrl = "http://localhost:3000/api/diaries/";

export const getAllDiaries = () => {
    return axios.get<DiaryEntry[]>(baseUrl)
    .then(response =>  response.data)

}