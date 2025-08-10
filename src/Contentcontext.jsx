// src/Contentcontext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import contentData from "./data/Content.json"; // make sure this path is correct

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    setContent(contentData);
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
