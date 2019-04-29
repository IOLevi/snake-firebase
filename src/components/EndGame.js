import React, { Component } from 'react'

export default class EndGame extends Component {
  render() {
    return (
      <div>
        Game Over
        <button className="button" onClick={this.props.gameRestart}>Restart</button>
      </div>
    )
  }
}
