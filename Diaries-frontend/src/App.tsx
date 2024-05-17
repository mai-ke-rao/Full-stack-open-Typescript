import { useState, useEffect } from 'react'
import { getAllDiaries, createDiary } from './diaryService'
import { DiaryEntry } from './types'
import { isAxiosError } from 'axios';

function App() {

const [date, setDate] = useState('');
const [visibility, setVisibility] = useState('')
const [weather, setWeather] = useState('')
const [comment, setComment] = useState('')
const [notification, setNotficiation] = useState('')
const [diaries, setDiaries] = useState<DiaryEntry[]>([
])

  useEffect(() => {
     getAllDiaries().then(data => {
      setDiaries(data)}
     )
  }, [date])

const addNewEntry = (event: React.SyntheticEvent) => {
  event.preventDefault()
createDiary({
  date: date,
  visibility: visibility,
  weather: weather,
  comment: comment
}).then(response => 
  isAxiosError(response)? setNotficiation(String(response.response?.data)):null)


  setDate("")
  setComment("")
  setVisibility("")
  setWeather("")
}

  return (
    <div>
        <h1> Add new entry</h1>
        <p style={{color:"red"}}>{notification}</p>
        <form onSubmit={addNewEntry}>
        <div>
          date: 
          <input type="date" id='date' value={date} onChange={({target}) => setDate(target.value)}/>
        </div>
        <div>
        great          <input type="radio" name="visibilty" onChange={() => setVisibility('great')} />
        good    <input type="radio" name="visibilty" onChange={() =>  setVisibility('good')} />
        ok <input type="radio" name="visibilty" onChange={() =>  setVisibility('ok')} />
        poor <input type="radio" name="visibilty" onChange={() =>  setVisibility('poor')} />
      </div>
      <div>
        sunny          <input type="radio" name="weather" onChange={() => setWeather('sunny')} />
        rainy    <input type="radio" name="weather" onChange={() =>  setWeather('rainy')} />
        cloudy <input type="radio" name="weather" onChange={() =>  setWeather('cloudy')} />
        stormy <input type="radio" name="weather" onChange={() => setWeather('stormy')} />
        windy <input type="radio" name="weather" onChange={() => setWeather('windy')} />
      </div>
    <div>
      comment:
      <input type="text" id="comment" value={comment} onChange={({target}) => setComment(target.value)}/>
    </div>
    <button type="submit" id='Send'>Create</button>
        </form>

    <h1>Diary Entries</h1>
    {diaries.map(el => 
    <div key={el.id}>
    <h3 >{el.date}</h3>
      <p >visibility: {el.visibility}
    <br></br>
    weather: {el.weather}
    </p>
   </div>

    )}
    </div>
  )
}

export default App
