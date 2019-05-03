import React, { Component } from 'react'

export default class EndGame extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        Game Over
        <br />
        <br />
        Total Score: {this.props.score}
        <button onClick={this.props.gameRestart}></button>
      </div>
    )
  }
}
