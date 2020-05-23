import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import QuizGridData from './QuizGridData';

class QuizResultDialog extends Component {

   constructor(props) {
      super(props);
      this.closeDialog = this.closeDialog.bind(this);
   }

   closeDialog() {
      this.props.close();
   }

   render() {
      const {data} = this.props;
      return (
         <Dialog
            fullWidth
            maxWidth="sm"
            open={data.open}
            onClose={this.closeDialog}
            aria-labelledby="quiz-result-dialog-title"
            aria-describedby="quiz-result-dialog-description"
         >
            <DialogTitle id="quiz-result-dialog-title">Result</DialogTitle>
            <DialogContent>
               <QuizGridData data={data.userResultData ? data.userResultData : {}} />
            </DialogContent>
            <DialogActions>
               <Button onClick={this.closeDialog} color="primary">
                  close
               </Button>
            </DialogActions>
         </Dialog>
      );
   }
}

QuizResultDialog.propTypes = {
   data: PropTypes.object.isRequired,
   close: PropTypes.func.isRequired
};

export default QuizResultDialog;
