import { useState } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';

export default function ImageUpload({ onImageUpload }) {
  const [loading, setLoading] = useState(false);
  
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch('/api/posts/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      onImageUpload(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload"
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="image-upload">
        <Button variant="contained" component="span" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Upload Image'}
        </Button>
      </label>
    </Box>
  );
}