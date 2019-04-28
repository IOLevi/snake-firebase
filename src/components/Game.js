import React, { Component } from 'react'
import Board from "./Board"
import EndGame from "./EndGame"

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 10, width: 10, endGame: false};
    this.gameOver = this.gameOver.bind(this.gameOver)
  }

  gameOver = () => {
    this.setState({
      endGame: true,
    })
  }

  render() {
    if (this.state.endGame) {
      return <EndGame />
    }
    else {
      return <Board height={this.state.height} width={this.state.width} gameOver={this.gameOver}/>}
    }
}
