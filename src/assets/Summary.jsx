export default function Summary({ count, total }) {
  return (
    <div className="summary">
      <p>{count} seats selected</p>
      <p>Total: {total} kr</p>
    </div>
  );
}
