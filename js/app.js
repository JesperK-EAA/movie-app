"use strict";

const movieList = document.getElementById("movie-list");
const genreSelecter = document.getElementById("genre-select");
const movieCount = document.querySelector("#movie-count");

const movieAPI =
  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json";
let allMovies = [];

getMovieData();

/* Fething the movies data */
async function getMovieData() {
  const res = await fetch(movieAPI);
  allMovies = await res.json();

  populateGenreSelect();
  await showMovies(allMovies);

  genreSelecter.addEventListener("change", applyGenreFilter);
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
function applyGenreFilter() {
  const selectedGenre = genreSelecter.value;

  if (selectedGenre === "all") {
    showMovies(allMovies);
    return;
  }

  const filteredMovies = allMovies.filter((movie) => {
    return movie.genre.includes(selectedGenre);
  });

  showMovies(filteredMovies);
}

/* Listen after loop to generate all cards in a list*/
function showMovies(movies) {
  movieList.innerHTML = "";

  for (const movie of movies) {
    showMovie(movie);
  }

  movieCount.textContent = `Viser ${movies.length} film`;
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
