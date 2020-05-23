import {combineReducers} from 'redux';
import loader from './loader-reducer';
import messageFlasherReducer from './message-flasher-reducer';
import triviaServerReducer from './trivia-server-reducer';
import snackbarReducer from './snackbar-reducer';

const rootReducer = combineReducers({
   loader,
   flash: messageFlasherReducer,
   trivia: triviaServerReducer,
   snackbar: snackbarReducer
});

export default rootReducer;
