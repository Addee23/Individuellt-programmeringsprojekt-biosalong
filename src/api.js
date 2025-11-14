const BASE_URL = "http://localhost:3001";

export async function getMovies() {
  const res = await fetch(`${BASE_URL}/movies`);
  return res.json();
}

export async function createBooking(booking) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return res.json();
}

export async function getBookings() {
  const res = await fetch(`${BASE_URL}/bookings`);
  return res.json();
}

export async function createMovie(movie) {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return res.json();
}

export async function updateMovie(id, movie) {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return res.json();
}

export async function deleteMovie(id) {
  await fetch(`${BASE_URL}/movies/${id}`, { method: "DELETE" });
}
