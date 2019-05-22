
// section and nav variables
var assignmentSection = document.querySelector("#assignment-section");
var helpSection = document.querySelector("#help-section");
var resultSection = document.querySelector("#result-section");
var playButton = document.querySelector("#button-play");
var helpButton = document.querySelector("#button-help");

// number button variables
var num1 = document.querySelector("#num1");
var num2 = document.querySelector("#num2");
var num3 = document.querySelector("#num3");
var num4 = document.querySelector("#num4");
var num5 = document.querySelector("#num5");
var num6 = document.querySelector("#num6");
var num7 = document.querySelector("#num7");
var num8 = document.querySelector("#num8");
var num9 = document.querySelector("#num9");
var num0 = document.querySelector("#num0");

// initializations
assignmentSection.classList.add("invisible");
resultSection.classList.add("invisible");


// event listeners
playButton.addEventListener("click", showGame);
helpButton.addEventListener("click", showHelp);

function showGame() {
  helpSection.classList.add("invisible");
  resultSection.classList.add("invisible");
  assignmentSection.classList.remove("invisible");
}

function showHelp() {
  assignmentSection.classList.add("invisible");
  resultSection.classList.add("invisible");
  helpSection.classList.remove("invisible"); // set invisible
}

function addNumber(element){
  document.querySelector("#product").value = document.querySelector("#product").value + element.value;
}
