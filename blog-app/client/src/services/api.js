import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Posts
export const fetchPosts = () => API.get('/posts');
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Categories
export const fetchCategories = () => API.get('/categories');
export const createCategory = (newCategory) => API.post('/categories', newCategory);

// Auth
export const login = (userData) => API.post('/users/login', userData);
export const register = (userData) => API.post('/users/register', userData);