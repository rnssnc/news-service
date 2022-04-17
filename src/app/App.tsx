import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navigation } from 'features/Navigation/Navigation';

import { Header } from 'features/Header/Header';

import { LandingPage } from 'pages/Landing/Landing';
import { FeedPage } from 'pages/Feed/Feed';

import './App.scss';
import { CategoryPage } from 'pages/CategoryPage/CategoryPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <main role="main" className="App">
          {/* <Footer />
        <LoginModal /> */}
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="category/:category" element={<CategoryPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
