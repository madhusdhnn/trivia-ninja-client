import {
   CLEAR_CATEGORIES,
   CLEAR_IDENTITY,
   CLEAR_QUESTIONS,
   SET_CATEGORIES,
   SET_IDENTITY,
   SET_QUESTIONS,
   UPDATE_IDENTITY
} from '../actions/action-types';

const triviaServerReducer = (state = {}, action) => {
   switch (action.type) {
   case UPDATE_IDENTITY:
      return {
         ...state,
         userId: localStorage.getItem('userId')
      };
   case SET_IDENTITY:
      localStorage.setItem('userId', action.data.userId);
      return {
         ...state,
         userId: action.data.userId
      };
   case SET_CATEGORIES:
      return {
         ...state,
         categories: action.data.categories
      };
   case CLEAR_CATEGORIES:
      return {
         ...state,
         categories: []
      };
   case SET_QUESTIONS:
      localStorage.setItem('data', JSON.stringify(action.data));
      return {
         ...state,
         data: action.data
      };
   case CLEAR_QUESTIONS:
      localStorage.removeItem('data');
      return {
         ...state,
         data: null
      };
   case CLEAR_IDENTITY:
      localStorage.removeItem('userId');
      localStorage.removeItem('data');
      return {};
   default:
      return state;
   }
};

export default triviaServerReducer;
