import React from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AppRoutes } from './routes/AppRoutes.jsx';

export const App = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
