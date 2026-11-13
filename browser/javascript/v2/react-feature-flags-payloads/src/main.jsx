import React,{StrictMode} from 'react';import {createRoot} from 'react-dom/client';
import {App} from './App.jsx';import {initializeAnalytics} from './analytics.js';import './style.css';
initializeAnalytics().then(analytics=>createRoot(document.getElementById('root')).render(<StrictMode><App analytics={analytics}/></StrictMode>));
