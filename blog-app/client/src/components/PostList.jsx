import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function PostList({ posts }) {
  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} md={6} lg={4} key={post._id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {post.category?.name}
              </Typography>
              <Typography variant="body2">{post.excerpt}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}