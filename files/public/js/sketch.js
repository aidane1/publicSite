function subInArray(small, array) {
  let found = false;
  array.forEach(function(sub) {
    if (sub[0] == small[0] && sub[1] == small[1]) {
      found = true;
    }
  });
  return found;
}
function makeCherry(snake) {
  found = false;
  let cherry = [];
  while (!found) {
    let cherryX = Math.floor(Math.random() * boardWidth);
    let cherryY = Math.floor(Math.random() * boardHeight);
    cherry = [cherryX, cherryY];
    if (!subInArray(cherry, snake)) {
      found = true;
    }
  }
  return cherry;
}

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  background(155);
  frameRate(1000);
}

let boardWidth = 50;
let boardHeight = Math.floor(50*window.innerHeight/window.innerWidth);

let snake = [[0,0], [1,0], [2,0], [3,0], [4,0]];
let length = 5;
let direction = 4;
let cherry = [Math.floor(boardWidth/2), Math.floor(boardHeight/2)];
let path = aStar(snake, snake[length-1], cherry, boardWidth-1, boardHeight-1);
let cut = true;
let game = true;

function resetBoard() {
  snake = [[0,0], [1,0], [2,0], [3,0], [4,0]];
  length = 5;
  direction = 4;
  cherry = [Math.floor(boardWidth/2), Math.floor(boardHeight/2)];
  path = aStar(snake, snake[length-1], cherry, boardWidth-1, boardHeight-1);
  cut = true;
  game = true;
}
function draw() {
  if (game) {
    clear();
    background(155);
    let snakeBlock = snake[snake.length-1];
    snake.forEach(function(block) {
      fill("white");
      rect(width/boardWidth*block[0], height/boardHeight*block[1], width/boardWidth, height/boardHeight);
    });

    fill("red");
    rect(width/boardWidth*cherry[0], height/boardHeight*cherry[1], width/boardWidth, height/boardHeight);

    if (snakeBlock[0] == cherry[0] && snakeBlock[1] == cherry[1]) {
      cut = false;

      cherry = makeCherry(snake);




      path = aStar(snake, snake[length-1], cherry, boardWidth-1, boardHeight-1);
      console.log(length);

    } else {


      if (!path) {
        // path = aStar(snake, snake[length-1], cherry, boardWidth-1, boardHeight);
        game = false;
      } else {
        path.pop();
        let nextNode = path[path.length-1];
        if (nextNode == undefined) {
          game = false;
        } else {
          if (nextNode[0] > snakeBlock[0]) {
            direction = 4;
          } else if (nextNode[1] > snakeBlock[1]) {
            direction = 3;
          } else if (nextNode[0] < snakeBlock[0]) {
            direction = 2;
          } else if (nextNode[1] < snakeBlock[1]) {
            direction = 1;
          }
          switch (direction) {
            case 1:
              snake.push([snake[length-1][0], snake[length-1][1]-1]);
              break;
            case 2:
              snake.push([snake[length-1][0]-1, snake[length-1][1]]);
              break;
            case 3:
              snake.push([snake[length-1][0], snake[length-1][1]+1]);
              break;
            case 4:
              snake.push([snake[length-1][0]+1, snake[length-1][1]]);
              break;
          }
        }
      }


      if (snake[snake.length-1][0] < 0 || snake[snake.length-1][0] > boardWidth || snake[snake.length-1][1] < 0 || snake[snake.length-1][1] > boardHeight) {
        game = false;

      }
      if (cut) {
        snake.shift();
      } else {
        cut = true;
        length++;
      }

    }
  } else {
    resetBoard();
    game = true;
  }
}
