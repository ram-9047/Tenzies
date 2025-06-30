import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [diceValue, setDiceValue] = useState(generateNewDices());

  function handleRollDice() {
    setDiceValue(generateNewDices());
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

  return (
    <>
      <main>
        <div className="dice-container">
          {diceValue.map((dieObj) => {
            return <Die value={dieObj.value} key={dieObj.id} />;
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
