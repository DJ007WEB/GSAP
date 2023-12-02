export default function Stats({ items }) {
  // console.log(items);
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );

  const numPacked = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((numPacked / items.length) * 100);
  return (
    <footer className="stats">
      {packedPercentage !== 100 ? (
        <em>
          You have {items.length} items on your list and You have packed{" "}
          {numPacked} items ({packedPercentage}%).
        </em>
      ) : (
        <em>You got everything! Ready to go ✈️</em>
      )}
    </footer>
  );
}
