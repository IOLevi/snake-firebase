import React, { Component } from 'react';
import UserScoreBoard from './UserScoreBoard';
import Button from '@material-ui/core/Button'
import Typography from'@material-ui/core/Typography'
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


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
          <Typography variant="h2">
          Game Over
          </Typography>
          <br />
          <br />
          <Typography variant='body1'>
          Total Score: {this.props.score}
          </Typography>
          <form variant="outlined" required="true" onSubmit={this.props.handleSubmit}>
            {/* <InputLabel htmlFor="user-submit">
            Submit Username
            </InputLabel>
            <Input type="text" name="user" /> */}
            <TextField 
              id="user-submit"
              label="Username"
              ></TextField>
            <Button type="submit">Submit</Button>
          </form>
          
          <Button variant="contained" color="primary" onClick={this.props.gameRestart}>Play Again</Button>
        </div>
      )
    }
  }
}