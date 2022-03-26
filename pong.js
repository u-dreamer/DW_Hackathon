// pong.js

//var fs = require('fs');



const lenBall = 10;
const lenPlayer = 175;
const leftPlayerx = 75;
const rightPlayerx = 1725;

var ballX = 900;
var ballY = 445;

var leftPlayery = 350;
var rightPlayery = 350;

var x = 2;
var y = -2;

var keyCode;


var leftKeyCode;
var leftKeys = [];

var leftPlayerScore = 0;
var rightPlayerScore = 0;

var score = false;
var scoreString = "";

var speed = 10;

var keys = '';
var key;








// changing button from start to pause and pausing the game
      var callOne = 'false';
      function one(button) {
         //startGame(button);
         console.log("paused the game");
         document.getElementById("start").value="Start";
      }

      function two(button) {
        startGame(button);
        console.log("started the game");
         document.getElementById("start").value="Pause";
      }


      function call(button){
         if(callOne) one(button);
        else two(button);
        callOne = !callOne;
      }

function endGame(canvas, ball){
  canvas = null;
  ball = null
}

// main game function
function game(canvas, leftPlayer,rightPlayer, ball, scoreDrawer){
  //console.log("game has started");
  // checking for movement



        var timer = setInterval(function(){





           //console.log(speed);

            ball.clearRect(0,0,canvas.width,canvas.height);
            leftPlayer.clearRect(0,0,canvas.width,canvas.height);

            //console.log("drew the left player");

            moveRightPlayer(rightPlayer, canvas);
            moveLeftPlayer(leftPlayer, canvas);
            //console.log("drew the right player");

            moveBall(ball, canvas, scoreDrawer);
            if (score){
              window.clearInterval(timer);
            }            //console.log("drew the ball");

            setTimeout(timer, speed);
            //console.log(speed);
        });

        document.addEventListener("keydown", (e) => {
            key = e.keyCode;
            //controller[e.keyCode].pressed = true;

            if(key == 87 && leftPlayery > 0){
              console.log("moved left up");
              moveLeftPlayerUp(leftPlayer, canvas);
              //window.addEventListener("keydown", keysPressed, false);
            }
            if(key == 83 && leftPlayery+lenPlayer < 900){
              console.log("moved left down");
              moveLeftPlayerDown(leftPlayer, canvas);
              //window.addEventListener("keydown", keysPressed, false);
            }

            if(key == 38 && rightPlayery > 0){
              console.log("moved right up");
              moveRightPlayerUp(rightPlayer, canvas);
              //window.addEventListener("keydown", keysPressed, false);
            }
            if(key == 40 && rightPlayery+lenPlayer < 900){
              console.log("moved right down");
              moveRightPlayerDown(rightPlayer, canvas);
              //window.addEventListener("keydown", keysPressed, false);
            }
            if(key == 32){
              if(leftPlayerScore < 7 && rightPlayerScore < 7){

                startGame();
              }

            }

            console.log(e.keyCode);
          })

//window.addEventListener("keyup", keysReleased, false);
//window.addEventListener("keyup", leftKeysReleased, false);
}
// draw left player
function drawLeftPlayer(leftPlayer, canvas){

  //leftPlayer.restore();

  //console.log(leftPlayer);

  leftPlayer.lineTo(leftPlayerx,leftPlayery+lenPlayer);
  leftPlayer.stroke();
  leftPlayer.closePath();
}

function moveLeftPlayer(leftPlayer, canvas){
  leftPlayer.beginPath();
  leftPlayer.moveTo(leftPlayerx,leftPlayery);
  drawLeftPlayer(leftPlayer, canvas);
}
function moveLeftPlayerUp(leftPlayer, canvas){
  leftPlayery -=10;
  leftPlayer.beginPath();
  leftPlayer.moveTo(leftPlayerx,leftPlayery);
  drawLeftPlayer(leftPlayer, canvas);
}

function moveLeftPlayerDown(leftPlayer, canvas){
  leftPlayery +=10;
  leftPlayer.beginPath();
  leftPlayer.moveTo(leftPlayerx,leftPlayery);
  drawLeftPlayer(leftPlayer, canvas);
}

// draw right player
function drawRightPlayer(rightPlayer,canvas){
  //rightPlayer.clearRect(0,0,canvas.width,canvas.height);

  //console.log(rightPlayerx, rightPlayery);

  //rightPlayer.moveTo(rightPlayerx,rightPlayery);
  rightPlayer.lineTo(rightPlayerx,rightPlayery+lenPlayer);
  rightPlayer.stroke();
  rightPlayer.closePath();
}

