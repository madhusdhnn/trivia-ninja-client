import React, {Component} from 'react';
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {removeFlash} from '../../actions/message-flasher-actions';
import {bindActionCreators} from 'redux';

const styles = theme => ({
   error: {
      color: theme.palette.error.main
   },
   warning: {
      color: theme.palette.warning.main
   },
   notice: {
      color: theme.palette.success.main
   }
});

class MessageFlasher extends Component {
   constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
   }

   handleClose() {
      this.props.removeFlash();
   }

   render() {
      const {flash, classes} = this.props;
      return (
         <div>
            <Dialog
               open={flash.open}
               fullWidth
               onClose={this.handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
            >
               <DialogTitle className={classes[flash.type]} id="alert-dialog-title">{flash.title}</DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                     {flash.message}
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={this.handleClose} className={classes[flash.type]}>
                     Okay
                  </Button>
               </DialogActions>
            </Dialog>
         </div>
      );
   }
}

MessageFlasher.propTypes = {
   flash: PropTypes.object,
   removeFlash: PropTypes.func
};

const mapStateToProps = state => {
   const {flash} = state;
   return {flash};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({removeFlash}, dispatch);
};

export default compose(
   withStyles(styles, {
      name: 'MessageFlasher'
   }),
   connect(mapStateToProps, mapDispatchToProps)
)(MessageFlasher);

