import React, { Component } from 'react'
import Cell from "./Cell"

export default class Board extends Component {

  snake = [{ x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }];

  direction = "right";
  prevDirection = "right";
  intervalID = null;
  foodPos = {x:1, y:1}

  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      // history also needs direction i think
      history: [{snake: this.snake.slice(), food: {x:1, y:1}}]
    }
    this.initBoard = this.initBoard.bind(this)
    this.renderBoard = this.renderBoard.bind(this)
  }

  initBoard = () => {
    let data = [];

    for (let i = 0; i < this.props.height; i++) {
      data.push([])
      for (let j = 0; j < this.props.width; j++) {
        data[i][j] = { x: i, y: j, snakeBody: false, food: false };
      }

    }
    data[1][1].food = true;
    return data;
  }

  renderSnake = () => {
    const newBoard = this.state.board.slice();
    newBoard[this.snake[0].x][this.snake[0].y].snakeBody = false;
    
    // switch (direction)
    // push the new spot to the snake array
    // check if new spot is out of bounds
    // end()
    // check if new spot is already filled with snake
    // end()
    // check if new spot is food
    // food ? dont shift : shift
    
    
    // USE DIRECTION HERE
    const target = this.snake[this.snake.length - 1]
    switch (this.direction) {
      case "right":
      this.snake.push({ x: target.x, y: target.y + 1 });
      break;
      case "left":
      this.snake.push({ x: target.x, y: target.y - 1 });
      break;
      case "up":
      this.snake.push({ x: target.x - 1, y: target.y });
      break;
      case "down":
      this.snake.push({ x: target.x + 1, y: target.y });
      break;
      default:
      console.log("");
    }
    
    //check boundaries
    let x = this.snake[this.snake.length - 1].x
    let y = this.snake[this.snake.length - 1].y
    // console.log(x, y);
    if (x < 0 || x > this.props.height - 1 || y < 0 || y > this.props.width - 1) {
      console.log('here');
      const newBoard = this.state.board.slice()
      for (let i = 0; i < this.snake.length - 1; i++) {
        newBoard[this.snake[i].x][this.snake[i].y].snakeBody = false;
      }
      
      for (let segment of this.state.history[this.state.history.length-4].snake) {
        newBoard[segment.x][segment.y].snakeBody = true
      }
      this.snake = this.state.history[this.state.history.length-4].snake.slice()
      const oldFood = this.state.history[this.state.history.length-4].food
      newBoard[oldFood.x][oldFood.y].food = true
      this.foodPos = {x:oldFood.x, y:oldFood.y}
      this.setState({ board: newBoard });
      // console.log(this.state.history)
      // this.props.gameOver()
    }
    
    // check snake collision
    else if (newBoard[x][y].snakeBody === true) {
      this.props.gameOver()
    }
    
    // check food
    else if (newBoard[x][y].food === true) {
      // don't shift
      newBoard[x][y].food = false;
      newBoard[x][y].snakeBody= true;
      let {nx, ny} = this.newFoodLocation(newBoard);
      newBoard[nx][ny].food = true;
      this.foodPos = {x:nx, y:ny};
      // food = false
      // snakeBody = true
      // modify newboard with new food location
      const historyUpdate = this.state.history.slice()
      historyUpdate.push({snake: this.snake.slice(), food: this.foodPos})
      this.setState({ board: newBoard, history: historyUpdate })
    }
    else {
      this.snake.shift();
      newBoard[x][y].snakeBody = true;
      const historyUpdate = this.state.history.slice()
      historyUpdate.push({snake: this.snake.slice(), food: this.foodPos})
      this.setState({ board: newBoard, history: historyUpdate })
    }
  }

  initSnake = () => {
    const newBoard = this.state.board.slice();
    for (let segment of this.snake) {
      newBoard[segment.x][segment.y].snakeBody = true;
    }
    this.setState({ board: newBoard });

  }

  newFoodLocation = (board) => {
    // get a random x and y
    // if collision with snake, repeat until viable
    // return the x, y coordinates OR just modify board with side effect
    let x = Math.floor(Math.random() * this.props.height);
    let y = Math.floor(Math.random() * this.props.width);
    
    while (board[x][y].snakeBody) {
      x = Math.floor(Math.random() * this.props.height);
      y = Math.floor(Math.random() * this.props.width);
    }

    return {nx: x, ny: y};
    
  }

  componentDidMount = () => {
    this.initSnake();
    document.addEventListener("keydown", this.keyHandler, false);
    this.intervalID = setInterval(this.renderSnake, 500)
  }

  renderBoard = (data) => {
    return data.map(datarow => {
      return datarow.map(item => {
        return (
          <div key={(item.x, item.y)} className="game-board">

            <Cell x={item.x} y={item.y} snakeBody={item.snakeBody} food={item.food} />
            {(datarow[datarow.length - 1] === item) ? <div className="clear" /> : ""}
          </div>
        )
      })
    })
  }

  preventReverse = () => {
    // check for opposite direction of keypress
    const opposites = { 'left': 'right', 'right': 'left', 'up': 'down', 'down': 'up' };

    if (opposites[this.direction] === this.prevDirection) {
      this.direction = this.prevDirection;
    }
  }

  keyHandler = (e) => {
    this.prevDirection = this.direction
    switch (e.keyCode) {
      case 37:
        this.direction = "left";
        break;
      case 38:
        this.direction = "up";
        break;
      case 39:
        this.direction = "right";
        break;
      case 40:
        this.direction = "down";
        break;
      default:
        console.log("");
    }
    this.preventReverse()
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalID);
  }

  render() {
      return (this.renderBoard(this.state.board))
  }
}