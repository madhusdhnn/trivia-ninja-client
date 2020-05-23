import React, {Component} from 'react';
import {FormControl, FormControlLabel, Paper, Radio, RadioGroup, Typography, withStyles} from '@material-ui/core';
import he from 'he';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
   paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(1)
   },
   formControl: {
      margin: theme.spacing(3)
   },
   form: {
      width: '100%'
   }
});

class Quiz extends Component {

   constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.changeOption = this.changeOption.bind(this);
      this.createQuizComponent = this.createQuizComponent.bind(this);
   }

   onSubmit(e) {
      e.preventDefault();
   }

   changeOption(e) {
      const selectedOption = this.props.quiz.options.find(opt => opt.id === parseInt(e.target.value));
      this.props.onChangeOption(e.target.value, selectedOption.isRight);
   }

   createQuizComponent(classes, quiz, value) {
      return (
         <Paper elevation={2} className={classes.paper}>
            <Typography variant="h6">{`${quiz.id}. ${he.decode(quiz.question)}`}</Typography>
            <form
               noValidate
               className={classes.form}
               autoComplete="off"
               onSubmit={this.onSubmit}
            >
               <FormControl component="fieldset" className={classes.formControl}>
                  <RadioGroup
                     aria-label="quiz-options"
                     name="quiz-options"
                     value={value.selectedOptionId}
                     onChange={this.changeOption}
                  >
                     {quiz.options.map(option =>
                        (
                           <FormControlLabel
                              key={option.id}
                              value={option.id}
                              control={<Radio />}
                              label={option.option}
                           />
                        ))
                     }
                  </RadioGroup>
               </FormControl>
            </form>
         </Paper>
      );
   }

   render() {
      const {classes, quiz, enableSlide, gameState} = this.props;
      if (!quiz || !gameState) {
         return (<div />);
      }
      const value = gameState.get(quiz.id);
      const quizComponent = this.createQuizComponent(classes, quiz, value);
      if (enableSlide) {
         return (
            <div>
               <Slide
                  in
                  mountOnEnter
                  unmountOnExit
                  direction={quiz.direction}
                  timeout={{enter: 450, exit: 150}}
               >
                  {quizComponent}
               </Slide>
            </div>
         );
      }
      return (
         <React.Fragment>
            {quizComponent}
         </React.Fragment>
      );
   }
}

Quiz.propTypes = {
   quiz: PropTypes.object,
   enableSlide: PropTypes.bool.isRequired,
   gameState: PropTypes.object.isRequired,
   onChangeOption: PropTypes.func.isRequired
};


export default withStyles(styles)(Quiz);
