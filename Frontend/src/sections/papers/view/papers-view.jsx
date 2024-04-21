import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Page, Document } from 'react-pdf';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Search from '../search';
import FileUpload from './fileUpload';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function PapersView({ subjectCode }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [pyqsUploadedFiles, setPyqsUploadedFiles] = useState([]);
  const [notesUploadedFiles, setNotesUploadedFiles] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePyqsFileUpload = (file) => {
    // Assuming the file is uploaded successfully and you get a file URL
    const fileUrl = 'https://example.com/path/to/uploaded/file';
    setPyqsUploadedFiles([...pyqsUploadedFiles, { file, url: fileUrl }]);
  };

  const handleNotesFileUpload = (file) => {
    // Assuming the file is uploaded successfully and you get a file URL
    const fileUrl = 'https://example.com/path/to/uploaded/file';
    setNotesUploadedFiles([...notesUploadedFiles, { file, url: fileUrl }]);
  };
  const handleDelete = (panel, index) => {
    if (panel === 'pyqs') {
      setPyqsUploadedFiles(pyqsUploadedFiles.filter((_, i) => i !== index));
      // Optionally, send a request to the backend to delete the file from the database
    } else if (panel === 'notes') {
      setNotesUploadedFiles(notesUploadedFiles.filter((_, i) => i !== index));
      // Optionally, send a request to the backend to delete the file from the database
    }
  };

  return (
    <>
      <Search />
      <Box sx={{ width: '100%' }}>
        <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="PYQ" {...a11yProps(0)} />
            <Tab label="Notes" {...a11yProps(1)} />
            <Tab label="Links" {...a11yProps(2)} />
            <Tab label="Info" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          PYQS {subjectCode}
          <FileUpload onFileUpload={handlePyqsFileUpload} />
          <Grid container spacing={2}>
            {pyqsUploadedFiles.map((fileInfo, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  sx={{ marginTop: 2, padding: 2, border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <Typography variant="body2">{fileInfo.file.name}</Typography>
                  <Document file={fileInfo.url}>
                    <Page pageNumber={1} />
                  </Document>
                  <a href={fileInfo.url} download>
                    {/* Download */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-file-earmark-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                    </svg>
                  </a>
                  <Button onClick={() => handleDelete('pyqs', index)}>
                    {/* Delete */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Notes {subjectCode}
          <FileUpload onFileUpload={handleNotesFileUpload} />
          <Grid container spacing={2}>
            {notesUploadedFiles.map((fileInfo, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  sx={{ marginTop: 2, padding: 2, border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <Typography variant="body2">{fileInfo.file.name}</Typography>
                  <Document file={fileInfo.url}>
                    <Page pageNumber={1} />
                  </Document>
                  <a href={fileInfo.url} download>
                    {/* Download */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-file-earmark-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                    </svg>
                  </a>
                  <Button onClick={() => handleDelete('notes', index)}>
                    {/* Delete */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Links {subjectCode}
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Info {subjectCode}
        </TabPanel>
      </Box>
    </>
  );
}

PapersView.propTypes = {
  subjectCode: PropTypes.string.isRequired,
};
