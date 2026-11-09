import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const { user } = useAuth();
  
  // Changes from array to an object with username as key
  const [savedArticlesByUser, setSavedArticlesByUser] = useState({});

  // New function to return current user's saved articles array
  const getUserSavedArticles = () => {
    if (!user || !user.username) return [];
    return savedArticlesByUser[user.username] || [];
  };

  const saveArticle = (article) => {
    if (!user || !user.username) return;
    
    const username = user.username;
    setSavedArticlesByUser(prev => {
      const userArticles = prev[username] || [];

      // Check if article is already saved for this user
      if (userArticles.some(a => a.url === article.url)) {
        return prev;
      }
      return {
        ...prev,
        [username]: [...userArticles, article]
      };
    });
  };

  const removeArticle = (url) => {
    if (!user || !user.username) return;

    const username = user.username;
    setSavedArticlesByUser(prev => {
      const userArticles = prev[username] || [];
      return {
        ...prev,
        [username]: userArticles.filter(a => a.url !== url)
      };
    });
  };

  const isArticleSaved = (url) => {
    const userArticles = getUserSavedArticles();
    return userArticles.some(a => a.url === url);
  };

  const getAllUserArticles = () => {
    return savedArticlesByUser;
  };

  return (
    <ArticlesContext.Provider 
      value={{ 
        getUserSavedArticles, 
        saveArticle, 
        removeArticle, 
        isArticleSaved,
        getAllUserArticles
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};