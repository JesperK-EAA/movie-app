"use strict";

const movies = [
  {
    title: "Inception",
    year: 2010,
    rating: 8.8,
  },
  {
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
  },
  {
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
  },
  {
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
  },
];

const movieList = document.getElementById("movie-list")

movies.forEach(movie => {
    const movieEle = `
    <article class="movie-card">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
        <p>${movie.rating}</p>
      </div>
    </article>
    `


    movieList.insertAdjacentHTML("beforeend", movieEle);

});