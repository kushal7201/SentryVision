import * as React from "react";
import PropTypes from 'prop-types'

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export function LandingCard({ heading, detail }){
  return (
    <div className='card'>
      <h5>{heading}</h5>
      <p className="details">{detail}</p>
    </div>
  );

}

LandingCard.propTypes = {
  heading: PropTypes.string.isRequired, // Specify that heading is a required string
  detail: PropTypes.string, // Specify that detail is a required string
 };

export default function Features() {
  return (
    <Container id="features" sx={{ py: { xs: 2, sm: 2 } }}>
      {/* About Us Section */}
      <Box sx={{ textAlign: { xs: "center", sm: "start" }, mb: 6 }}>
        <Typography variant="h2" component="div" gutterBottom color="#091553">
          <strong>About Us</strong>
          <hr />
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            pb: { xs: 2, sm: 0 },
            textAlign: { xs: "center", sm: "start" },
            fontSize: "clamp(1.3rem, 1vw, 1rem)",
          }}
        >
          {`At SentryVision, we're dedicated to revolutionizing the way we perceive 
          and ensure safety in our communities. Our innovative, AI-powered video 
          anomaly detection system has been meticulously designed to keep you 
          informed and secure in an ever-evolving world..`}{" "}
        </Typography>
      </Box>

      {/* How It Works Section */}
      <Box>
        <Typography
          variant="h2"
          component="div"
          gutterBottom
          color="#091553"
          sx={{
            pt: { xs: 2, sm: 6 },
          }}
        >
          <strong>Key Features</strong>
          <div className='cards-display'>

            <LandingCard heading="Real-time Anomaly Detection" detail="SentryVision utilizes cutting-edge AI and ML algorithms to identify and analyze anomalies in real-time, ensuring prompt response to potential threats." />
            <LandingCard heading="Instant Email Notifications" detail="In the event of an anomaly detection, SentryVision sends immediate email notifications to registered users, providing them with crucial information and video evidence of the incident." />
            <LandingCard heading="Video Footage and Timestamp Recording" detail="Video Footage and Timestamp Recording: SentryVision records the detected video footage along with timestamps, enabling users to review incidents, assess potential risks, and take necessary actions." />
          </div>
        </Typography>
        
      </Box>
    </Container>
  );
}
