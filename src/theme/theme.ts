import { createTheme } from '@mui/material/styles';
import colors from './colors';

const theme = createTheme({
  palette: {
    ...colors,
  },
  typography: {
    allVariants: {
      color: colors.primary.main,
    },
  },
});

export default theme;
