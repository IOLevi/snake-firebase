import React, { Component } from 'react'
import Board from "./Board"
import EndGame from "./EndGame"
import firebase from '../firebase'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme();
export default class Game extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = { height: 10, width: 10, endGame: false, score: 0, userScoreBoard: [], isSubmit: false};
    this.gameOver = this.gameOver.bind(this.gameOver)
    this.gameRestart = this.gameRestart.bind(this.gameRestart)
    this.handleSubmit = this.handleSubmit.bind(this.handleSubmit)
  }
  
  componentDidMount() {
    const usersRef = firebase.database().ref('users')
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        newState.push({
          user: users[user].user,
          score: users[user].score,
        })
      }
      this.setState({
        userScoreBoard: newState
      })
      // console.log(this.state.userScoreBoard)
    })
  }

  gameOver = () => {
    this.setState({
      endGame: true,
    })
  }

  gameRestart = () => {
    this.setState({
      endGame: false,
      isSubmit: false,
    })
  }

  trackScore = (currentScore) => {
    this.setState({
      score: currentScore += 1,
    })
    // console.log(this.state.score)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    const userRef = firebase.database().ref('users')
    const user = {
      user: e.target[0].value,
      score: this.state.score,
      // isSubmit: true,
    }
    userRef.push(user)
    this.setState({isSubmit: true})
  }

  render() {
    if (this.state.endGame) {
      return (
        <MuiThemeProvider theme={theme} >
          <EndGame gameRestart={this.gameRestart} handleSubmit={this.handleSubmit} score={this.state.score} userScoreBoard={this.state.userScoreBoard} isSubmit={this.state.isSubmit}/>
        </MuiThemeProvider>
      )}
    else {
      return (
        <MuiThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <Board height={this.state.height} width={this.state.width} gameOver={this.gameOver} trackScore={this.trackScore} score={this.state.score}/>
        </MuiThemeProvider>
      )}
  }
}
