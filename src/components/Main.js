import React, { useState, useContext } from 'react';
import useStyles from './Styles'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

const Main = ({history}) => {

  const { 
    updateUsername,
    updateName, 
    updateAvatar, 
    resetRepos,
    updateFoundStatus
    } = useContext(UserContext)
  
  const classes = useStyles();
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    resetRepos()
    axios.get('https://api.github.com/users/'+ username)
    .then(res => {
      updateFoundStatus(false)
      updateUsername(res.data.login)
      updateAvatar(res.data.avatar_url)
      updateName(res.data.name)
      history.push('/profile')
    })
    .catch(error => {
      console.log(error.response)
      if(error.response.status === 404) {
        history.push('/profile')
        updateFoundStatus(true)
      }
    })
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.logo}>
              <GitHubIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Github LookUp
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                autoComplete="off"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Search
              </Button>
            </form>
          </div>
      </Container>
    </div>
  );
}

export default Main