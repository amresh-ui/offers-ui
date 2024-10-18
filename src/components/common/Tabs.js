import React from "react";
import { TabsProvider, useTabs } from "./TabsContext";

const TabsContainer = ({ defaultValue, value, onChange, children }) => {
  return (
    <TabsProvider defaultValue={defaultValue} value={value} onChange={onChange}>
      <div>{children}</div>
    </TabsProvider>
  );
};

const TabsList = ({ className, children }) => {
  return (
    <div className={`flex gap-1 bg-transparent overflow-auto scrollbar-hide ${className}`}>
      {children}
    </div>
  );
};

const TabsItem = ({ value, children, onClick, className }) => {
  const { selectedTab, handleTabChange } = useTabs();
  const isActive = selectedTab === value;

  const handleClick = () => {
    if (onClick) onClick();
    handleTabChange(value);
  };

  return (
    <button
      className={`px-3 py-2 font-public font-semibold flex-shrink-0 text-sm rounded-md ${
        isActive ? "bg-utility-brand-50 text-tertiary" :  "bg-secondary text-quaternary"
      } ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const TabsPanel = ({ value, children, className }) => {
  const { selectedTab } = useTabs();  
  return selectedTab === value ? (
    <div className={`${className}`}>{children}</div>
  ) : null;
};

const Tabs = {
  Container: TabsContainer,
  List: TabsList,
  Item: TabsItem,
  Panel: TabsPanel,
};

export default Tabs;
