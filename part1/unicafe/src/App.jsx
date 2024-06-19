import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

  const calculateAverage = () => total === 0 ? 0 : (good - bad) / total
  const calculatePositive = () => total === 0 ? 0 : (good / total) * 100

  const handleGoodFeedback = () => {
    console.log('feedback given: good')
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    console.log('feedback given: neutral')
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    console.log('feedback given: bad')
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodFeedback}>
        good
      </button>
      <button onClick={handleNeutralFeedback}>
        neutral
      </button>
      <button onClick={handleBadFeedback}>
        bad
      </button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>average {calculateAverage()}</p>
      <p>positive {calculatePositive()} %</p>
    </div>
  )
}

export default App
