import { useState, useRef, useEffect } from 'react';
import { Button, Container, Typography, Box, Input, InputLabel, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const useStyles = () => ({
  inputContainer: {
    marginBottom: 2,
  },
  button: {
    marginBottom: 2,
  },
  videoPreview: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    marginTop: 2,
  },
});

const App = () => {
  const classes = useStyles();
  const [videoFile, setVideoFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const videoRef = useRef(null);

  // useEffect(() => {
  //   // Ensure the component is mounted before trying to update the videoRef
  //   if (showPreview && videoRef.current) {
  //     videoRef.current.src = URL.createObjectURL(videoFile);
  //     videoRef.current.play();
  //   }
  // }, [showPreview, videoFile]);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert('Please choose a video file.');
      return;
    }

    // Prepare FormData to send the file to the Flask backend
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      // Send the video file to the Flask backend
      const response = await fetch('http://localhost:5000/video_stream', {
        method: 'POST',
        body: formData,
      });

      // Handle the processed video file
      if (response.ok) {
        setShowPreview(true);
      } else {
        console.error('Error processing video:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting video:', error);
    }
  };

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" align="center" gutterBottom>
              Video Processing App
            </Typography>
            <Box className={classes.inputContainer}>
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                id="fileInput"
                style={{ display: 'none' }}
              />
              <InputLabel htmlFor="fileInput">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Choose Video
                </Button>
              </InputLabel>
            </Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
              className={classes.button}
            >
              Submit Video
            </Button>
            {/* Display processed video here */}
            {showPreview && (
                    <Grid item xs={9}>
                    <Container>
                      <iframe
                        width="515"
                        height="520"
                        src={'http://127.0.0.1:5000/video_feed'}
                        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                        framerate="2"
                        allowFullScreen>
                      </iframe>
                    </Container>
                </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
