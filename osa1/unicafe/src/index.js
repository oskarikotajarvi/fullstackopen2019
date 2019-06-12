import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ click, variant }) => {
  return <button onClick={click}>{variant}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral, all, average, positive }) => {
  if (good + bad + neutral === 0) {
    return <p>No feedback give</p>;
  } else {
    return (
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={all} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //Click handlers
  const goodClick = () => () => setGood(good + 1);
  const neutralClick = () => () => setNeutral(neutral + 1);
  const badClick = () => () => setBad(bad + 1);

  //Statistics handlers
  const countAverage = () => {
    const average = (good + bad * -1) / (good + neutral + bad);
    return average;
  };

  const countPositive = () => {
    let positive = (good / (good + bad + neutral)) * 100;
    positive.toString();
    return positive + "%";
  };

  const countAll = () => {
    const all = good + bad + neutral;
    return all;
  };

  return (
    <div>
      <div>
        <h2>Give feedback</h2>
        <Button click={goodClick()} variant="Good" />
        <Button click={neutralClick()} variant="Neutral" />
        <Button click={badClick()} variant="Bad" />
      </div>
      <div>
        <h2>Statistics</h2>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={countAll()}
          average={countAverage()}
          positive={countPositive()}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
