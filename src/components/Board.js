import React, { Component } from 'react'

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
    data.map(datarow => {
      datarow.map(item => {
        // conditionally fill if sbody is true
          // <Cell x={item.x} y={item.y}/>
        console.log(`cell ${item.x} ${item.y}`);
    }) 
  })
}

  render() {
    return (
      this.renderBoard(this.state.board)
    )
  }
}
