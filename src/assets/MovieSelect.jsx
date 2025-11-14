export default function MovieSelect({ movies, selectedMovie, onSelect, onResetSeats }) {
  function handleChange(e) {
    const id = e.target.value; // 
    const movie = movies.find((m) => String(m.id) === String(id));
    onSelect(movie);
    onResetSeats();
  }

  return (
    <div className="movie-container">
      <label htmlFor="movie">Välj film:</label>
      <select
        id="movie"
        value={String(selectedMovie?.id ?? "")} 
        onChange={handleChange}
      >
        {movies.map((m) => (
          <option key={m.id} value={String(m.id)}>
            {m.name} ({m.price} kr)
          </option>
        ))}
      </select>
    </div>
  );
}
