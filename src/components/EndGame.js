import React, { Component } from 'react';
import UserScoreBoard from './UserScoreBoard';

export default class EndGame extends Component {
  render() {
    if (this.props.isSubmit) {
      return (
      <div>
        <UserScoreBoard isSubmit={this.props.isSubmit} scores={this.props.userScoreBoard}/>
        <button onClick={this.props.gameRestart}>Play Again</button>
      </div>
      )
    } 
    else {
      return (
        <div>
          Game Over
          <br />
          <br />
          Total Score: {this.props.score}
          <form onSubmit={this.props.handleSubmit}>
            Submit Username:
            <input type="text" name="user" />
            <button type="submit">Submituu</button>
          </form>
          
          <button onClick={this.props.gameRestart}>Play Again</button>
        </div>
      )
    }
  }
}