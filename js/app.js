"use strict";

const movieList = document.getElementById("movie-list");
const genreSelect = document.querySelector("#genre-select");
const searchInput = document.querySelector("#search-input");

const movieAPI =
  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json";
let allMovies = [];

getMovieData();

/* Fething the movies data */
async function getMovieData() {
  const res = await fetch(movieAPI);
  allMovies = await res.json();

  populateGenreSelect();
  applyFilters();

  genreSelect.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);
}

/* Create options of the movies genre and insert them */
function populateGenreSelect() {
  const genres = new Set();

  for (const movie of allMovies) {
    for (const genre of movie.genre) {
      genres.add(genre);
    }
  }

  const sortedGenres = [...genres].sort((a, b) => a.localeCompare(b));

  for (const genre of sortedGenres) {
    genreSelect.insertAdjacentHTML(
      "beforeend",
      `<option value="${genre}">${genre}</option>`,
    );
  }
}

/* Finds movie data out from the genre */
function applyFilters() {
  const selectedGenre = genreSelect.value;
  const searchValue = searchInput.value.trim().toLowerCase();

  const filteredMovies = allMovies.filter(function (movie) {
    const matchesGenre =
      selectedGenre === "all" || movie.genre.includes(selectedGenre);
    const matchesSearch = movie.title.toLowerCase().includes(searchValue);

    return matchesGenre && matchesSearch;
  });

  showMovies(filteredMovies);
}

/* Listen after loop to generate all cards in a list*/
function showMovies(movies) {
  movieList.innerHTML = "";

  for (const movie of movies) {
    showMovie(movie);
  }
}

/* Makes the movie cards */
function showMovie(movie) {
  //console.log(movie);

  const highlightClass = movie.rating >= 8.5 ? "movie-card--highlight" : "";

  const movieEle = `
    <article class="movie-card ${highlightClass}">
      <img class="movie-image" src="${movie.image}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>År: ${movie.year}</p>
        <p>Rating: ${movie.rating}</p>
      </div>
    </article>
    `;

  movieList.insertAdjacentHTML("beforeend", movieEle);
}
