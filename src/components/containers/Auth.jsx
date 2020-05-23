import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCategories, fetchIdentity} from '../../actions/trivia-server-actions';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';
import CssBaseline from '@material-ui/core/CssBaseline';

class Auth extends Component {

   componentDidMount() {
      this.props.fetchIdentity();
      this.props.fetchCategories();
   }

   render() {
      const {trivia} = this.props;
      if (trivia.userId) {
         return (
            <React.Fragment>
               <CssBaseline />
               {this.props.children}
            </React.Fragment>
         );
      }
      return (
         <RegisterForm />
      );
   }
}

Auth.propTypes = {
   trivia: PropTypes.object,
   fetchIdentity: PropTypes.func,
   fetchCategories: PropTypes.func
};

const mapStateToProps = state => {
   const {trivia} = state;
   return {trivia};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({fetchIdentity, fetchCategories}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
