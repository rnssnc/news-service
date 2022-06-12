import React, { useCallback } from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navigation } from 'features/Navigation/Navigation';
import { Header } from 'features/Header/Header';

import { LandingPage } from 'pages/LandingPage/LandingPage';
import { FeedPage } from 'pages/FeedPage/FeedPage';
import { CategoryPage } from 'pages/CategoryPage/CategoryPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { NewsService } from 'services/NewsService';
import { openSignInWindow } from 'utils/helpers/OpenPopup';

import 'styles/variables.scss';
import 'normalize.css';
import './App.scss';

export const handleAuth = (e: MessageEvent) => {
  // Проверяем совпадают ли домены, 
  // т.к не управляем поведением пользователя в другом окне
  if (e.origin !== window.location.origin) {
    return;
  }

  NewsService.login(e.data).then(() => console.log(NewsService.getUserData()));
 }

export const App: React.FC = () => {
   return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header onAuthClick={() => openSignInWindow(NewsService.AUTH_URL, 'Auth Window', handleAuth)} />
          <main role="main" className="Main">
            <Navigation />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="feed" element={<FeedPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="category/:category" element={<CategoryPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
};
