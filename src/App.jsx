import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [diceValue, setDiceValue] = useState(generateNewDices());

  function handleRollDice() {
    setDiceValue((oldDice) =>
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
          Roll
        </button>
      </main>
    </>
  );
}

export default App;
