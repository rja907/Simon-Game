InputOrder = [];
simonSeq = [];
const NUM_OF_LEVELS = 20;
var id,
  color,
  level = 0;
var strict = false;
var error = false;
var gameOn = true;
var boardSound = [
  'http://www.soundjay.com/button/sounds/beep-21.mp3',
  'http://www.soundjay.com/button/sounds/beep-22.mp3',
  'http://www.soundjay.com/button/sounds/beep-23.mp3',
  'http://www.soundjay.com/button/sounds/beep-28.mp3'
];
$(document).ready(function() {
  $('.orderCount').text('0');
  $('.start').click(function() {
    strict = false;
    error = false;
    level = 0;
    level++;
    simonSeq = [];
    InputOrder = [];
    localOrder();
  });
  $('.colorButton').click(function() {
    id = $(this).attr('id');
    color = $(this)
      .attr('class')
      .split(' ')[1];
    input();
  });
  $('.strict').click(function() {
    level = 0;
    level++;
    simonSeq = [];
    InputOrder = [];
    strict = true;
    localOrder();
  });
});
function input() {
  InputOrder.push(id);
  console.log(id + ' ' + color);
  addClassSound(id, color);
  if (!checkInputOrder()) {
    if (strict) {
      console.log('strict');
      simonSeq = [];
      level = 1;
    }
    error = true;
    orderCountError();
    InputOrder = [];
    localOrder();
  } else if (
    InputOrder.length == simonSeq.length &&
    InputOrder.length < NUM_OF_LEVELS
  ) {
    level++;
    InputOrder = [];
    error = false;
    console.log('start simon');
    localOrder();
  }
  if (InputOrder.length == NUM_OF_LEVELS) {
    orderCountWinner();
    resetGame();
  }
}
function localOrder() {
  console.log('level ' + level);
  $('.orderCount').text(level);
  if (!error) {
    getRandomNum();
  }
  if (error && strict) {
    getRandomNum();
  }
  var i = 0;
  var myInterval = setInterval(function() {
    id = simonSeq[i];
    color = $('#' + id).attr('class');
    color = color.split(' ')[1];
    console.log(id + ' ' + color);
    addClassSound(id, color);
    i++;
    if (i == simonSeq.length) {
      clearInterval(myInterval);
    }
  }, 1000);
}
function getRandomNum() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random);
}
function addClassSound(id, color) {
  $('#' + id).addClass(color + '-active');
  playSound(id);
  setTimeout(function() {
    $('#' + id).removeClass(color + '-active');
  }, 500);
}
function checkInputOrder() {
  for (var i = 0; i < InputOrder.length; i++) {
    if (InputOrder[i] != simonSeq[i]) {
      return false;
    }
  }
  return true;
}
function orderCountError() {
  console.log('error');
  var counter = 0;
  var myError = setInterval(function() {
    $('.orderCount').text('Error!');
    counter++;
    if (counter == 3) {
      $('.orderCount').text(level);
      clearInterval(myError);
      InputOrder = [];
      counter = 0;
    }
  }, 500);
}
function orderCountWinner() {
  var count = 0;
  var winInterval = setInterval(function() {
    count++;
    $('.orderCount').text('Win!');
    if (count == 5) {
      clearInterval(winInterval);
      $('.orderCount').text('00');
      count = 0;
    }
  }, 500);
}
function playSound(id) {
  var sound = new Audio(boardSound[id]);
  sound.play();
}
function resetGame() {
  InputOrder = [];
  simonSeq = [];
  level = 0;
  $('.orderCount').text('00');
}
