import React, { createContext, useContext, useState } from 'react';

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goalData, setGoalData] = useState({
    level: null,
    duration: null,
    dailyMinutes: null,
    time: null,
    days: [],
    language: null,
  });

  const updateGoal = updates => {
    setGoalData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetGoal = () => {
    setGoalData({
      level: null,
      duration: null,
      dailyMinutes: null,
      time: null,
      days: [],
      language: null,
    });
  };

  return (
    <GoalContext.Provider value={{ goalData, updateGoal, resetGoal }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoal = () => useContext(GoalContext);
