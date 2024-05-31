import { Box, Container, IconButton, styled, Typography } from '@mui/material';
import theme from 'theme/theme';

export const StyledContainer = styled(Container)`
  padding-top: 2rem;
`;

export const StyledTopPanel = styled(Box)`
  & > div {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

export const StyledBottomPanel = styled(Box)`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 2rem 0;
`;

export const StyledImg = styled('img')`
  width: 3rem;
`;

export const Title = styled(Typography)`
  font-size: 2rem;
`;

export const Subtitle = styled(Typography)`
  font-size: 0.8rem;
  color: ${theme.palette.primary.contrastText};
  font-weight: bold;
`;

export const StyledBackBtn = styled(IconButton)({
  marginTop: 10,
  marginBottom: 10,
});
