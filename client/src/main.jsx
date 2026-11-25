import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Self-hosted variable Manrope (one file, weights 200–800) — preloaded by scripts/seo-build.mjs
import '@fontsource-variable/manrope/wght.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
