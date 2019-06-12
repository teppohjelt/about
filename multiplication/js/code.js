var assignment = 0;
var multiplier = 0;
var multiplicant = 0;
var result = 0;
var multiplierFactor = 1;
var multiplicantFactor = 1;
var timeFactor = 1;
var score = 0;
var scoreTotal = 0;
var time = 10;
var timer = setInterval(function() {
  showTime();
}, 1000); // time reduction by 1 sec

// initializations
$(document).ready(function() {
  if (Modernizr.touch) {
    // Disable keyboard by adding readonly attribute to field
    $('[data-disable-touch-keyboard]').attr('readonly', 'readonly');
  }
});
$("#help-section").addClass("invisible");
$("#result-section").addClass("invisible");
clearInterval(timer);

// EVENTLISTENERS start ------------------------------------
$("#back-home").click(function() {
  window.location="../index.html";
});

$("#button-play").click(function() {
  resetAll();
  $("#help-section").addClass("invisible");
  $("#result-section").addClass("invisible");
  $("#assignment-section").removeClass("invisible"); // set visible
});

$("#button-help").click(function() {
  $("#assignment-section").addClass("invisible");
  $("#result-section").addClass("invisible");
  $("#help-section").removeClass("invisible"); // set visible
});

$("#start").click(showNewAssignment);

$("#ok").click(countScore);

$("#del").click(backSpace);

$(".number-button").click(function() {
  $("#result").val($("#result").val() + this.value);
});

$(document).keypress(function(e) { // result can be accepted by pressing enter (keycode 13)
  if (e.keyCode == 13) {
    countScore();
  }
});

// EVENTLISTENERS end --------------------------------------
// FUNCTIONS start --------------------------------------

function showNewAssignment() {
  if (assignment > 10) {
    end();
  } else {
    clearInterval(timer); // nollataan ajastin
    time = 10; // palautetaan sekunnit kymppiin
    timer = setInterval(function() {
      showTime();
    }, 1000); // aloitetaan ajastus uusiksi
    // document.getElementById('aloita').disabled = true;
    $("#ok").prop("disabled", false);
    $("#start").addClass("invisible");
    $("#result").val("");
    $("#result").focus();
    assignment++;
    multiplier = Math.floor((Math.random() * 10) + 1); // arvotaan luku väliltä 1 - 10
    multiplicant = Math.floor((Math.random() * 10) + 1); // arvotaan luku väliltä 1 - 10
    $("#assignment").text(assignment);
    $("#multiplier").text(multiplier);
    $("#multiplicant").text(multiplicant);
  }
}

function showTime() {
  if (time > 0) { // it there is time left, reduce by 1 sec
    $("#time").text(time);
    time--;
  } else if (assignment <= 10) { // jos aika loppu ja tehtäviä jäljellä, näytetään seuraava tehtävä
    countScore(); // jos aika loppu, näytetään uusi lasku
  } else {
    end();
  }
}

function countScore() {
  result = parseInt($("#result").val()); // tulos-laatikon luku
  if (result == multiplier * multiplicant) { // lasku meni oikein
    switch (multiplier) { // kertoimet lukujen vaikeuden mukaan (tätä voisi lyhentää)
      case 10:
      case 1:
        multiplierFactor = 1.1;
        break;
      case 5:
        multiplierFactor = 1.2;
        break;
      case 2:
        multiplierFactor = 1.3;
        break;
      case 3:
      case 4:
      case 9:
        multiplierFactor = 1.4;
        break;
      case 6:
      case 7:
        multiplierFactor = 1.5;
        break;
      case 8:
        multiplierFactor = 1.6;
        break;
    }
    switch (multiplicant) {
      case 10:
      case 1:
        multiplicantFactor = 1.1;
        break;
      case 5:
        multiplicantFactor = 1.2;
        break;
      case 2:
        multiplicantFactor = 1.3;
        break;
      case 3:
      case 4:
      case 9:
        multiplicantFactor = 1.4;
        break;
      case 6:
      case 7:
        multiplicantFactor = 1.5;
        break;
      case 8:
        kerroin2 = 1.6;
        break;
    }
    timeFactor = time * 0.5;
    score = multiplierFactor * multiplicantFactor * timeFactor * 10;
    score = Math.round(score); // pyöristetään
    //console.log("score: " + score + "; scoreTotal: " + scoreTotal);
  } else {
    score = 0; // lasku meni väärin
    addToSummary();
  }
  scoreTotal = scoreTotal + score;

  if (assignment < 10) {
    showNewAssignment();
  } else {
    end();
  }
}

function addToSummary() {
  var summaryText = multiplier + ' x ' + multiplicant + ' = ' + multiplier * multiplicant + ', vastasit ' + result;
  $("#summary").append("<p>" + summaryText + "</p>");
}

function resetAll() {
  assignment = 0;
  multiplier = 0;
  multiplicant = 0;
  result = 0;
  score = 0;
  scoreTotal = 0;
  time = 10;
  $("#start").removeClass("invisible"); // set visible
  clearInterval(timer);
  $("#assignment").text(assignment);
  $("#multiplier").text(multiplier);
  $("#multiplicant").text(multiplicant);
  $("#time").text(time);
  $("#result").val("");
  $("#summary").text("");
}

function end() {
  clearInterval(timer);
  $("#result-section").removeClass("invisible");
  $("#assignment-section").addClass("invisible");
  $("#help-section").addClass("invisible");
  $("#score-total").text(scoreTotal);
  var levelText = "";
  switch (true) {
    case (scoreTotal >= 700):
      levelText = "You're the boss!";
      break;
    case (scoreTotal >= 600):
      levelText = "Excellent!";
      break;
    case (scoreTotal >= 500):
      levelText = "Good!";
      break;
    default:
      levelText = "Getting there, practice more :)";
  }
  $("#level").text(levelText);
  if ($("#summary").text() == "") {
    $("#summary").text("Kaikki oikein, ei huteja!");
  }
}

function backSpace() { // bt used
  if ($("#result").val().length > 1) {
    $("#result").val(Math.floor($("#result").val() / 10));
  } else {
    $("#result").val("");
  }
}
