import React, {Component} from 'react';
import '../../styles/main.scss';
import Spinner from './Spinner';
import NavBar from './NavBar';
import theme from '../../theme';
import {ThemeProvider} from '@material-ui/core/styles';
import MessageFlasher from './MessageFlasher';
import Auth from '../containers/Auth';
import SnackBar from "./SnackBar";

const style = {width: '100%'};

class Layout extends Component {
   render() {
      return (
         <ThemeProvider theme={theme}>
            <MessageFlasher />
            <Spinner />
            <SnackBar />
            <Auth>
               <NavBar />
               <div style={style}>
                  {this.props.children}
               </div>
            </Auth>
         </ThemeProvider>
      );
   }
}

export default Layout;
