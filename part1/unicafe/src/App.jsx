import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <div>
        {text} {value}
      </div>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  const calculateAverage = () => total === 0 ? 0 : (good - bad) / total
  const calculatePositive = () => total === 0 ? '0 %' : `${((good / total) * 100).toFixed(2)} %`

  if (total === 0 ) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='average' value={calculateAverage()} />
      <StatisticLine text='positive' value={calculatePositive()} />
    </>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <Button text='good' onClick={handleGoodFeedback} />
      <Button text='neutral' onClick={handleNeutralFeedback} />
      <Button text='bad' onClick={handleBadFeedback} />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
