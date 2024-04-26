import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// import SvgColor from 'src/components/svg-color';

// import MenuIcon from "@mui/icons-material/Menu";

import ToggleColorMode from './ToggleColorMode';


// import Signin from "../signin/Signin";

// const logoStyle = {
//   width: '140px',
//   height: 'auto',
//   cursor: 'pointer',
// };

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  // const icon = (name) => (
  //   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // );


  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              {/* <img
                src={
                  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                }
                style={logoStyle}
                alt="logo of SentryVision"
              /> */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem onClick={() => scrollToTop()} sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="h6" color="text.primary">
                    Home
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection('aboutUs')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="h6" color="text.primary">
                    About us
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection('features')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="h6" color="text.primary">
                    Features
                  </Typography>
                </MenuItem>

                <MenuItem onClick={() => scrollToSection('faq')} sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="h6" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                <Button color="primary" variant="text" size="small">
                  <Typography variant="h6">Sign in</Typography>
                </Button>
              </Link>

              <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                <Button color="primary" variant="contained" size="small">
                  <Typography variant="h6">Sign Up</Typography>
                </Button>
              </Link>
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                {/* <MenuIcon /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToTop()}>
                    <Typography variant="h6">Home</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('features')}>
                    <Typography variant="h6">Features</Typography>
                  </MenuItem>

                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    <Typography variant="h6">Highlights</Typography>
                  </MenuItem>

                  <MenuItem onClick={() => scrollToSection('faq')}>
                    <Typography variant="h6">FAQ</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/sign-up"
                      sx={{ width: '100%' }}
                    >
                      <Typography variant="h6">Sign up</Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/sign-in"
                      sx={{ width: '100%' }}
                    >
                      <Typography variant="h6">Sign in</Typography>
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.string.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;