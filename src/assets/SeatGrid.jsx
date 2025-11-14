export default function SeatGrid({ rows, cols, occupiedSeats, selectedSeats, onToggle }) {
  const grid = [];

  for (let r = 0; r < rows; r++) {
    const seats = [];
    for (let c = 0; c < cols; c++) {
      const index = r * cols + c;
      const isOccupied = occupiedSeats.includes(index);
      const isSelected = selectedSeats.includes(index);
      const className = isOccupied
        ? "seat occupied"
        : isSelected
        ? "seat selected"
        : "seat";

      seats.push(
        <div
          key={index}
          className={className}
          onClick={() => !isOccupied && onToggle(index)}
        ></div>
      );
    }
    grid.push(
      <div key={r} className="row">
        {seats}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="screen"></div>
      {grid}
    </div>
  );
}
