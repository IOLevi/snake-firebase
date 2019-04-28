import React from 'react'

export default function Cell(props) {
  return (
    <div className={"cell" + (props.snakeBody ? "-snake" : "") + (props.food ? "-food" : "")} >
    </div>
  )
}

