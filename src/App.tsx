import { useState } from 'react';
import './App.css';
import Block from './Components/Block';

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner , setWinner] = useState(null);
  const [resetButtonVisible, setResetButtonVisible] = useState(false);

  const handleClick = (index : number) => {
    if(state[index] || winner) return;
    
    const stateCopy = [...state];
    stateCopy[index] = currentTurn;
    setState(stateCopy);

    setCurrentTurn(currentTurn === "X" ? "O" : "X");
    /*
    In React, setState doesn't immediately update the state; it's enqueued and processed asynchronously. 
    Therefore, when you call setState, 
    React doesn't guarantee that the state has been updated immediately after the function call.
    To address this issue, passing stateCopy to checkWinner is indeed a valid approach. 
    This ensures that checkWinner receives the most up-to-date state of the game board.
    */
    checkWinner(stateCopy);

    setResetButtonVisible(true);
  };

  const checkWinner = (state: any[]) => {
    const winnerLines: number[][] = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let currentWinner = null;

    for (let i = 0; i < winnerLines.length; i++) {
      const [a,b,c] = winnerLines[i];
      
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        currentWinner = state[a];
      }
    }

    setWinner(currentWinner);
  }

  const resetGame = () => {
    setState(Array(9).fill(null));
    setCurrentTurn("X");
    setWinner(null);
    setResetButtonVisible(false);
  }

  return (
    <div className="App">
      <div className="Board">
        <div className="row">
          <Block onClick={() => handleClick(0)} value={state[0]}/>
          <Block onClick={() => handleClick(1)} value={state[1]}/>
          <Block onClick={() => handleClick(2)} value={state[2]}/>
        </div>

        <div className="row">
          <Block onClick={() => handleClick(3)} value={state[3]}/>
          <Block onClick={() => handleClick(4)} value={state[4]}/>
          <Block onClick={() => handleClick(5)} value={state[5]}/> 
        </div>

        <div className="row">
          <Block onClick={() => handleClick(6)} value={state[6]}/>
          <Block onClick={() => handleClick(7)} value={state[7]}/>
          <Block onClick={() => handleClick(8)} value={state[8]}/>
        </div>
      </div>

      <button  className="reset" hidden={!resetButtonVisible} onClick ={() => resetGame()}> Reset </button>
      <h3 className='winner' hidden={winner === null}> Winner : {winner}</h3>
    </div>
  );
}

export default App;
