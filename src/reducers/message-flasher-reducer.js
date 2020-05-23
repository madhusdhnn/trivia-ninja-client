import {FLASH_ERROR, FLASH_NOTICE, FLASH_WARNING, REMOVE_FLASH} from '../actions/action-types';

const messageFlasherReducer = (state = {open: false}, action) => {
   switch (action.type) {
   case FLASH_ERROR:
      return {
         ...state,
         message: action.message,
         type: 'error',
         title: 'Error',
         open: true
      };
   case FLASH_WARNING:
      return {
         ...state,
         message: action.message,
         type: 'warning',
         title: 'Warning',
         open: true
      };
   case FLASH_NOTICE:
      return {
         ...state,
         message: action.message,
         type: 'notice',
         title: 'Notice',
         open: true
      };
   case REMOVE_FLASH:
      return {open: false};
   default:
      return state;
   }
};

export default messageFlasherReducer;
