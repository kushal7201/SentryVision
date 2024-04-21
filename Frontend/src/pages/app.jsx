import React from 'react';
import { Helmet } from 'react-helmet-async';

import Anomaly from 'src/layouts/dashboard/anomaly';

import './appPage.css';
 
export default function AppPage() {
  return (
    <>  
      <Helmet>
        <title> Dashboard | SentryVision </title>
      </Helmet>
      <div className="app-page-container">
        <Anomaly/>
      </div>
    </>
  );
}
