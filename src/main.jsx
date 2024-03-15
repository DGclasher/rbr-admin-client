import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { AuthContextProvider } from './context/AuthContext.jsx'
import toast, { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
const queryClient = new QueryClient();
axios.defaults.baseURL = 'https://rbrcareers-seven.vercel.app';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <Toaster />
      <App />
    </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
