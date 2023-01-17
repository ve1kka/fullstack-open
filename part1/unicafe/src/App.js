import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text === "Positive")
    return (<tr><td>{props.text} {props.value}%</td></tr>)

  return (<tr><td>{props.text} {props.value}</td></tr>)
}

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value ={props.good} />
        <StatisticLine text="Neutral" value ={props.neutral}/>
        <StatisticLine text="Bad" value ={props.bad} />
        <StatisticLine text="All" value ={props.good + props.neutral + props.bad} />
        <StatisticLine text="Average" value ={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
        <StatisticLine text="Positive" value ={(props.good / (props.good + props.neutral + props.bad)) * 100}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good+1)}>Good</button>
      <button onClick={() => setNeutral(neutral+1)}>Neutral</button>
      <button onClick={() => setBad(bad+1)}>Bad</button>
      <h1>Statistics</h1>
      { good || neutral || bad ? (<Statistics good={good} neutral={neutral} bad={bad}/>) : (<div>No feedback given</div>)}
    </div>
  )
}

export default App