import { Container, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
`;

export const StyledIcon = styled('img')`
  width: 1.5rem;
`;

export const StyledNameContainer = styled('div')`
  display: flex;
  height: 100%;
  gap: 0.5rem;
  align-items: center;
`;

export const StyledFavouritesWrapper = styled('div')`
  display: flex;
  gap: 2rem;
`;

export const StyledFavouritesContainer = styled('div')`
  width: 100%;
`;

export const StyledTypography = styled(Typography)`
  font-size: 1.6rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
