import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, Divider, ListSubheader, MenuItem, Select, withStyles} from '@material-ui/core';
import compose from 'recompose/compose';

const styles = theme => ({
   formControl: {
      margin: theme.spacing(2, 0),
      minWidth: 250,
      width: '100%'
   },
   menuItem: {
      padding: theme.spacing(1, 2),
      '&.Mui-disabled': {
         display: 'none'
      }
   },
   subheader: {
      position: 'static',
      pointerEvents: 'none'
   },
   subMenuItem: {
      paddingLeft: theme.spacing(3)
   }
});

class QuizCategoryFormControl extends Component {
   constructor(props) {
      super(props);
      this.changeCategory = this.changeCategory.bind(this);
   }

   changeCategory(e) {
      this.props.changeCategory(e.target.value);
   }

   render() {
      const {categories, classes} = this.props;
      if (!categories) {
         return <div />;
      }
      return (
         <FormControl className={classes.formControl}>
            <InputLabel id="quiz-categories-label" htmlFor="quiz-categories">Categories</InputLabel>
            <Select
               id="quiz-categories"
               labelId="quiz-categories-label"
               defaultValue={-1}
               value={this.props.categoryId}
               onChange={this.changeCategory}
            >
               <MenuItem disabled value={-1} className={classes.menuItem}>Choose your option</MenuItem>
               {categories.map(category => {
                  const {isGroup, subCategories} = category;
                  if (isGroup) {
                     const header = (
                        <ListSubheader
                           key={`subheader-${category.title}`}
                           className={classes.subheader}
                        >
                           {category.title}
                        </ListSubheader>
                     );
                     const inner = subCategories.map(subCategory => (
                        <MenuItem
                           key={subCategory.title}
                           value={subCategory.id}
                           className={`${classes.menuItem} ${classes.subMenuItem}`}
                        >
                           {subCategory.title}
                        </MenuItem>
                     ));
                     return [(<Divider key={`${category.title}-divider`} />), header, ...inner];
                  }
                  return (
                     <MenuItem
                        key={category.title}
                        value={category.id}
                        className={classes.menuItem}
                     >
                        {category.title}
                     </MenuItem>
                  );
               })}
            </Select>
         </FormControl>
      );
   }
}

QuizCategoryFormControl.propTypes = {
   categories: PropTypes.array,
   categoryId: PropTypes.number.isRequired,
   changeCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => {
   const {trivia} = state;
   return {
      categories: trivia.categories
   };
};

export default compose(
   withStyles(styles, {
      name: 'QuizCategories'
   }),
   connect(mapStateToProps, null)
)(QuizCategoryFormControl);
