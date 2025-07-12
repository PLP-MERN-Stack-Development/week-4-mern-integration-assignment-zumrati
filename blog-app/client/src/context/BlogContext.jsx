import { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchPosts, fetchCategories } from '../services/api';

const BlogContext = createContext();

const initialState = {
  posts: [],
  categories: [],
  loading: false,
  error: null,
};

function blogReducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_POSTS_SUCCESS':
      return { ...state, loading: false, posts: action.payload };
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, loading: false, categories: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
}

export function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  
  const getPosts = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await fetchPosts();
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message });
    }
  };
  
  const getCategories = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await fetchCategories();
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message });
    }
  };
  
  useEffect(() => {
    getPosts();
    getCategories();
  }, []);
  
  const value = {
    state,
    dispatch,
    getPosts,
    getCategories,
  };
  
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}