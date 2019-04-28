import React, { Component } from 'react'
import Cell from "./Cell"

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
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
    this.staticSnake(data);
    console.log(data)
    return data;
  }

  staticSnake = (data) => {
    data[2][2].snakeBody = true;
    data[3][2].snakeBody = true;
    data[4][2].snakeBody = true;
  }

  dynamicSnake = () => {
    let snake = [{ x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 }]
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
