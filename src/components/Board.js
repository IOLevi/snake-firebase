import React, { Component } from 'react'
import Cell from "./Cell"

export default class Board extends Component {

  constructor(props){
    super(props);
    this.state = {board: this.initBoard(),
    }
    this.initBoard = this.initBoard.bind(this)
    this.renderBoard = this.renderBoard.bind(this)
  }

  initBoard = () => {
    let data = [];

    for (let i = 0; i < this.props.height; i++) {
      data.push([])
      for (let j = 0; j < this.props.width; j++) {
        data[i][j] = {x: i, y: j, sbody: false, food: false};
      }

    }
    return data;
  }

  renderBoard = (data) => {
    return data.map(datarow => {
      return datarow.map(item => {
        // conditionally fill if sbody is true
        return (
          <div>
            <Cell key={(item.x,item.y)} x={item.x} y={item.y}/>
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
