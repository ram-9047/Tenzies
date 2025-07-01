import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [diceValue, setDiceValue] = useState(() => generateNewDices());

  let gameWon = false;
  if (gameStatus()) {
    gameWon = true;
  }

  function gameStatus() {
    return (
      diceValue.every((die) => die.isHeld) &&
      diceValue.every((die) => die.value === diceValue[0].value)
    );
  }

  function restartGame() {
    setDiceValue(generateNewDices());
  }

  function handleRollDice() {
    gameWon
      ? restartGame()
      : setDiceValue((oldDice) =>
          oldDice.map((die) =>
            die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
          )
        );
  }

  function generateNewDices() {
    let diceValue = new Array(10).fill(0).map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });
    return diceValue;
  }

  function hold(id) {
    let updatedDiceValue = diceValue.map((dieObj) => {
      if (dieObj.id == id) {
        dieObj.isHeld = !dieObj.isHeld;
      }
      return dieObj;
    });

    setDiceValue(updatedDiceValue);
  }

  return (
    <>
      <main>
        {gameWon ? (
          <ReactConfetti
            drawShape={(ctx) => {
              ctx.beginPath();
              for (let i = 0; i < 22; i++) {
                const angle = 0.35 * i;
                const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                ctx.lineTo(x, y);
              }
              ctx.stroke();
              ctx.closePath();
            }}
          />
        ) : null}
        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <h1>Tenxies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">
          {diceValue.map((dieObj) => {
            return (
              <Die
                value={dieObj.value}
                key={dieObj.id}
                isHeld={dieObj.isHeld}
                hold={hold}
                id={dieObj.id}
              />
            );
          })}
        </div>

        <button className="roll-dice" onClick={handleRollDice}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}

export default App;
