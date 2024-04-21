import * as React from "react";
import { Github, EnvelopeAtFill } from 'react-bootstrap-icons';

import Box from "@mui/material/Box"
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
// import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import FacebookIcon from "@mui/icons-material/Facebook";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// import SvgColor from 'src/components/svg-color';

// const logoStyle = {
//   width: "140px",
//   height: "auto",
//   cursor: "pointer",
// };

// const icon = (name) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

function Copyright() {

  return (
    <Typography variant="body2" color="white" mt={1} textAlign="center">
      {"Copyright © "}
      <Link href="#" color="white">
      {"SetryVision "}
      </Link>
      {new Date().getFullYear()}
      <Typography display="inline" color="white" sx={{ mx: 0.5, opacity: 0.5 }}>
        &nbsp;•&nbsp;
      </Typography>
      <Link color="white" href="#">
        <strong>Home</strong>
      </Link>
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#262626',
        pt: { xs: 5, sm: 6 },
        pb: { xs: 2, sm: 2 },
        px: { xs: 2, sm: 4 },
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        {/* Logo */}
        <Grid className="gridtag" item xs={12} sm={6} textAlign="center">
          <img className="logo"
            src="assets/logo.jpg"
            alt="logo of SentryVision"
          />
          <h3>
            <Typography variant="body1" color="white" sx={{ mt: 3, ml: 3, fontSize: '1.5rem' }}>
              SentryVision
            </Typography>
          </h3>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12} sm={6} >
          <Stack direction="column" spacing={1} alignItems="center">
            <Typography variant="body1" color="white" sx={{ mb: 1, fontSize: '1.4rem' }}>
              Contact Us On
            </Typography>

            <Stack direction={{ xs: 'row', sm: 'row' }} spacing={1}>
              {/* <Linkedin href="" color="royalblue" size={30} /> */}
              <a href="https://github.com/kushal7201/SentryVision" target="_blank" rel="noopener noreferrer">
                <Github color="royalblue" size={30} />
              </a>
              <a href="mailto:sentryvision112@gmail.com" target="_blank" rel="noopener noreferrer">
                <EnvelopeAtFill color="royalblue" size={30} />
              </a>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      {/* Copyright Text */}
      <Grid item xs={12} sm={4} textAlign="center" sx={{ mt: 'auto' }}>
        <Copyright />
      </Grid>
    </Box>
  );
}
