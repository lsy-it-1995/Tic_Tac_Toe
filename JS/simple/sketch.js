/*
credit: https://www.youtube.com/watch?v=GTWrWM1UsnA
*/


let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let players = ['O', 'X'];

let currentPlayer;
let available = [];

function setup() {
  createCanvas(400, 400);
  let i = frameRate(10);
  currentPlayer = floor(random(players.length));
  for(let i = 0; i < 3; i ++){
    for(let j = 0; j < 3; j++){
      available.push([i,j]);
    }
  }
}

function nextMove(){
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  console.log(spot);
  let i = spot[0];
  let j = spot[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}

function draw() {
  background(255)
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);

  //horizontal
  line(0, h, width, h);
  line(0, 2 * h, width, 2 * h);

  //vertical line
  line(w, 0, w, height);
  line(2 * w, 0, 2 * w, height);

  for (let i = 0; i < 3; i++) { //go throught rows
    for (let j = 0; j < 3; j++) { //go throught cols 
      let current_x_position = w * j + w / 2;
      let current_y_position = h * i + h / 2;
      let spot = board[i][j];
      let radius = w / 4;
      textSize(32);
      if (spot == players[0]) {
        noFill();
        ellipse(current_x_position, current_y_position, radius * 2);
      } else if (spot == players[1]) {
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
  }else{
    nextMove();
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
  
  if(winner == null && available.length == 0){
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