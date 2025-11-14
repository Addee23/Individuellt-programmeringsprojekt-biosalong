import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getBookings,
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from "../api.js";

export default function AdminView() {
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [movieForm, setMovieForm] = useState({ id: "", name: "", price: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [b, m] = await Promise.all([getBookings(), getMovies()]);
    setBookings(b);
    setMovies(m);
  }

  function resetForm() {
    setMovieForm({ id: "", name: "", price: "" });
    setEditing(false);
  }

  function startEdit(movie) {
    setEditing(true);
    setMovieForm({ id: movie.id, name: movie.name, price: movie.price });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { id, name, price } = movieForm;

    if (!name.trim() || !price) return;

    if (editing) {
      await updateMovie(id, { name, price: Number(price) });
    } else {
      await createMovie({
        id: Date.now().toString(),
        name,
        price: Number(price)
      });
    }

    resetForm();
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Ta bort filmen?")) return;
    await deleteMovie(id);
    loadData();
  }

  return (
    <div className="admin-dashboard">
      <h1>Adminpanel</h1>

<Link to="/" style={{ textDecoration: "none" }}>
  <button className="admin-toggle">⬅ Tillbaka</button>
</Link>

      <div className="admin-sections">

        <div className="admin-box">
          <h2>Filmer</h2>

          <form onSubmit={handleSubmit} className="admin-form">
            <input
              placeholder="Filmtitel"
              value={movieForm.name}
              onChange={(e) =>
                setMovieForm({ ...movieForm, name: e.target.value })
              }
            />
            <input
              placeholder="Pris"
              type="number"
              value={movieForm.price}
              onChange={(e) =>
                setMovieForm({ ...movieForm, price: e.target.value })
              }
            />

            <button type="submit">
              {editing ? "Spara ändring" : "Lägg till film"}
            </button>
            {editing && (
              <button onClick={resetForm} type="button">
                Avbryt
              </button>
            )}
          </form>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Namn</th>
                <th>Pris</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.price} kr</td>
                  <td>
                    <button onClick={() => startEdit(m)}>✏️</button>
                    <button onClick={() => handleDelete(m.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-box">
          <h2> Bokningar</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Film</th>
                <th>Platser</th>
                <th>Namn</th>
                <th>Telefon</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const movie = movies.find((m) => m.id === b.movieId);
                return (
                  <tr key={b.id}>
                    <td>{movie?.name ?? "N/A"}</td>
                    <td>{b.seats.join(", ")}</td>
                    <td>{b.name}</td>
                    <td>{b.phone}</td>
                    <td>{new Date(b.createdAt).toLocaleString("sv-SE")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
