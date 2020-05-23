import axios from '../configs/axios-instance';

import {
   CLEAR_CATEGORIES,
   CLEAR_IDENTITY,
   CLEAR_QUESTIONS,
   SET_CATEGORIES,
   SET_IDENTITY,
   SET_QUESTIONS,
   UPDATE_IDENTITY
} from './action-types';

const setIdentity = (data) => {
   return {
      type: SET_IDENTITY,
      data: data
   };
};

const clearIdentity = () => {
   return {
      type: CLEAR_IDENTITY
   };
};

const updateIdentity = () => {
   return {
      type: UPDATE_IDENTITY
   };
};

const setCategories = (data) => {
   return {
      type: SET_CATEGORIES,
      data: data
   };
};

const clearCategories = () => {
   return {
      type: CLEAR_CATEGORIES
   };
};

const setQuestions = data => {
   return {
      type: SET_QUESTIONS,
      data: data
   };
};

const clearQuestions = () => {
   return {
      type: CLEAR_QUESTIONS
   };
};

const fetchCategories = () => {
   return dispatch => {
      return axios.get(`${process.env.REACT_APP_TRIVIA_DOMAIN}/quiz/common/categories`)
         .then(response => dispatch(setCategories(response.data)))
         .catch(() => dispatch(clearCategories()));
   };
};

const register = (username) => {
   return dispatch => {
      return axios.post(`${process.env.REACT_APP_TRIVIA_DOMAIN}/quiz/auth/register`, {username})
         .then(response => dispatch(setIdentity(response.data)))
         .then(() => dispatch(fetchCategories()))
         .catch(() => {
            dispatch(clearIdentity());
            dispatch(clearCategories());
         });
   };
};

const fetchIdentity = () => dispatch => Promise.resolve().then(() => dispatch(updateIdentity()));

const fetchQuestions = (data) => {
   return dispatch => {
      return axios.get(`${process.env.REACT_APP_TRIVIA_DOMAIN}/quiz/api/questions`, {
         params: {
            totalQuestions: data.totalQuestions,
            categoryId: data.category,
            difficulty: data.difficulty
         },
         headers: {
            'x-user-id': localStorage.getItem('userId')
         }
      })
         .then(response => dispatch(setQuestions(response.data)))
         .catch(() => dispatch(clearQuestions()));
   };
};

const loadQuestions = () => dispatch => {
   return Promise.resolve()
      .then(() => {
         const data = JSON.parse(localStorage.getItem('data'));
         dispatch(setQuestions(data));
      });
};

export {
   fetchIdentity,
   fetchCategories,
   fetchQuestions,
   loadQuestions,
   register,
   clearIdentity,
   clearCategories,
   clearQuestions
};
