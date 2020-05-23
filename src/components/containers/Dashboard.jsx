import React, {Component} from 'react';
import QuizForm from './QuizForm';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import QuizBoard from './QuizBoard';
import {clearQuestions, loadQuestions} from '../../actions/trivia-server-actions';
import {bindActionCreators} from 'redux';
import Copyright from '../layouts/Copyright';

class Dashboard extends Component {
   componentDidMount() {
      if (this.props.userId) {
         this.props.loadQuestions();
      }
   }

   render() {
      return (
         <React.Fragment>
            {this.props.data
               ?
               <QuizBoard
                  data={this.props.data}
                  clearQuestions={this.props.clearQuestions}
               />
               : <QuizForm />
            }
            <Copyright />
         </React.Fragment>
      );
   }
}

Dashboard.propTypes = {
   data: PropTypes.object,
   userId: PropTypes.string,
   loadQuestions: PropTypes.func,
   clearQuestions: PropTypes.func
};

const mapStateToProps = state => {
   const {trivia} = state;
   return {
      data: trivia.data,
      userId: trivia.userId
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({loadQuestions, clearQuestions}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
