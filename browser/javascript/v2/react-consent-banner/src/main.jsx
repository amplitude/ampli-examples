import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { createConsentController, readChoice, writeChoice } from './consent.js';
import './style.css';

const configured = Boolean(import.meta.env.VITE_AMPLITUDE_API_KEY?.trim());
const controller = createConsentController({
  initialChoice: configured ? readChoice(localStorage) : 'denied',
  persist: (choice) => writeChoice(localStorage, choice),
  loadClient: async () => (await import('./analytics-client.js')).client,
});
createRoot(document.getElementById('root')).render(<StrictMode><App controller={controller} configured={configured} /></StrictMode>);
if (configured) void controller.restore();
