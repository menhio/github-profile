import React, { useContext, useEffect } from 'react';
import useStyles from './Styles'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

const Profile = ({history}) => {

  const { 
    user,
    name, 
    avatar, 
    repos, 
    updateRepos, 
    resetRepos,
    notFound } = useContext(UserContext)
  
  const classes = useStyles();

  useEffect(() => {
    if(user === '' || user === undefined) {
      history.push('/')
    }
    //Load repos
    axios.get('https://api.github.com/users/'+ user +'/repos')
    .then(res => {
      console.log(res.data)
      //if(res.data.length === 0) alert('No repos found')
      res.data.map(repo => {
        updateRepos(repos => [...repos, repo]);
        history.push('/profile')
      })
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  function goBack() {
    resetRepos()
    history.push('/')
  }

  return (
    <div>
      <Grid container justify="flex-end" className={classes.main}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={goBack}>
            Back
          </Button>
        </Grid>
      </Grid>
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

export default Profile