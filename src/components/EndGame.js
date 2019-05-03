import React, { Component } from 'react'

export default class EndGame extends Component {
  render() {
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
        
        <button onClick={this.props.gameRestart}></button>
      </div>
    )
  }
}
