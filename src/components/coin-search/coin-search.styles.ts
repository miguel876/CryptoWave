import { Autocomplete, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import theme from 'theme/theme';

export const StyledAutoComplete = styled(Autocomplete)`
  width: 20rem;
`;

export const StyledLink = styled(Link)`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 1rem;
  color: ${theme.palette.primary.main};
  transition: all 0.2 ease;
  text-decoration: none;

  &:hover {
    background-color: ${theme.palette.primary.light};
  }

  & > span {
    font-size: 0.6rem;
    font-weight: 600;
  }
`;
