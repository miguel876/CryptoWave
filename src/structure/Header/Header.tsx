import React, { useState } from 'react'
import { StyledFlexContainer, StyledHeader, StyledHeaderContainer } from './header.styles';
import { Box, Container, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from 'assets/logo-color.svg';
import CoinSearch from 'components/coin-search';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <StyledHeader>
      <Container>
        <StyledHeaderContainer>
          <img src={logo} alt="Image Logo" width="200" />
          <StyledFlexContainer>
            <CoinSearch />
            <IconButton aria-label="menu-icon" onClick={() => setOpen(true)}><MenuIcon fontSize='large' /></IconButton>
          </StyledFlexContainer>
        </StyledHeaderContainer>
        <Drawer
          anchor={'right'}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box sx={{ width: 250 }}>
            <List>
              <ListItemButton>
                <ListItem>
                  <Typography>Menu 1</Typography>
                </ListItem>
              </ListItemButton>
              <ListItemButton>
                <ListItem>
                  <Typography>Menu 2</Typography>
                </ListItem>
              </ListItemButton>
              <ListItemButton>
                <ListItem>
                  <Typography>Menu 3</Typography>
                </ListItem>
              </ListItemButton>
            </List>
            
          </Box>
        </Drawer>
      </Container>
    </StyledHeader>
  )
}
