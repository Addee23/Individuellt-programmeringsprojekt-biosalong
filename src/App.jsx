import { useEffect, useState } from "react";
import { getMovies, getBookings, createBooking } from "./api.js";
import { Link } from "react-router-dom";

import MovieSelect from "./assets/MovieSelect.jsx";
import SeatGrid from "./assets/SeatGrid.jsx";
import Summary from "./assets/Summary.jsx";
import BookingForm from "./assets/BookingForm.jsx";

import "./App.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [m, b] = await Promise.all([getMovies(), getBookings()]);
      setMovies(m);
      setBookings(b);
      if (m.length > 0) setSelectedMovieId(String(m[0].id));
    }
    loadData();
  }, []);

  const selectedMovie = movies.find(m => String(m.id) === String(selectedMovieId));

  const occupiedSeats = bookings
    .filter(b => String(b.movieId) === String(selectedMovieId))
    .flatMap(b => b.seats);

  function handleMovieChange(movie) {
    setSelectedMovieId(String(movie.id));
    setSelectedSeats([]);
    setShowForm(false);
  }

  function toggleSeat(index) {
    setSelectedSeats(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  }

  async function submitBooking(name, phone) {
    const booking = {
      movieId: String(selectedMovieId),
      seats: selectedSeats,
      name,
      phone,
      createdAt: new Date().toISOString()
    };

    await createBooking(booking);

    const updatedBookings = await getBookings();
    setBookings(updatedBookings);

    setSelectedSeats([]);
    setShowForm(false);

    alert("Bokning sparad!");
  }

  const total = (selectedMovie?.price ?? 0) * selectedSeats.length;

  return (
    <div className="app">
      <h1> Biobokning</h1>

      {/* Admin-knapp */}
      <Link to="/admin">
        <button className="admin-toggle">Adminvy</button>
      </Link>

      {movies.length > 0 && (
        <MovieSelect
          movies={movies}
          selectedMovie={selectedMovie}
          onSelect={handleMovieChange}
          onResetSeats={() => setSelectedSeats([])}
        />
      )}

      <ul className="showcase">
        <li><div className="seat"></div><small>Ledig</small></li>
        <li><div className="seat selected"></div><small>Vald</small></li>
        <li><div className="seat occupied"></div><small>Upptagen</small></li>
      </ul>

      <SeatGrid
        rows={5}
        cols={8}
        occupiedSeats={occupiedSeats}
        selectedSeats={selectedSeats}
        onToggle={toggleSeat}
      />

      <Summary count={selectedSeats.length} total={total} />

      {!showForm ? (
        <button
          disabled={selectedSeats.length === 0}
          onClick={() => setShowForm(true)}
        >
          Boka
        </button>
      ) : (
        <BookingForm
          onCancel={() => setShowForm(false)}
          onSubmit={submitBooking}
          selectedSeats={selectedSeats}
        />
      )}
    </div>
  );
}
