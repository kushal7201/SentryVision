import * as React from "react";
// import { alpha } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; // Import Grid
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Highlights() {
  return (
    <Box id="highlights">
      <Container
        sx={{
          pt: { xs: 2, sm: 2 },
          pb: { xs: 2, sm: 2 },
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h1"
              sx={{
                pt: 0,
                pb: { xs: 2, sm: 2 },
                fontSize: "clamp(2.5rem, 7vw, 3rem)",
                textAlign: { xs: "center", sm: "start" },
                fontFamily: "Arial, sans-serif",
                color: "#091553",
              }}
            >
              Why SentryVision?
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                pb: { xs: 2, sm: 0 },
                textAlign: { xs: "start", sm: "start" },
                fontSize: "clamp(1.7rem, 1vw, 1rem)",
              }}
            >
              <ul>
                <li> Real-time Anomaly Detection</li>
                <li> Instant Email Notifications</li>
                <li> Video Footage and Timestamp Recording</li>
                <li> Seamless Integration </li>
                <li> Expert Team </li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
            <Grid
              item
              xs={12}
              sm={12}
              mb={2}
              sx={{
                textAlign: "center",
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              Ready to Dive In?
            </Grid>
            
              <Link to="/sign-in" style={{ textDecoration: "none" }}>
                <Button variant="contained"
              color="primary"
              sx={{
                fontSize: "1.3rem",
                width: { xs: "100%", sm: "13rem" },
                height: { xs: "100%", sm: "3rem" },
              }}>
                  Get Started
                </Button>
              </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
