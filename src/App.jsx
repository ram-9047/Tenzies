import { useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [diceValue, setDiceValue] = useState(generateNewDices());

  function handleRollDice() {
    setDiceValue(generateNewDices());
  }

  function generateNewDices() {
    let diceValue = new Array(10)
      .fill(0)
      .map(() => Math.ceil(Math.random() * 6));
    return diceValue;
  }

  return (
    <>
      <main>
        <div className="dice-container">
          {diceValue.map((i) => {
            return <Die value={i} />;
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
