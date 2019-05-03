import React, { Component } from 'react'
import Board from "./Board"
import EndGame from "./EndGame"
import firebase from '../firebase'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 10, width: 10, endGame: false, score: 0};
    this.gameOver = this.gameOver.bind(this.gameOver)
    this.gameRestart = this.gameRestart.bind(this.gameRestart)
    this.handleSubmit = this.handleSubmit.bind(this.handleSubmit)
  }

  gameOver = () => {
    this.setState({
      endGame: true,
    })
  }

  gameRestart = () => {
    this.setState({
      endGame: false,
    })
  }

  trackScore = (currentScore) => {
    this.setState({
      score: currentScore += 1,
    })
    console.log(this.state.score)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    const userRef = firebase.database().ref('users')
    const user = {
      user: e.target[0].value,
      score: this.state.score
    }
    userRef.push(user)
  }

  render() {
    if (this.state.endGame) {
      return <EndGame gameRestart={this.gameRestart} handleSubmit={this.handleSubmit} score={this.state.score}/>
    }
    else {
      return <Board height={this.state.height} width={this.state.width} gameOver={this.gameOver} trackScore={this.trackScore} score={this.state.score}/>}
    }
}
