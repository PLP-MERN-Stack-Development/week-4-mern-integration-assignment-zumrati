import { useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import PostList from '../components/PostList';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

export default function HomePage() {
  const { state, getPosts } = useBlog();
  const { posts, loading, error } = state;
  
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  
  if (loading) return <Spinner />;
  if (error) return <Alert severity="error">{error}</Alert>;
  
  return <PostList posts={posts} />;
}