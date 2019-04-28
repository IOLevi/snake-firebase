import React, { Component } from 'react'
import Cell from "./Cell"

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      snake: this.initSnake(),
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
    // this.staticSnake(data);
    console.log(data)
    return data;
  }

  renderSnake = (data) => {
    for (let segment of this.state.snake) {
      data[segment.x][segment.y].snakeBody = true;
    }
  }

  initSnake = () => {
    let snake = [{ x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 }];
    return snake;
  }

  animateSnake = () => {
    // const newSnake = Object.assign({}, this.state.snake, {x: this.state.snake.x + 1})
    const newSnake = this.state.snake.slice();
    newSnake[0].y += 1;
    this.setState({snake: newSnake});
  }

  componentDidMount = () => {
    setInterval(this.animateSnake, 3000)
  }

  renderBoard = (data) => {
    this.renderSnake(data);
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
