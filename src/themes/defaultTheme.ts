// Custom theme
// https://mui.com/material-ui/customization/how-to-customize/

// Default theme
// https://mui.com/material-ui/customization/default-theme/

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#009688',
    //   contrastText: '#fff',
    // },
    primary: {
      main: '#0071DC',
    },
    secondary: {
      main: '#fafcfd',
    },
  },
});

export default theme;
