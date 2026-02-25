import fs from 'fs';
import path from 'path';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src/data/site-content.json');
const BACKUP_DIR = path.join(process.cwd(), 'src/data/backups');

export interface SiteContent {
  hero: any;
  stats: any[];
  products: any[];
  services: any[];
  company: any;
  metadata: {
    lastUpdated: string;
    version: string;
  };
}

// 确保备份目录存在
function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

// 读取网站内容
export async function getContent(): Promise<SiteContent> {
  try {
    const content = fs.readFileSync(CONTENT_FILE_PATH, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading content file:', error);
    throw new Error('Failed to load content');
  }
}

// 保存网站内容
export async function saveContent(content: SiteContent): Promise<void> {
  try {
    // 创建备份
    await createBackup();
    
    // 更新元数据
    content.metadata = {
      lastUpdated: new Date().toISOString(),
      version: content.metadata?.version || '1.0.0'
    };
    
    // 保存新内容
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving content:', error);
    throw new Error('Failed to save content');
  }
}

// 创建备份
export async function createBackup(): Promise<string> {
  try {
    ensureBackupDir();
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${timestamp}.json`;
    const backupPath = path.join(BACKUP_DIR, backupFileName);
    
    const currentContent = await getContent();
    fs.writeFileSync(backupPath, JSON.stringify(currentContent, null, 2), 'utf8');
    
    // 清理旧备份（保留最近10个）
    cleanOldBackups();
    
    return backupFileName;
  } catch (error) {
    console.error('Error creating backup:', error);
    throw new Error('Failed to create backup');
  }
}

// 清理旧备份
function cleanOldBackups() {
  try {
    const files = fs.readdirSync(BACKUP_DIR);
    const backupFiles = files.filter(f => f.startsWith('backup-')).sort().reverse();
    
    // 保留最近10个备份
    if (backupFiles.length > 10) {
      for (let i = 10; i < backupFiles.length; i++) {
        fs.unlinkSync(path.join(BACKUP_DIR, backupFiles[i]));
      }
    }
  } catch (error) {
    console.error('Error cleaning old backups:', error);
  }
}

// 获取备份列表
export async function getBackups(): Promise<string[]> {
  try {
    ensureBackupDir();
    const files = fs.readdirSync(BACKUP_DIR);
    return files.filter(f => f.startsWith('backup-')).sort().reverse();
  } catch (error) {
    console.error('Error getting backups:', error);
    return [];
  }
}

// 恢复备份
export async function restoreBackup(backupFileName: string): Promise<void> {
  try {
    const backupPath = path.join(BACKUP_DIR, backupFileName);
    if (!fs.existsSync(backupPath)) {
      throw new Error('Backup file not found');
    }
    
    // 先备份当前内容
    await createBackup();
    
    // 恢复备份
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    fs.writeFileSync(CONTENT_FILE_PATH, backupContent, 'utf8');
  } catch (error) {
    console.error('Error restoring backup:', error);
    throw new Error('Failed to restore backup');
  }
}

// 更新特定部分的内容
export async function updateSection(section: string, data: any): Promise<void> {
  try {
    const content = await getContent();
    
    if (section in content) {
      (content as any)[section] = data;
      await saveContent(content);
    } else {
      throw new Error(`Section ${section} not found`);
    }
  } catch (error) {
    console.error('Error updating section:', error);
    throw new Error('Failed to update section');
  }
}

// 添加产品
export async function addProduct(product: any): Promise<void> {
  try {
    const content = await getContent();
    content.products.push(product);
    await saveContent(content);
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Failed to add product');
  }
}

// 更新产品
export async function updateProduct(productId: string, product: any): Promise<void> {
  try {
    const content = await getContent();
    const index = content.products.findIndex(p => p.id === productId);
    if (index !== -1) {
      content.products[index] = product;
      await saveContent(content);
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

// 删除产品
export async function deleteProduct(productId: string): Promise<void> {
  try {
    const content = await getContent();
    content.products = content.products.filter(p => p.id !== productId);
    await saveContent(content);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}