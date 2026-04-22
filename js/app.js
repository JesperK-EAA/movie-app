"use strict";

const movieList = document.getElementById("movie-list");
const genreSelecter = document.getElementById("genre-select");
const movieCount = document.querySelector("#movie-count");

const movieAPI =
  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json";
let allMovies = [];

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  document
    .querySelector("#search-input")
    .addEventListener("input", applyFiltersAndSort);
  document
    .querySelector("#genre-select")
    .addEventListener("change", applyFiltersAndSort);
  document
    .querySelector("#sort-select")
    .addEventListener("change", applyFiltersAndSort);

  getMovieData();
}

/* Fething the movies data */
async function getMovieData() {
  const res = await fetch(movieAPI);
  allMovies = await res.json();

  populateGenreSelect();
  applyFiltersAndSort();
}

/* Create options of the movies genre and insert them */
function populateGenreSelect() {
  const genres = new Set();
  let genreCount = {};

  for (const movie of allMovies) {
    for (const genre of movie.genre) {
      genres.add(genre);
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    }
  }

  const sortedGenres = [...genres].sort((a, b) => a.localeCompare(b));

  for (const genre of sortedGenres) {
    genreSelecter.insertAdjacentHTML(
      "beforeend",
      `<option value="${genre}">${genre} (${genreCount[genre]})</option>`,
    );
  }
}

/* Finds movie data out from the genre */
function applyFiltersAndSort() {
  const searchTerm = document
    .querySelector("#search-input")
    .value.trim()
    .toLowerCase();
  const selectedGenre = document.querySelector("#genre-select").value;
  const sortOption = document.querySelector("#sort-select").value;

  let filteredMovies = allMovies.filter(function (movie) {
    const matchesTitle = movie.title.toLowerCase().includes(searchTerm);
    const matchesGenre =
      selectedGenre === "all" || movie.genre.includes(selectedGenre);
    return matchesTitle && matchesGenre;
  });

  if (sortOption === "title") {
    filteredMovies.sort((movieA, movieB) =>
      movieA.title.localeCompare(movieB.title),
    );
  } else if (sortOption === "year") {
    filteredMovies.sort((movieA, movieB) => movieB.year - movieA.year);
  } else if (sortOption === "rating") {
    filteredMovies.sort((movieA, movieB) => movieB.rating - movieA.rating);
  }

  showMovies(filteredMovies);
}

/* Listen after loop to generate all cards in a list*/
function showMovies(movies) {
  const movieList = document.querySelector("#movie-list");
  const movieCount = document.querySelector("#movie-count");

  movieList.innerHTML = "";
  movieCount.textContent = `Viser ${movies.length} ud af ${allMovies.length} film`;

  if (movies.length === 0) {
    movieList.innerHTML =
      '<p class="empty">Ingen film matcher din søgning eller genre.</p>';
    return;
  }

  for (const movie of movies) {
    showMovie(movie);
  }
}

/* Makes the movie cards */
function showMovie(movie) {
  const movieList = document.querySelector("#movie-list");

  const movieCard = `
    <article class="movie-card" tabindex="0">
      <img src="${movie.image}" alt="Poster af ${movie.title}" class="movie-poster" />
      <div class="movie-info">
        <div class="title-row">
          <h2>${movie.title}</h2>
          <span class="year-badge">(${movie.year})</span>
        </div>
        <p class="genre">${movie.genre.join(", ")}</p>
        <p class="movie-rating">⭐ ${movie.rating}</p>
        <p class="director-line"><strong>Instruktør:</strong> ${movie.director}</p>
      </div>
    </article>
  `;

  movieList.insertAdjacentHTML("beforeend", movieCard);

  const newCard = movieList.lastElementChild;
  newCard.addEventListener("click", function () {
    showMovieDialog(movie);
  });
}
