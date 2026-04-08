"use strict";

const movieList = document.getElementById("movie-list");
let movies = [];

getMovieData();

/* Fething the movie data */
async function getMovieData() {
  console.log("Henter film data...");

  const res = await fetch("./data/movies.json");
  movies = await res.json();

  await showMovies();
}

function showMovies() {
  movies.forEach((movie) => {
    showMovie(movie);
  });
}

function showMovie(movie) {
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

ShowMovies();
