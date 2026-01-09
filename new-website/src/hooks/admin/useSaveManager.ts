import { useState, useCallback } from 'react';

interface SaveOptions {
  autoSave?: boolean;
  autoSaveDelay?: number;
  showSuccessMessage?: boolean;
  successMessageDuration?: number;
}

interface SaveState {
  isSaving: boolean;
  saveMessage: string;
  hasUnsavedChanges: boolean;
  lastSaved: string | null;
}

export function useSaveManager(
  storageKey: string,
  options: SaveOptions = {}
) {
  const {
    autoSave = false,
    autoSaveDelay = 2000,
    showSuccessMessage = true,
    successMessageDuration = 3000
  } = options;

  const [saveState, setSaveState] = useState<SaveState>({
    isSaving: false,
    saveMessage: '',
    hasUnsavedChanges: false,
    lastSaved: null
  });

  const saveData = useCallback(async (data: any): Promise<boolean> => {
    setSaveState(prev => ({ ...prev, isSaving: true, saveMessage: '' }));

    try {
      // Simulate async save operation
      await new Promise(resolve => setTimeout(resolve, 500));

      // Save to localStorage
      localStorage.setItem(storageKey, JSON.stringify(data));
      localStorage.setItem(`${storageKey}_updated`, new Date().toISOString());

      setSaveState(prev => ({
        ...prev,
        isSaving: false,
        saveMessage: showSuccessMessage ? 'ÝXŸ' : '',
        hasUnsavedChanges: false,
        lastSaved: new Date().toISOString()
      }));

      // Clear success message after duration
      if (showSuccessMessage) {
        setTimeout(() => {
          setSaveState(prev => ({ ...prev, saveMessage: '' }));
        }, successMessageDuration);
      }

      return true;
    } catch (error) {
      setSaveState(prev => ({
        ...prev,
        isSaving: false,
        saveMessage: 'ÝX1%' + (error as Error).message
      }));

      setTimeout(() => {
        setSaveState(prev => ({ ...prev, saveMessage: '' }));
      }, successMessageDuration);

      return false;
    }
  }, [storageKey, showSuccessMessage, successMessageDuration]);

  const markAsChanged = useCallback(() => {
    setSaveState(prev => ({ ...prev, hasUnsavedChanges: true }));
  }, []);

  const loadData = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      const lastSaved = localStorage.getItem(`${storageKey}_updated`);
      
      if (saved) {
        setSaveState(prev => ({
          ...prev,
          lastSaved: lastSaved || null,
          hasUnsavedChanges: false
        }));
        return JSON.parse(saved);
      }
      return null;
    } catch (error) {
      console.error('Failed to load data:', error);
      return null;
    }
  }, [storageKey]);

  const clearSaveMessage = useCallback(() => {
    setSaveState(prev => ({ ...prev, saveMessage: '' }));
  }, []);

  const resetSaveState = useCallback(() => {
    setSaveState({
      isSaving: false,
      saveMessage: '',
      hasUnsavedChanges: false,
      lastSaved: null
    });
  }, []);

  return {
    saveState,
    saveData,
    loadData,
    markAsChanged,
    clearSaveMessage,
    resetSaveState
  };
}