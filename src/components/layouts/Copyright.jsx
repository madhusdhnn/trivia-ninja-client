import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   copyright: {
      position: 'fixed',
      bottom: -10,
      left: 0,
      right: 0,
      zIndex: -1
   }
}, {
   name: 'Copyright'
});

const Copyright = () => {
   const classes = useStyles();
   return (
      <Grid container className={classes.copyright}>
         <Grid item xs>
            <Typography paragraph variant="body2" color="textSecondary" align="center">
               {`© ${new Date().getFullYear()} TheTechMaddy. All rights reserved.`}
            </Typography>
         </Grid>
      </Grid>
   );
};

export default Copyright;
