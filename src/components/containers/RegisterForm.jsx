import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {Avatar, Button, Container, CssBaseline, Paper, TextField, Typography, withStyles} from '@material-ui/core';
import Copyright from '../layouts/Copyright';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {register} from '../../actions/trivia-server-actions';
import logo from '../../static/images/logo.png';

const styles = theme => ({
   description: {
      marginTop: theme.spacing(2)
   },
   paper: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(2, 2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
         padding: theme.spacing(3, 4)
      }
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: 'transparent',
      width: theme.spacing(7),
      height: theme.spacing(7),
      border: `1px solid ${theme.palette.grey[400]}`
   },
   form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
   },
   submit: {
      margin: theme.spacing(1, 0, 0),
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.down('xs')]: {
         width: '100%'
      }
   }
});

class RegisterForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         showError: false
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.changeUsername = this.changeUsername.bind(this);
   }

   changeUsername(e) {
      this.setState({
         username: e.target.value,
         showError: false
      });
   }

   onSubmit(e) {
      e.preventDefault();
      if (!this.state.username) {
         this.setState({
            showError: true
         });
      } else {
         this.props.register(this.state.username);
      }
   }

   render() {
      const {classes} = this.props;
      return (
         <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Paper elevation={2} className={classes.paper}>
               <Avatar src={logo} alt="Trivia Ninja Logo" className={classes.avatar} />
               <Typography paragraph align="justify" className={classes.description}>
                  {`Trivia Ninja is a personalized online quiz game.
                   The goal is to complete all the categories. We'll start by creating an access token.
                   With access token, no duplicate questions will be created per game,
                   till the questions available, under a selected category.`
                  }
               </Typography>
               <Typography paragraph variant="body2" color="textSecondary" align="justify">
                  Note: If you already have an account,
                  a new token will be generated against your username.
                  The access token will be deleted after six hours of inactivity.
               </Typography>
               <form
                  noValidate
                  className={classes.form}
                  autoComplete="off"
                  onSubmit={this.onSubmit}
               >
                  <TextField
                     fullWidth
                     error={this.state.showError}
                     value={this.state.username}
                     onChange={this.changeUsername}
                     helperText={this.state.showError ? 'Please enter some text' : ''}
                     variant="outlined"
                     margin="normal"
                     id="username"
                     label="Username"
                     name="username"
                  />
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     disabled={this.props.isLoading}
                     className={classes.submit}
                  >
                     generate
                  </Button>
               </form>
            </Paper>
            <Copyright />
         </Container>
      );
   }
}

RegisterForm.propTypes = {
   register: PropTypes.func,
   isLoading: PropTypes.bool
};

const mapStateToProps = state => {
   const {trivia, loader} = state;
   return {trivia, isLoading: loader.isLoading};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({register}, dispatch);
};

export default compose(
   withStyles(styles, {
      name: 'RegisterForm'
   }),
   connect(
      mapStateToProps,
      mapDispatchToProps
   )
)(RegisterForm);
