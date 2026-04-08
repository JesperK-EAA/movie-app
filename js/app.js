"use strict";

/* Variables of related elements and counter */
const textCounter = document.getElementById("counter");
const upBtn = document.getElementById("up-button");
const downBtn = document.getElementById("down-button");
const resetBtn = document.getElementById("reset-button");

let counter = 0;

/* Runs everytime the number changes */
function changeCountNumber() {

  /* Color changes after*/
  if (counter == 3) {
    textCounter.style.color = "#eeff00";
  } else if (counter == 6) {
    textCounter.style.color = "#a4ff08";
  } else if (counter == 10) {
    console.log("Max nummer var nået (kan stadig fortsætte)");
    textCounter.style.color = "#27ffb7";
  } 
 
  /* Rest color and below 0 */
  if (counter == 0) {
      textCounter.style.removeProperty("color");
  } else if (counter < 0) {
    textCounter.style.color = "#000";
  } 

  /* Count up */
  textCounter.innerHTML = counter;
}

upBtn.addEventListener("click", () => {
  counter++;
  changeCountNumber();
});

downBtn.addEventListener("click", () => {
  counter--;
  changeCountNumber();
});

resetBtn.addEventListener("click", () => {
  textCounter.style.removeProperty("color");
  counter = 0;
  changeCountNumber();
});
