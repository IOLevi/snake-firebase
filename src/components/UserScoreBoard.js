import React, { Component } from 'react'

export default class UserScoreBoard extends Component {

  render() {
    // const element = [];
    // for (let score of this.props.scores) {
    //     element.push(score.user)
    //   }
    // element.map((e) => {
    //     return <li>e</li>
    // })
    // console.log(element)
    return (
        <ul>
            {this.props.scores.sort((score1, score2) => score2.score - score1.score).map((score, index) =>
              <li key={index}>{score.user} | {score.score}</li>
            )}
        </ul>
    )
  }
}
