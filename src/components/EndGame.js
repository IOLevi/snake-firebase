import React, { Component } from 'react'

export default class EndGame extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        Game Over
        <button onClick={this.props.gameRestart}></button>
      </div>
    )
  }
}
