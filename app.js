//game
var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableCircle = document.querySelectorAll('.circle');
const message = document.querySelector('.message');
const reset = document.querySelector('.reset');

//audio
const music = document.querySelector('.music');
var drop = new Audio('/media/drop.mp3');
var bgm = new Audio('/media/bgm.mp3');
const playBGM = document.querySelector('#playBGM');
const stopBGM = document.querySelector('#stopBGM');

//for reference to see which circle is clicked
for (let i=0; i < tableCell.length; i++) {
  tableCell[i].addEventListener('click', (e) => {
    console.log( `${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
  })
};

//start game
const player1Color ='red';
const player2Color ='yellow';
var currentPlayer = 1;

while(!player1){
  var player1 = prompt('Please enter your Name. You will be red.','Reddy');
}

while(!player2){
  var player2= prompt('Please enter your name. You will be yellow.','Yellow');
}

startMusic();
message.textContent = `${player1}'s turn!`;

//whenever a circle is clicked, prompt changeColor function
Array.prototype.forEach.call(tableCell, (cell)=> {
  cell.addEventListener('click', changeColor);
  cell.style.backgroundColor = 'white';
})


//changeColor according to player & detect for win or draw game
function changeColor(e){
  let column = e.target.cellIndex; //return vertical column clicked
  let row = []; //store the white circle

  //find the first whitecircle in column and change its color
  for (let i = 5; i>= 0; i--) {
    if (tableRow[i].children[column].style.backgroundColor == 'white'){
      row.push(tableRow[i].children[column]);

      if (currentPlayer === 1){
        row[0].style.backgroundColor = player1Color;
        dropSound(); //sound effect
        if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2() ){
          message.style.color = player1Color;
          stopMusic();
          return message.textContent = `${player1} wins :D`;
        } else if (drawCheck()){
            return message.textContent = `Game is a draw :O`;          
        } else {
            message.textContent = `${player2}'s turn!`;
            return currentPlayer = 2;
        }

      } else {
        row[0].style.backgroundColor = player2Color;
        dropSound(); //sound effect
        if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2() ){
          message.style.color = player1Color;
          stopMusic();
          return message.textContent = `${player2} wins :D`;
        } else if (drawCheck()){
            return message.textContent = `Game is a draw :O`;          
        } else {
            message.textContent = `${player1}'s turn!`;
            return currentPlayer = 1;
        }
      }
    }
  }
}

// four consecutive circles with same color but not white
function colorMatchCheck(one, two, three, four) {
  return(one == two && one == three && one == four && one != 'white');
}

// checking for winning
function horizontalCheck(){
  for (let row = 0; row < tableRow.length; row++) {
    for (let col = 0; col < 4; col++){
      if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                         tableRow[row].children[col+1].style.backgroundColor,
                         tableRow[row].children[col+2].style.backgroundColor,
                         tableRow[row].children[col+3].style.backgroundColor)){
                          return true;
                        }

    }
  }
}

function verticalCheck(){
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                          tableRow[row+1].children[col].style.backgroundColor,
                          tableRow[row+2].children[col].style.backgroundColor,
                          tableRow[row+3].children[col].style.backgroundColor)) {
                            return true;
                          }
    }
  }
}

function diagonalCheck1(){
  for (let col = 0; col < 4; col++){
    for (let row = 0; row < 3; row++) {
      if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                          tableRow[row+1].children[col+1].style.backgroundColor,
                          tableRow[row+2].children[col+2].style.backgroundColor,
                          tableRow[row+3].children[col+3].style.backgroundColor)){
                            return true;
                          }
    }
  }    
}

function diagonalCheck2(){
  for (let col = 0; col < 4 ; col++){
    for (let row = 3; row < 6; row++) {
      if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                          tableRow[row-1].children[col+1].style.backgroundColor,
                          tableRow[row-2].children[col+2].style.backgroundColor,
                          tableRow[row-3].children[col+3].style.backgroundColor)){
                            return true; 
                          }
    }
  }    
}

function drawCheck(){
  for (let i=0; i < tableCell.length; i++){
    if (tableCell[i].style.backgroundColor == 'white') {
      return false;
    }
  }
  return true;
}

// reset button, alternate player to start
reset.addEventListener('click', () => {
  tableCircle.forEach(circle => {
    circle.style.backgroundColor = 'white';
  })
  startMusic();
  message.style.color = 'black';
  return (currentPlayer == 1 ? (
              message.textContent = `${player2}'s turn!`,
              currentPlayer = 2
            ) : (
              message.textContent = `${player1}'s turn!`,
              currentPlayer = 1
            )
          );
});

// soundeffect
function dropSound(){
  drop.currentTime = 0;
  drop.play();
}

function startMusic(){
  bgm.currentTime = 0;
  bgm.play();
  bgm.loop = true;
  playBGM.style.display = 'block';
  stopBGM.style.display = 'none';
}

function stopMusic(){
  bgm.pause();
  playBGM.style.display = 'none';
  stopBGM.style.display = 'block';
}

// allow user to play or mute bgm
music.addEventListener('click', ()=>{
  if (bgm.paused) {
    bgm.play();
    playBGM.style.display = 'block';
    stopBGM.style.display = 'none';
  } else {
    stopMusic();
  }
});