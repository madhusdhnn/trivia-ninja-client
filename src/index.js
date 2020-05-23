import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import Store from './store';
import { BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {initApiInterceptor} from './configs/api-interceptor';
import Routes from './components/Routes';
import dotenv from 'dotenv';

dotenv.config();

initApiInterceptor();

ReactDOM.render(
   <Provider store={Store}>
      <Router>
         <App>
            <Routes />
         </App>
      </Router>
   </Provider>,
   document.getElementById('root')
);

serviceWorker.unregister();
