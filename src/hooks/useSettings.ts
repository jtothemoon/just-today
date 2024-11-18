// src/hooks/useSettings.ts
import { useState, useEffect } from 'react';
import { Settings } from '../types/settings';
import { STORAGE_KEY } from '../constants/storage';

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY.SETTINGS);
    return saved ? JSON.parse(saved) : { maxTodos: 10 };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
};