import { useState, useEffect } from 'react'
import './App.css'
import { getAllDiaries } from './diaryService'
import { DiaryEntry, NewDiaryEntry } from './types'
function App() {

const [diaries, setDiaries] = useState<DiaryEntry[]>([
  {
    id: 2,
    date: "2017-04-01",
    weather: "sunny",
    visibility: "good",
    comment: "Everything went better than expected, I'm learning much"
}
])

  useEffect(() => {
     getAllDiaries().then(data => {
      setDiaries(data)}
     )
  }, [])

  return (
    <div>
    <h1>Diary Entries</h1>
    {diaries.map(el => 
      <p>{el.visibility}</p>
    )}
    </div>
  )
}

export default App
