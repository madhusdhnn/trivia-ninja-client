import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {Button, Container, CssBaseline, Paper, withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import QuizCategoryFormControl from './QuizCategoryFormControl';
import DifficultyLevelFormControl from './DifficultyLevelFormControl';
import TotalQuestionTextField from './TotalQuestionTextField';
import {fetchQuestions} from '../../actions/trivia-server-actions';
import {bindActionCreators} from 'redux';

const styles = theme => ({
   paper: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(3, 4),
      display: 'flex',
      flexDirection: 'column'
   },
   form: {
      width: '100%'
   },
   submit: {
      margin: theme.spacing(2, 0),
      float: 'right',
      [theme.breakpoints.down('xs')]: {
         width: '100%'
      }
   }
});

class QuizForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         category: -1,
         difficulty: 'easy',
         totalQuestions: 10
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.resetForm = this.resetForm.bind(this);
   }

   changeTotalQuestion = (totalQuestions) => {
      const that = this;
      const questions = parseInt(totalQuestions);
      that.setState({
         totalQuestions: questions > 50 ? 50 : questions
      });
   };

   changeDifficultyLevel = (difficulty) => {
      const that = this;
      that.setState({
         difficulty: difficulty
      });
   };

   changeCategory = (category) => {
      const that = this;
      that.setState({
         category: category
      });
   };

   resetForm() {
      this.setState({
         category: -1,
         difficulty: 'easy',
         totalQuestions: 10
      });
   }

   onSubmit(e) {
      e.preventDefault();
      this.props.fetchQuestions({...this.state});
      this.resetForm();
   }

   render() {
      const {classes} = this.props;
      return (
         <Container component="div" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={2} className={classes.paper}>
               <form
                  noValidate
                  className={classes.form}
                  autoComplete="off"
                  onSubmit={this.onSubmit}
               >
                  <TotalQuestionTextField
                     totalQuestions={this.state.totalQuestions}
                     changeTotalQuestion={this.changeTotalQuestion}
                  />
                  <DifficultyLevelFormControl
                     difficulty={this.state.difficulty}
                     changeDifficultyLevel={this.changeDifficultyLevel}
                  />
                  <QuizCategoryFormControl
                     categoryId={this.state.category}
                     changeCategory={this.changeCategory}
                  />
                  <Button
                     disabled={this.props.isLoading}
                     type="submit"
                     color="primary"
                     variant="contained"
                     className={classes.submit}
                  >
                     start game
                  </Button>
               </form>
            </Paper>
         </Container>
      );
   }
}

QuizForm.propTypes = {
   fetchQuestions: PropTypes.func,
   isLoading: PropTypes.bool
};

const mapStateToProps = state => {
   return {isLoading: state.loader.isLoading};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({fetchQuestions}, dispatch);
};

export default compose(
   withStyles(styles, {
      name: 'QuizForm'
   }),
   connect(mapStateToProps, mapDispatchToProps)
)(QuizForm);
