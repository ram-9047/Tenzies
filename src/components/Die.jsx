export default function Die({ value, isHeld, hold, id }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return (
    <button
      style={styles}
      onClick={() => hold(id)}
      aria-pressed={value}
      aria-label={`Die with a value of ${value} and is ${
        isHeld ? "held" : "not held"
      }`}
    >
      {value}
    </button>
  );
}
