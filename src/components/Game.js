import React, { Component } from 'react'
import Board from "./Board"

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 10, width: 10 };
  }

  render() {
    return (
      <div>
        <Board height={this.state.height} width={this.state.width} />
      </div>
    )
  }
}
