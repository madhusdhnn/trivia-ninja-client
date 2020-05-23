import React, {Component} from 'react';
import {Button, Container, withWidth, Zoom} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Quiz from './Quiz';
import PropTypes from 'prop-types';
import {green, orange} from '@material-ui/core/colors';
import QuizOverviewBar from './QuizOverviewBar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import compose from 'recompose/compose';
import {Dimensions, Maps} from '../../utils';
import QuizResultDialog from './QuizResultDialog';

const styles = theme => ({
   root: {
      marginTop: theme.spacing(2)
   },
   warningPaper: {
      background: orange[100],
      padding: theme.spacing(1),
      textTransform: 'uppercase',
   },
   btnContainer: {
      position: 'fixed',
      right: 0,
      left: 0,
      zIndex: 2,
      bottom: theme.spacing(7),
      [theme.breakpoints.up('md')]: {
         paddingLeft: theme.spacing(23),
         paddingRight: theme.spacing(23)
      },
      [theme.breakpoints.down('sm')]: {
         paddingLeft: theme.spacing(4),
         paddingRight: theme.spacing(4)
      }
   },
   actionBtn: {
      width: theme.spacing(10),
      transition: 'transform .2s ease-in-out'
   },
   previous: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.dark
   },
   done: {
      backgroundColor: green[500],
      '&:hover': {
         backgroundColor: green[700]
      },
      float: 'right'
   },
   next: {
      float: 'right'
   }
});

class QuizBoard extends Component {

   constructor(props) {
      super(props);
      this.state = {
         direction: 'left',
         current: 1,
         answered: 0,
         resultData: {open: false},
         gameStatusMap: (props.data.quiz.length > 0)
            ? new Map().set(props.data.quiz[0].id, {selectedOptionId: 0, isRight: false})
            : new Map()
      };
      this.changeNext = this.changeNext.bind(this);
      this.changePrevious = this.changePrevious.bind(this);
      this.generateResult = this.generateResult.bind(this);
      this.createQuizDataComponents = this.createQuizDataComponents.bind(this);
   }

   changeNext() {
      const map = this.state.gameStatusMap;
      const next = this.state.current + 1;
      let value = map.get(next);
      if (!value) {
         value = {
            selectedOptionId: 0,
            isRight: false
         };
         map.set(next, value);
      }
      const answered = Maps.filter(map, (k, v) => v && v.selectedOptionId !== 0).size;
      this.setState({
         current: next > this.props.data.quiz.length ? this.props.data.quiz.length : next,
         answered: answered,
         direction: 'left',
         gameStatusMap: new Map(map)
      });
   }

   changePrevious() {
      const previous = this.state.current - 1;
      const answered = Maps.filter(this.state.gameStatusMap, (k, v) => v && v.selectedOptionId !== 0).size;
      this.setState({
         current: previous <= 0 ? 1 : previous,
         answered: answered,
         direction: 'right'
      });
   }

   generateResult() {
      const valuesIterator = this.state.gameStatusMap.values();
      let next = null;
      let correctAnswers = 0;
      while (!(next = valuesIterator.next()).done) {
         if (next.value.selectedOptionId !== 0 && next.value.isRight) {
            correctAnswers++;
         }
      }
      const totalQuestions = this.props.data.quiz.length;
      const userResultData = {};
      userResultData.totalAttended = {title: 'Total Attended', value: this.state.answered};
      userResultData.totalQuestions = {title: 'Total Questions', value: totalQuestions};
      userResultData.totalCorrect = {title: 'Total Correct', value: correctAnswers};
      userResultData.score = {title: 'Your Score', value: correctAnswers * 10};
      userResultData.maxScore = {title: 'Max Score', value: totalQuestions * 10};
      this.setState({
         resultData: {
            open: true,
            userResultData: userResultData
         }
      });
   }

   onChangeOption = (selectedOptionId, isRight) => {
      const that = this;
      const map = that.state.gameStatusMap;
      let value = map.get(that.state.current);
      value = {
         ...value,
         selectedOptionId: parseInt(selectedOptionId),
         isRight: isRight
      };
      map.set(that.state.current, value);
      that.setState({
         gameStatusMap: new Map(map)
      });
   }

   closeResultDialog = () => {
      const that = this;
      that.setState({
         resultData: {open: false}
      }, () => that.props.clearQuestions());
   }

   createQuizDataComponents() {
      return this.props.data.quiz.map(q => {
         return {
            id: q.id,
            getComponent: () => (
               <Quiz
                  enableSlide={Dimensions.isSmallScreen(this.props.width)}
                  key={q.id}
                  quiz={{...q, direction: this.state.direction}}
                  gameState={this.state.gameStatusMap}
                  onChangeOption={this.onChangeOption}
               />
            )
         };
      });
   }

   render() {
      const {classes, data} = this.props;
      const quizComponents = this.createQuizDataComponents();

      return (
         <Container component="div" maxWidth="md" className={classes.root}>
            <Paper
               square
               variant="outlined"
               className={classes.warningPaper}
            >
               <Typography variant="body1" align="center">
                  Do not refresh the page
               </Typography>
            </Paper>
            <QuizOverviewBar
               overviewData={
                  {
                     category: {title: 'Category', value: data.category},
                     difficulty: {title: 'Difficulty', value: data.difficulty},
                     total: {title: 'Total', value: data.quiz.length || 0},
                     answered: {title: 'Attended', value: this.state.answered}
                  }
               }
            />
            {quizComponents.find(qc => qc.id === this.state.current).getComponent()}
            <Container component="div" maxWidth="lg" className={classes.btnContainer}>
               <Zoom in={this.state.current !== 1}>
                  <Button
                     variant="contained"
                     className={`${classes.actionBtn} ${classes.previous}`}
                     onClick={this.changePrevious}
                  >back
                  </Button>
               </Zoom>
               <Zoom in={this.state.current <= data.quiz.length}>
                  {this.state.current < data.quiz.length ?
                     <Button
                        variant="contained"
                        color="primary"
                        className={`${classes.actionBtn} ${classes.next}`}
                        onClick={this.changeNext}
                     >next
                     </Button>
                     :
                     (
                        <Button
                           variant="contained"
                           color="primary"
                           className={`${classes.actionBtn} ${classes.done}`}
                           onClick={this.generateResult}
                        >done
                        </Button>
                     )
                  }
               </Zoom>
            </Container>
            <QuizResultDialog data={this.state.resultData} close={this.closeResultDialog} />
         </Container>
      );
   }
}

QuizBoard.propTypes = {
   data: PropTypes.object.isRequired,
   clearQuestions: PropTypes.func.isRequired
};

export default compose(
   withStyles(styles, {
      name: 'QuizBoard'
   }),
   withWidth()
)(QuizBoard);
