// Admin storage utility functions

export interface StorageItem {
  data: any;
  timestamp: string;
  version: string;
}

const STORAGE_VERSION = '1.0';

/**
 * Save data to localStorage with metadata
 */
export function saveToStorage(key: string, data: any): boolean {
  try {
    const storageItem: StorageItem = {
      data,
      timestamp: new Date().toISOString(),
      version: STORAGE_VERSION
    };

    localStorage.setItem(key, JSON.stringify(storageItem));
    localStorage.setItem(`${key}_updated`, storageItem.timestamp);
    
    // Create automatic backup
    const backupKey = `${key}_backup_${Date.now()}`;
    localStorage.setItem(backupKey, JSON.stringify(storageItem));
    
    // Keep only last 5 backups
    cleanupBackups(key);
    
    return true;
  } catch (error) {
    console.error('Failed to save to storage:', error);
    return false;
  }
}

/**
 * Load data from localStorage with validation
 */
export function loadFromStorage(key: string): any {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const storageItem: StorageItem = JSON.parse(stored);
    
    // Validate version compatibility
    if (storageItem.version !== STORAGE_VERSION) {
      console.warn(`Version mismatch for ${key}. Expected ${STORAGE_VERSION}, got ${storageItem.version}`);
    }

    return storageItem.data;
  } catch (error) {
    console.error('Failed to load from storage:', error);
    return null;
  }
}

/**
 * Get storage metadata
 */
export function getStorageInfo(key: string): { 
  exists: boolean;
  lastUpdated: string | null;
  size: number;
  version: string | null;
} {
  const stored = localStorage.getItem(key);
  const lastUpdated = localStorage.getItem(`${key}_updated`);
  
  let version: string | null = null;
  
  if (stored) {
    try {
      const storageItem: StorageItem = JSON.parse(stored);
      version = storageItem.version;
    } catch (error) {
      // Legacy data without version
    }
  }

  return {
    exists: !!stored,
    lastUpdated,
    size: stored ? Math.round(stored.length / 1024 * 100) / 100 : 0,
    version
  };
}

/**
 * Remove data from localStorage
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_updated`);
    
    // Remove all backups for this key
    const backupKeys = Object.keys(localStorage)
      .filter(k => k.startsWith(`${key}_backup_`));
    
    backupKeys.forEach(backupKey => {
      localStorage.removeItem(backupKey);
    });
    
    return true;
  } catch (error) {
    console.error('Failed to remove from storage:', error);
    return false;
  }
}

/**
 * Clean up old backups, keep only the latest 5
 */
function cleanupBackups(key: string): void {
  try {
    const backupKeys = Object.keys(localStorage)
      .filter(k => k.startsWith(`${key}_backup_`))
      .sort((a, b) => {
        const timestampA = parseInt(a.split('_').pop() || '0');
        const timestampB = parseInt(b.split('_').pop() || '0');
        return timestampB - timestampA; // Sort descending (newest first)
      });

    // Remove old backups, keep only latest 5
    if (backupKeys.length > 5) {
      backupKeys.slice(5).forEach(backupKey => {
        localStorage.removeItem(backupKey);
      });
    }
  } catch (error) {
    console.error('Failed to cleanup backups:', error);
  }
}

/**
 * Get all backup timestamps for a key
 */
export function getBackups(key: string): Array<{ key: string; timestamp: number }> {
  try {
    const backupKeys = Object.keys(localStorage)
      .filter(k => k.startsWith(`${key}_backup_`))
      .map(k => ({
        key: k,
        timestamp: parseInt(k.split('_').pop() || '0')
      }))
      .sort((a, b) => b.timestamp - a.timestamp);

    return backupKeys;
  } catch (error) {
    console.error('Failed to get backups:', error);
    return [];
  }
}

/**
 * Restore from backup
 */
export function restoreFromBackup(backupKey: string, targetKey: string): boolean {
  try {
    const backupData = localStorage.getItem(backupKey);
    if (!backupData) return false;

    localStorage.setItem(targetKey, backupData);
    
    // Update timestamp
    const storageItem: StorageItem = JSON.parse(backupData);
    localStorage.setItem(`${targetKey}_updated`, new Date().toISOString());
    
    return true;
  } catch (error) {
    console.error('Failed to restore from backup:', error);
    return false;
  }
}

/**
 * Export all admin data
 */
export function exportAllData(): string {
  const exportData: Record<string, any> = {
    export_timestamp: new Date().toISOString(),
    export_version: STORAGE_VERSION,
    data: {}
  };

  const adminKeys = [
    'hero_content',
    'products_content', 
    'services_content',
    'company_info',
    'images_content'
  ];

  adminKeys.forEach(key => {
    const info = getStorageInfo(key);
    if (info.exists) {
      exportData.data[key] = {
        content: loadFromStorage(key),
        metadata: info
      };
    }
  });

  return JSON.stringify(exportData, null, 2);
}

/**
 * Import data from export
 */
export function importData(jsonData: string): { success: boolean; message: string; importedCount: number } {
  try {
    const importData = JSON.parse(jsonData);
    
    if (!importData.export_version || !importData.data) {
      return {
        success: false,
        message: '�H��e��<',
        importedCount: 0
      };
    }

    let importedCount = 0;
    
    Object.keys(importData.data).forEach(key => {
      const itemData = importData.data[key];
      if (itemData.content) {
        if (saveToStorage(key, itemData.content)) {
          importedCount++;
        }
      }
    });

    return {
      success: true,
      message: `��e ${importedCount} ypn`,
      importedCount
    };
  } catch (error) {
    return {
      success: false,
      message: '�e1%' + (error as Error).message,
      importedCount: 0
    };
  }
}