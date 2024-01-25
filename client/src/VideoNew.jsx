import React, { useState } from 'react';
import { Button, CircularProgress, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '1rem',
});

const StyledPaper = styled(Paper)({
  padding: '4rem',
  maxWidth: '600px',
  margin: 'auto',
  textAlign: 'center',
});

const StyledInput = styled('input')({
  display: 'none',
});

const VideoNew = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const processVideo = async () => {
    if (!selectedFile) {
      setError('Please select a video file.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('resolution', '720p');
    formData.append('bitrate', '1000k');
    formData.append('codec', 'h264');
    formData.append('fps', '30');

    try {
      const response = await axios.post('/videos/processVideo', formData, {
        responseType: 'blob',
      });

      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);

      setProcessedVideoUrl(videoUrl);
    } catch (error) {
      console.error('Error processing video:', error);
      setError('Error processing video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Video Upload and Processing
        </Typography>
        <label htmlFor="fileInput">
          <StyledInput
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept="video/*"
          />
          <Button variant="contained" component="span" margin='2px'>
            Select Video
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          onClick={processVideo}
          disabled={loading || !selectedFile}
          style={{ marginTop: '1rem' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Adjust Quality'}
        </Button>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        {processedVideoUrl && (
          <div style={{ marginTop: '2rem' }}>
            <Typography variant="subtitle1" gutterBottom>
              Processed Video:
            </Typography>
            <video controls width="600">
              <source src={processedVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </StyledPaper>
    </StyledContainer>
  );
};

export default VideoNew;
