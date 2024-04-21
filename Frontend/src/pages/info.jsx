import React from 'react';
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async';

export function Card({ heading, detail }){
  return (
    <div className='card'>
      <h5>{heading}</h5>
      <p>{detail}</p>
    </div>
  );

}

Card.propTypes = {
  heading: PropTypes.string.isRequired, // Specify that heading is a required string
  detail: PropTypes.string, // Specify that detail is a required string
 };

export default function InfoPage() {
  return (
    <>
      <Helmet>
        <title> Info | SentryVision </title>
      </Helmet>

      <div className="about-us-div">
      {/* <h1>SentryVision</h1> */}
      <h2 className='info-heading'>Empowering Public Safety through AI-Driven Innovation</h2>

      <h3>About</h3>
      <p>
        SentryVision is an innovative real-time video anomaly detection system designed to enhance security and safety in public spaces. Leveraging advanced Artificial Intelligence (AI) and Machine Learning (ML) technologies, SentryVision identifies various anomalies such as fights, road accidents, and explosions, ensuring immediate notification to end-users through email alerts.
      </p>

      <h3>Key Features</h3>
      <div className='cards-display'>

      <Card heading="Real-time Anomaly Detection" detail="SentryVision utilizes cutting-edge AI and ML algorithms to identify and analyze anomalies in real-time, ensuring prompt response to potential threats." />
      <Card heading="Instant Email Notifications" detail="In the event of an anomaly detection, SentryVision sends immediate email notifications to registered users, providing them with crucial information and video evidence of the incident." />
      <Card heading="Video Footage and Timestamp Recording" detail="Video Footage and Timestamp Recording: SentryVision records the detected video footage along with timestamps, enabling users to review incidents, assess potential risks, and take necessary actions." />
      </div>

      <h3>Tech Stack</h3>
      <ul>
        <li>Flask</li>
        <li>React JS</li>
        <li>Vite JS</li>
        <li>TensorFlow</li>
      </ul>

      <h4>Contact Us</h4>
      <p>If you have any questions or need assistance with SentryVision, please contact us at <a href='mailto:sentryvision112@gmail.com'>email</a>. We are always happy to help!</p>
    </div>
    </>
  );
}
