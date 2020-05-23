import React, {Component} from 'react';
import {Paper, withStyles, withWidth} from '@material-ui/core';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import {Dimensions} from '../../utils';
import GridData from './QuizGridData';

const styles = theme => ({
   paper: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(1.5)
   }
});

class QuizOverviewBar extends Component {

   render() {
      const {classes, width, overviewData} = this.props;
      return (
         <Paper
            square={!Dimensions.isSmallScreen(width)}
            elevation={Dimensions.isSmallScreen(width) ? 2 : 0}
            variant={Dimensions.isSmallScreen(width) ? 'elevation' : 'outlined'}
            className={classes.paper}
         >
            <GridData data={overviewData} />
         </Paper>
      );
   }
}

QuizOverviewBar.propTypes = {
   overviewData: PropTypes.object.isRequired
};

export default compose(
   withStyles(styles, {
      name: 'QuizOverviewBar'
   }),
   withWidth()
)(QuizOverviewBar);
