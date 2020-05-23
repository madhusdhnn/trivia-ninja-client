import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

let theme = createMuiTheme({
   palette: {
      primary: {
         light: '#4fc3f7',
         main: '#03a9f4',
         dark: '#0288d1',
         contrastText: 'rgb(255, 255, 255)'
      },
      secondary: {
         light: '#ffd54f',
         main: '#ffc107',
         dark: '#ffa000',
         contrastText: 'rgb(255, 255, 255)'
      },
      background: {
         default: '#fff'
      }
   }
});
theme = responsiveFontSizes(theme);

export default theme;
