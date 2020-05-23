import React, {Component} from 'react';
import {FormControl, InputLabel, MenuItem, Select, withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
   formControl: {
      margin: theme.spacing(2, 0),
      minWidth: 250,
      width: '100%'
   },
   menuItem: {
      padding: theme.spacing(1)
   }
});

class DifficultyLevelFormControl extends Component {
   constructor(props) {
      super(props);
      this.changeDifficultyLevel = this.changeDifficultyLevel.bind(this);
   }

   static difficultyLevels = [{title: 'easy', value: 'Easy'}, {title: 'medium', value: 'Medium'}, {title: 'hard', value: 'Hard'}];

   changeDifficultyLevel(e) {
      this.props.changeDifficultyLevel(e.target.value);
   }

   render() {
      const {classes} = this.props;
      return (
         <FormControl className={classes.formControl}>
            <InputLabel id="difficulty-levels-label" htmlFor="difficulty-levels">Difficulty</InputLabel>
            <Select
               id="difficulty-levels"
               labelId="difficulty-levels-label"
               defaultValue="easy"
               value={this.props.difficulty}
               onChange={this.changeDifficultyLevel}
            >
               {DifficultyLevelFormControl.difficultyLevels.map(difficultyLevel =>
                  (
                     <MenuItem
                        key={difficultyLevel.title}
                        value={difficultyLevel.title}
                     >
                        {difficultyLevel.value}
                     </MenuItem>))
               }
            </Select>
         </FormControl>
      );
   }
}

DifficultyLevelFormControl.propTypes = {
   difficulty: PropTypes.string.isRequired,
   changeDifficultyLevel: PropTypes.func.isRequired
};

export default withStyles(styles)(DifficultyLevelFormControl);
