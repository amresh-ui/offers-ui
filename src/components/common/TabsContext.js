import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export const useTabs = () => useContext(TabsContext);

export const TabsProvider = ({ defaultValue, value, onChange, children }) => {
  const [selectedTab, setSelectedTab] = useState(value || defaultValue);

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
    if (onChange) {
      onChange(newTab);
    }
  };

  return (
    <TabsContext.Provider value={{ selectedTab, handleTabChange }}>
      {children}
    </TabsContext.Provider>
  );
};
