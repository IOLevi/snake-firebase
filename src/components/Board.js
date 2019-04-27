import React, { Component } from 'react'

export default class Board extends Component {

  constructor(props){
    super(props);
    this.state = {board: this.initBoard(),
    }
  }

  initBoard = () => {
    let data = [];

    for (let i = 0; i < this.props.height; i++) {
      data[i].push([])
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
        <div>
          <Cell x={item.x} y={item.y}/>
        </div>
        console.log(`cell ${item.x} ${item.y}`);
      }
    }) 
  }
  render() {
    return (
      this.renderBoard(this.state.board)
    )
  }
}
