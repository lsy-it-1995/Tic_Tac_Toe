/*
credit: https://www.youtube.com/watch?v=trKjYdBASyQ
*/


let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let w;
let h;

let ai = 'X';
let human = 'O';
let currentPlayer = human;


function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  bestMove();
}

function draw() {
  background(255)
  strokeWeight(4);

  //horizontal
  line(0, h, width, h);
  line(0, 2 * h, width, 2 * h);

  //vertical line
  line(w, 0, w, height);
  line(2 * w, 0, 2 * w, height);

  for (let i = 0; i < 3; i++) { 
    for (let j = 0; j < 3; j++) {
      let current_x_position = w * j + w / 2;
      let current_y_position = h * i + h / 2;
      let spot = board[j][i]; //THIS IS REALLY IMPORTANT! Time Consuming. Be awared you go through row then col
      let radius = w / 4;
      textSize(32);
      if (spot == human) {
        noFill();
        ellipse(current_x_position, current_y_position, radius * 2);
      } else if (spot == ai) {
        drawingX(current_x_position, current_y_position, radius);
      }
    }
  }
  let result = checkBoard();
  
  if(result != null){
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if(result == 'tie'){
      resultP.html('tie');
    }else{
      resultP.html(`${result} win!`);
    }
  }
}

function mousePressed(){
  if(currentPlayer == human){
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if(board[i][j] == ' '){
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

function checkBoard(){
  let winner = null;
  
  for(let i = 0; i < 3; i++){
    if(equal(board[0][i],board[1][i],board[2][i])){//check Columes
      winner = board[0][i];
    }else if(equal(board[i][0], board[i][1], board[i][2])){//check Rows
      winner = board[i][0];
    }
  }
  
  //diagonals
  if(equal(board[0][0], board[1][1], board[2][2])){
    winner = board[0][0];
  }else  if(equal(board[2][0], board[1][1], board[0][2])){
    winner = board[2][0];
  }
  let openSpot = 0;
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(board[i][j] == ' '){
        openSpot++;
      }
    }
  }
  if(winner == null && openSpot == 0){
    return 'tie';
  }else{
    return winner;
  }
}

function equal(a, b, c){
  return a == b && b == c && a!=' ';
}

function drawingX(x, y, r) {
  line(x - r, y - r, x + r, y + r);
  line(x + r, y - r, x - r, y + r);
}
