import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import MyProfileDoc from './pages/MyProfileDoc';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Home />)} />
                <Route path="/signup" element={(<Signup />)} />
                <Route path="/login" element={(<Login />)} />
                <Route path="/myprofile" element={(<MyProfile />)} />
                <Route path="/myprofiledoc" element={(<MyProfileDoc />)} />

              </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
