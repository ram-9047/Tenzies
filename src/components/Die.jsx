export default function Die({ value, isHeld, hold, id }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return (
    <button style={styles} onClick={() => hold(id)}>
      {value}
    </button>
  );
}
