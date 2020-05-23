import React, {Component} from 'react';
import {Grid, Typography, withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
   title: {
      color: theme.palette.text.secondary
   },
   body: {
      color: theme.palette.text.primary,
      textTransform: 'capitalize'
   }
});

class QuizGridData extends Component {
   render() {
      const data = this.props.data;
      const keys = Object.keys(data);
      if (keys.length === 0) {
         return (<div />);
      }
      return keys.map(key =>
         (
            <Grid
               container
               key={key}
               spacing={2}
            >
               <Grid item xs={8} lg={3} md={6}>
                  <Typography variant="body1" className={this.props.classes.title}>
                     {data[key].title}:&nbsp;
                  </Typography>
               </Grid>
               <Grid item xs={4}>
                  <Typography variant="body1" className={this.props.classes.body}>
                     {data[key].value}
                  </Typography>
               </Grid>
            </Grid>
         )
      );
   }
}

QuizGridData.propTypes = {
   data: PropTypes.object.isRequired
};

export default withStyles(styles, {name: 'GridData'})(QuizGridData);
