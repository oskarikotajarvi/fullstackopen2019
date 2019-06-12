import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </>
  );
};

const MostVoted = ({ anecdotes, votes, handler }) => {
  if (Math.max(...votes) === 0) {
    return (
      <>
        <p>No votes yet.</p>
      </>
    );
  }
  return (
    <>
      <p>{anecdotes[handler]}</p>
      <p>Has {votes[handler]} votes</p>
    </>
  );
};

const Button = ({ text, click }) => {
  return <button onClick={click}>{text}</button>;
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(6 + 1)
      .join("0")
      .split("")
      .map(parseFloat)
  );

  //Generates a random number and sets selected to said number
  const generateNum = () => () => {
    let num = Math.floor(Math.random() * 6);
    /*
    Not a great way of preventing same anecdote to be shown twice in a row
    But it appears with a if statement the random number can still be
    the same as selected even after 2 generations.
    */
    while (num === selected) {
      num = Math.floor(Math.random() * 6);
    }
    setSelected(num);
  };

  const handleVote = () => () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const mostVotes = () => {
    return votes.indexOf(Math.max(...votes));
  };

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <Anecdote
          anecdote={props.anecdotes[selected]}
          votes={votes[selected]}
        />
      </div>
      <div>
        <Button text="Next anecdote" click={generateNum()} />
        <Button text="Vote" click={handleVote()} />
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <MostVoted
          anecdotes={props.anecdotes}
          votes={votes}
          handler={mostVotes()}
        />
      </div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
