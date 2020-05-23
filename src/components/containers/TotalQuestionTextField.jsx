import React, {Component} from 'react';
import {TextField, withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
   numberField: {
      margin: theme.spacing(2, 0),
      minWidth: 260,
      width: '100%'
   }
});

class TotalQuestionTextField extends Component {
   constructor(props) {
      super(props);
      this.changeTotalQuestion = this.changeTotalQuestion.bind(this);
   }

   changeTotalQuestion(e) {
      this.props.changeTotalQuestion(e.target.value);
   }

   render() {
      const {classes} = this.props;
      return (
         <TextField
            id="total-questions"
            label="Total Questions"
            type="number"
            value={this.props.totalQuestions}
            onChange={this.changeTotalQuestion}
            className={classes.numberField}
         />
      );
   }
}

TotalQuestionTextField.propTypes = {
   totalQuestions: PropTypes.number.isRequired,
   changeTotalQuestion: PropTypes.func.isRequired
};

export default withStyles(styles)(TotalQuestionTextField);
