import React, { Component } from 'react'
import Cell from "./Cell"
import EndGame from "./EndGame"

export default class Board extends Component {

  snake = [{ x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 }];

  direction = "right";
  prevDirection = "right";
  intervalID = null;

  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      endGame: false,
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
    return data;
  }

  renderSnake = () => {
    const newBoard = this.state.board.slice();
    newBoard[this.snake[0].x][this.snake[0].y].snakeBody = false;
    this.snake.shift();

    // USE DIRECTION HERE
    const target = this.snake[this.snake.length - 1]
    try {
      switch (this.direction) {
        case "right":
          this.snake.push({ x: target.x, y: target.y + 1 });
          newBoard[target.x][target.y + 1].snakeBody = true;
          break;
        case "left":
          this.snake.push({ x: target.x, y: target.y - 1 });
          newBoard[target.x][target.y - 1].snakeBody = true;
          break;
        case "up":
          this.snake.push({ x: target.x - 1, y: target.y });
          newBoard[target.x - 1][target.y].snakeBody = true;
          break;
        case "down":
          this.snake.push({ x: target.x + 1, y: target.y });
          newBoard[target.x + 1][target.y].snakeBody = true;
          break;
        default:
          console.log("");
      }
    }
    catch (err) {
      this.setState({
        endGame: true
      })
    }

    this.setState({ board: newBoard })
  }

  initSnake = () => {
    const newBoard = this.state.board.slice();
    for (let segment of this.snake) {
      newBoard[segment.x][segment.y].snakeBody = true;
    }
    this.setState({ board: newBoard });

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
          <div key={(item.x, item.y)}>

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

  endSplash = () => {
    clearInterval(this.intervalID);
    return <EndGame />
  }

  render() {
    if (this.state.endGame) {
      return (this.endSplash())
    }
    else {
      return (this.renderBoard(this.state.board))
    }
  }
}