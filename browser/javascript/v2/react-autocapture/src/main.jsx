import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeAnalytics } from './analytics.js';
import { App } from './App.jsx';
import './style.css';

// Initialize outside React so development Strict Mode doesn't initialize twice.
initializeAnalytics().then((analytics) => {
  createRoot(document.getElementById('root')).render(
    <StrictMode><App analytics={analytics} /></StrictMode>,
  );
});
