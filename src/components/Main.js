import React, { useState, useContext } from 'react';
import useStyles from './Styles'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

export default Main => {

  const { 
    user,
    updateUsername,
    name, 
    avatar, 
    updateName, 
    updateAvatar, 
    repos, 
    updateRepos, 
    resetRepos,
    updateFoundStatus,
    notFound } = useContext(UserContext)
  
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
      //Load repos
      axios.get('https://api.github.com/users/'+ username +'/repos')
      .then(res => {
        console.log(res.data)
        if(res.data.length === 0) alert('No repos found')
        res.data.map(repo => {
          //console.log(item.name)
          updateRepos(repos => [...repos, repo]);
        })
      })
      .catch(error => {
        console.log(error)
      })

    })
    .catch(error => {
      console.log(error.response)
      if(error.response.status === 404) {
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
      <Grid container className={classes.main}>
        <Grid item xs={12}>
        { name !== '' && notFound === false ? (
          <Paper className={classes.paper}>
            <Avatar alt={name} src={avatar} className={classes.large}/>
            <h1>{name}</h1>
            <h2>{user}</h2>
            {repos.map(repo => (
              <ListItem button key={repo.id}>
                <ListItemText primary={repo.name} secondary={'star count: ' + repo.stargazers_count}/>
              </ListItem>
            ))}
          </Paper>
        ) : (<div></div>)}
        {notFound === true ? (
          <Paper className={classes.paper}>
            <h1>User not found!</h1>
          </Paper>
        ) : (<div></div>)}
        </Grid>
      </Grid>
    </div>
  );
}