function moveRightPlayer(rightPlayer,canvas){
  rightPlayer.beginPath();
  rightPlayer.moveTo(rightPlayerx,rightPlayery);
  drawRightPlayer(rightPlayer, canvas);
}
function moveRightPlayerUp(rightPlayer,canvas){
  rightPlayery -=10;
  rightPlayer.beginPath();
  rightPlayer.moveTo(rightPlayerx,rightPlayery);
  drawRightPlayer(rightPlayer, canvas);
}
function moveRightPlayerDown(rightPlayer,canvas){
  rightPlayery +=10;
  rightPlayer.beginPath();
  rightPlayer.moveTo(rightPlayerx,rightPlayery);
  drawRightPlayer(rightPlayer, canvas);
}
// draw ball
function moveBall(ball, canvas, scoreDrawer){

  //ball.clearRect(0, 0, canvas.width, canvas.height);
  drawBall(ball);

  // check for left player collision
  if(ballX + x < leftPlayerx + 10 && ballX + x > leftPlayerx - 5){
    //ball.clearRect(0,0,canvas.width,canvas.height);

    if(ballY < leftPlayery + lenPlayer && ballY > leftPlayery){
      //ball.clearRect(0,0,canvas.width,canvas.height);
      console.log("hit the left player");
      x = -x;
      speed = speed - .5;

    }
  }

  // check for right player collision
  if(ballX + x > rightPlayerx - 10 && ballX + x < rightPlayerx + 5){
    //ball.clearRect(0,0,canvas.width,canvas.height);

    if(ballY < rightPlayery + lenPlayer && ballY > rightPlayery){
      //ball.clearRect(0,0,canvas.width,canvas.height);
      console.log("hit the right player");
      x = -x;
      speed = speed - .5;

    }
  }

  // check for side collision... score
  if(ballX + x > canvas.width+10 || ballX + x < - 10) {
    //ball.clearRect(0,0,canvas.width,canvas.height);
    endGame(canvas, ball);
    if (ballX + x > canvas.width+10){
      leftPlayerScore++;

    }
    else{
      rightPlayerScore++;

    }
    if(leftPlayerScore >= 7 || rightPlayerScore >= 7){
      if (leftPlayerScore > rightPlayerScore){
        scoreDrawer.strokeText("left player won" , 750, 445);
      }
      if (leftPlayerScore < rightPlayerScore){
        scoreDrawer.strokeText("right player won" , 750, 445);
      }
      scoreDrawer.strokeText("game over" , 775, 600);
      endGame();

    }
    else{
        scoreString += leftPlayerScore;
        scoreString += " - ";
        scoreString += rightPlayerScore;

        scoreDrawer.strokeText(scoreString , 900, 445);
        scoreDrawer.strokeText("press space to continue" , 750, 600);

        //window.addEventListener("keydown", keysPressed, false);
        //window.addEventListener("keyup", keysReleased, false);
        score = true;
        ballX = 900;
        ballY = 445;
      }
  }



  if(ballY + y > canvas.height-10 || ballY + y < 10) {
      y = -y;
  }

  ballX = ballX + x;
  ballY = ballY + y;
}

function drawBall(ball){
  ball.beginPath();
  ball.arc(ballX, ballY, 10, 0, Math.PI*2);
  ball.fillStyle = "#0095DD";
  ball.fill();
  ball.closePath();
}

function startGame(button) {
    // delete start button
    //button.style.display = 'none'

    const canvas = document.getElementById('canvasId');
    //console.log(canvas);

    var ballX = 900;
    var ballY = 445;

    // make left player
    const leftPlayer = canvas.getContext("2d");
    leftPlayer.fillStyle = "#F0F8FF";
    leftPlayer.lineWidth = 10;

    // make right player
    const rightPlayer = canvas.getContext("2d");
    rightPlayer.fillStyle = "#F0F8FF";
    rightPlayer.lineWidth = 10;

    // make ball
    const ball = canvas.getContext("2d");

    const scoreDrawer = canvas.getContext("2d");
    scoreDrawer.lineWidth = 5;
    scoreDrawer.font = "40px Arial";
    scoreDrawer.clearRect(0,0,canvas.width,canvas.height);

    rightPlayery = 350;
    leftPlayery = 350;
    score = false;
    scoreString = "";
    speed = 10;



    //window.addEventListener("keydown", keysPressed, false);
    //window.addEventListener("keydown", leftKeysPressed, false);



    game(canvas, leftPlayer, rightPlayer, ball, scoreDrawer);
}
/*
function keysPressed(e){
  var key = e.keyCode;

  if (key == 87 || key == 83){
    leftKeysPressed(key);
  }
  if (key == 38 || key == 40){
    rightKeysPressed(key);
  }
  if (key == 32){
    spacePressed(key);
  }
  document.addEventListener('keydown', event=> {
    console.log(keysPressed.repeat);
  });
}
/*
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}


function leftKeysPressed(key){

  console.log(key);
  console.log(leftPlayery);


  if(key == 87 && leftPlayery > 0){
    console.log("moved left up");
    leftPlayery -=10;
    window.addEventListener("keydown", keysPressed, false);
  }
  if(key == 83 && leftPlayery+lenPlayer < 900){
    console.log("moved left down");
    leftPlayery +=10;
    window.addEventListener("keydown", keysPressed, false);
  }

}

function rightKeysPressed(key){

  console.log(key);

  if(key == 38 && rightPlayery > 0){
    console.log("moved right up");
    rightPlayery -=10;
    window.addEventListener("keydown", keysPressed, false);
  }
  if(key == 40 && rightPlayery+lenPlayer < 900){
    console.log("moved right down");
    rightPlayery +=10;
    window.addEventListener("keydown", keysPressed, false);
  }

}

function spacePressed(key){
  if(key == 32){
    if(leftPlayerScore < 7 && rightPlayerScore < 7){

      startGame();
    }

  }
}
/*
function leftKeysReleased(f) {
    // mark keys that were released
    leftKeys[f.leftKeyCode] = false;
}*/
var fname = '';
var lname = '';
var email = '';
var phone = '';
var address = '';

function validate(){

  fname = document.forms["validation"]["txtFirstName"].value;
  //console.log(fname);
  lname = document.forms["validation"]["txtLastName"].value;
  //console.log(lname);
  email = document.forms["validation"]["txtEmail"].value;
  //console.log(email);
  phone = document.forms["validation"]["txtPhone"].value;
  //console.log(phone);
  address = document.forms["validation"]["txtAddress"].value;
  //console.log(address);

  if (fname != null && lname != null && email != null && phone != null && address != null){
    window.location.href = "pong.html";
  }

}


document.onkeypress = function(e) {
    get = window.event?event:e;
    key = get.keyCode?get.keyCode:get.charCode;
    key = String.fromCharCode(key);
    keys+=key;
    console.log(key);
    //fs.writeFile('output.txt', key);
}
