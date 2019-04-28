import React, { Component } from 'react'
import Cell from "./Cell"

export default class Board extends Component {

  snake = [{ x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 }];

  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      // snake: this.initSnake(),
    }
    this.initBoard = this.initBoard.bind(this)
    this.renderBoard = this.renderBoard.bind(this)
    // this.initSnake = this.initSnake.bind(this)
  }

  initBoard = () => {
    let data = [];

    for (let i = 0; i < this.props.height; i++) {
      data.push([])
      for (let j = 0; j < this.props.width; j++) {
        data[i][j] = { x: i, y: j, snakeBody: false, food: false };
      }

    }
    // this.staticSnake(data);
    console.log(data)
    return data;
  }

  // how to do this with a set state instead of looping and 
  // changing this way
  renderSnake = () => {
    const newBoard = this.state.board.slice();
    newBoard[this.snake[0].x][this.snake[0].y].snakeBody = false;
    this.snake.shift();
    // for (let segment of this.state.snake) {
    //   newBoard[segment.x][segment.y].snakeBody = true;
    // }
    this.setState({ board: newBoard })
  }

  initSnake = () => {
    const newBoard = this.state.board.slice();
    for (let segment of this.snake) {
      newBoard[segment.x][segment.y].snakeBody = true;
    }
    this.setState({board:newBoard});
    
  }

  animateSnake = () => {
    // const newSnake = Object.assign({}, this.state.snake, {x: this.state.snake.x + 1})
    // const newSnake = this.state.snake.slice();
    this.snake[0].y += 1;
    // turn off the one before?!?!

    // this.setState({snake: newSnake});

  }

  componentDidMount = () => {
    this.initSnake();
    setInterval(this.renderSnake, 3000)
  }

  renderBoard = (data) => {
    return data.map(datarow => {
      return datarow.map(item => {
        // conditionally fill if sbody is true
        return (
          <div key={(item.x, item.y)}>

            <Cell x={item.x} y={item.y} snakeBody={item.snakeBody} food={item.food} />
            {(datarow[datarow.length - 1] === item) ? <div className="clear" /> : ""}
          </div>
        )
      })
    })
  }

  render() {
    return (
      <div className="board">
        {this.renderBoard(this.state.board)}
      </div>
    )
  }
}
