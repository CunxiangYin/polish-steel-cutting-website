'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logAdminAction, getAdminLogs, clearAdminLogs, AdminLogEntry } from '@/lib/admin/client-auth';
import { getContent, saveContent } from '@/lib/admin/api';

interface DataStats {
  products: number;
  hero: boolean;
  about: boolean;
  services: boolean;
  lastBackup: string | null;
  totalStorageUsed: string;
}

interface Backup {
  id: string;
  timestamp: string;
  size: string;
  data: string;
}

const STORAGE_KEYS = [
  'products_content',
  'hero_content',
  'about_content',
  'services_content',
  'site_settings',
];

const BACKUP_KEY = 'admin_backups';

export default function DataManager() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DataStats | null>(null);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [logs, setLogs] = useState<AdminLogEntry[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState<string | null>(null);
  const [logSearchTerm, setLogSearchTerm] = useState('');
  const [logFilterAction, setLogFilterAction] = useState('');
  const [logFilterDateRange, setLogFilterDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [backupSearchDate, setBackupSearchDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadData();
    setIsLoading(false);
  }, [router]);

  const loadData = async () => {
    // Load stats from API
    const products = await getContent<unknown[]>('products');
    const hero = await getContent('hero');
    const about = await getContent('about');
    const services = await getContent('services');

    const savedBackups = localStorage.getItem(BACKUP_KEY);
    const backupList = savedBackups ? JSON.parse(savedBackups) : [];

    setStats({
      products: products?.length || 0,
      hero: !!hero,
      about: !!about,
      services: !!services,
      lastBackup: backupList.length > 0 ? backupList[0].timestamp : null,
      totalStorageUsed: '云端存储',
    });

    setBackups(backupList);
    setLogs(getAdminLogs());
  };

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const exportAllData = async () => {
    try {
      const exportData: Record<string, any> = {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        data: {},
      };

      const contentTypes = ['products', 'services', 'hero', 'about', 'images'];
      for (const type of contentTypes) {
        const data = await getContent(type);
        if (data) exportData.data[type] = data;
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `punaise-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      logAdminAction('export_data', { keys: STORAGE_KEYS.length });
      setMessage({ type: 'success', text: '数据导出成功！' });
    } catch (error) {
      setMessage({ type: 'error', text: '导出失败，请重试' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);

        if (!importedData.data) {
          throw new Error('Invalid backup format');
        }

        // Create backup before import
        createBackup();

        // Import data via API
        const validTypes = ['products', 'services', 'hero', 'about', 'images'];
        for (const [key, value] of Object.entries(importedData.data)) {
          // Support both old localStorage keys (e.g. products_content) and new type names
          const type = key.replace('_content', '');
          if (validTypes.includes(type)) {
            await saveContent(type, value);
          }
        }

        logAdminAction('import_data', {
          keysImported: Object.keys(importedData.data).length,
          sourceDate: importedData.exportedAt
        });
        setMessage({ type: 'success', text: '数据导入成功！页面将刷新...' });
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        setMessage({ type: 'error', text: '导入失败：文件格式无效' });
        setTimeout(() => setMessage(null), 3000);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const createBackup = async () => {
    try {
      const backupData: Record<string, any> = {};
      const contentTypes = ['products', 'services', 'hero', 'about', 'images'];
      for (const type of contentTypes) {
        const data = await getContent(type);
        if (data) backupData[type] = JSON.stringify(data);
      }

      const backup: Backup = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        size: formatBytes(JSON.stringify(backupData).length * 2),
        data: JSON.stringify(backupData),
      };

      const newBackups = [backup, ...backups.slice(0, 9)]; // Keep last 10
      setBackups(newBackups);
      localStorage.setItem(BACKUP_KEY, JSON.stringify(newBackups));

      logAdminAction('create_backup', { backupId: backup.id });
      setMessage({ type: 'success', text: '备份创建成功！' });
      loadData();
    } catch (error) {
      setMessage({ type: 'error', text: '备份创建失败' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const restoreBackup = async (backupId: string) => {
    try {
      const backup = backups.find(b => b.id === backupId);
      if (!backup) throw new Error('Backup not found');

      // Create backup before restore
      await createBackup();

      const backupData = JSON.parse(backup.data);
      const validTypes = ['products', 'services', 'hero', 'about', 'images'];
      for (const [key, value] of Object.entries(backupData)) {
        const type = key.replace('_content', '');
        if (validTypes.includes(type)) {
          await saveContent(type, JSON.parse(value as string));
        }
      }

      logAdminAction('restore_backup', { backupId });
      setMessage({ type: 'success', text: '备份恢复成功！页面将刷新...' });
      setShowRestoreConfirm(null);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({ type: 'error', text: '恢复失败' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const deleteBackup = (backupId: string) => {
    const newBackups = backups.filter(b => b.id !== backupId);
    setBackups(newBackups);
    localStorage.setItem(BACKUP_KEY, JSON.stringify(newBackups));
    logAdminAction('delete_backup', { backupId });
    setMessage({ type: 'info', text: '备份已删除' });
    setTimeout(() => setMessage(null), 3000);
  };

  const clearAllData = async () => {
    try {
      // Create backup first
      await createBackup();

      // Clear all content types via API (save empty)
      const contentTypes = ['products', 'services', 'hero', 'about', 'images'];
      for (const type of contentTypes) {
        await saveContent(type, null);
      }

      logAdminAction('clear_all_data', {});
      setMessage({ type: 'success', text: '数据已清空！页面将刷新...' });
      setShowClearConfirm(false);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({ type: 'error', text: '清空失败' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleClearLogs = () => {
    clearAdminLogs();
    setLogs([]);
    setMessage({ type: 'info', text: '操作日志已清空' });
    setTimeout(() => setMessage(null), 3000);
  };

  const ACTION_TYPES = [
    { value: 'login', label: '登录系统' },
    { value: 'logout', label: '退出系统' },
    { value: 'save_products', label: '保存产品' },
    { value: 'add_product', label: '添加产品' },
    { value: 'delete_product', label: '删除产品' },
    { value: 'duplicate_product', label: '复制产品' },
    { value: 'save_services', label: '保存服务' },
    { value: 'add_service', label: '添加服务' },
    { value: 'delete_service', label: '删除服务' },
    { value: 'duplicate_service', label: '复制服务' },
    { value: 'save_about', label: '保存公司信息' },
    { value: 'save_hero', label: '保存首页内容' },
    { value: 'save_images', label: '保存图片' },
    { value: 'add_image', label: '添加图片' },
    { value: 'update_image', label: '更新图片' },
    { value: 'delete_image', label: '删除图片' },
    { value: 'export_data', label: '导出数据' },
    { value: 'import_data', label: '导入数据' },
    { value: 'create_backup', label: '创建备份' },
    { value: 'restore_backup', label: '恢复备份' },
    { value: 'delete_backup', label: '删除备份' },
    { value: 'clear_all_data', label: '清空数据' },
  ];

  const formatLogAction = (action: string): string => {
    const found = ACTION_TYPES.find(a => a.value === action);
    return found ? found.label : action;
  };

  // Filter logs
  const filteredLogs = logs.filter(log => {
    // Search term filter
    const searchLower = logSearchTerm.toLowerCase();
    const matchesSearch = logSearchTerm === '' ||
      formatLogAction(log.action).toLowerCase().includes(searchLower) ||
      log.username.toLowerCase().includes(searchLower) ||
      JSON.stringify(log.details).toLowerCase().includes(searchLower);

    // Action type filter
    const matchesAction = logFilterAction === '' || log.action === logFilterAction;

    // Date range filter
    let matchesDateRange = true;
    if (logFilterDateRange !== 'all') {
      const logDate = new Date(log.timestamp);
      const now = new Date();
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (logFilterDateRange === 'today') {
        matchesDateRange = logDate >= dayStart;
      } else if (logFilterDateRange === 'week') {
        const weekStart = new Date(dayStart);
        weekStart.setDate(weekStart.getDate() - 7);
        matchesDateRange = logDate >= weekStart;
      } else if (logFilterDateRange === 'month') {
        const monthStart = new Date(dayStart);
        monthStart.setMonth(monthStart.getMonth() - 1);
        matchesDateRange = logDate >= monthStart;
      }
    }

    return matchesSearch && matchesAction && matchesDateRange;
  });

  // Filter backups
  const filteredBackups = backups.filter(backup => {
    if (backupSearchDate === '') return true;
    const backupDate = new Date(backup.timestamp).toLocaleDateString('zh-CN');
    return backupDate.includes(backupSearchDate);
  });

  // Check if log filters are active
  const hasActiveLogFilters = logSearchTerm !== '' || logFilterAction !== '' || logFilterDateRange !== 'all';

  // Clear log filters
  const clearLogFilters = () => {
    setLogSearchTerm('');
    setLogFilterAction('');
    setLogFilterDateRange('all');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">数据管理</h1>
                <p className="text-sm text-gray-500">导入导出、备份恢复</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Message Toast */}
      {message && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-500 text-white' :
          message.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {message.type === 'success' && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {message.text}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-3xl font-bold text-blue-600">{stats?.products || 0}</div>
            <div className="text-sm text-gray-500 mt-1">产品数量</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-3xl font-bold text-green-600">{backups.length}</div>
            <div className="text-sm text-gray-500 mt-1">备份数量</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-sm font-semibold text-purple-600">{stats?.totalStorageUsed}</div>
            <div className="text-sm text-gray-500 mt-1">存储使用</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-sm font-semibold text-orange-600">
              {stats?.lastBackup ? new Date(stats.lastBackup).toLocaleDateString('zh-CN') : '无'}
            </div>
            <div className="text-sm text-gray-500 mt-1">上次备份</div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">数据操作</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={exportAllData}
              className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">导出数据</div>
                <div className="text-sm text-gray-500">下载JSON备份文件</div>
              </div>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">导入数据</div>
                <div className="text-sm text-gray-500">从JSON文件恢复</div>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />

            <button
              onClick={createBackup}
              className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">创建备份</div>
                <div className="text-sm text-gray-500">保存当前数据快照</div>
              </div>
            </button>

            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">清空数据</div>
                <div className="text-sm text-gray-500">删除所有编辑内容</div>
              </div>
            </button>
          </div>
        </div>

        {/* Backups List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">本地备份 ({backups.length}/10)</h2>
            {backups.length > 0 && (
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="按日期搜索..."
                  value={backupSearchDate}
                  onChange={(e) => setBackupSearchDate(e.target.value)}
                  className="pl-9 pr-8 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
                />
                {backupSearchDate && (
                  <button
                    onClick={() => setBackupSearchDate('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
          {backupSearchDate && filteredBackups.length !== backups.length && (
            <div className="mb-3 text-sm text-gray-600">
              找到 <strong className="text-blue-600">{filteredBackups.length}</strong> 个匹配的备份
            </div>
          )}
          {filteredBackups.length === 0 && backups.length > 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p>未找到匹配的备份</p>
              <button
                onClick={() => setBackupSearchDate('')}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700"
              >
                清除搜索
              </button>
            </div>
          ) : backups.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <p>暂无备份</p>
              <p className="text-sm mt-1">点击&ldquo;创建备份&rdquo;保存当前数据</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBackups.map((backup) => (
                <div
                  key={backup.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(backup.timestamp).toLocaleString('zh-CN')}
                      </div>
                      <div className="text-sm text-gray-500">大小: {backup.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowRestoreConfirm(backup.id)}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm transition-colors"
                    >
                      恢复
                    </button>
                    <button
                      onClick={() => deleteBackup(backup.id)}
                      className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Operation Logs */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">操作日志 ({logs.length})</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLogs(!showLogs)}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                {showLogs ? '收起' : `展开`}
              </button>
              {logs.length > 0 && (
                <button
                  onClick={handleClearLogs}
                  className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                >
                  清空
                </button>
              )}
            </div>
          </div>

          {showLogs && (
            <div className="space-y-4">
              {/* Log Search and Filters */}
              {logs.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="搜索操作记录..."
                        value={logSearchTerm}
                        onChange={(e) => setLogSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {logSearchTerm && (
                        <button
                          onClick={() => setLogSearchTerm('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {/* Action Type Filter */}
                    <select
                      value={logFilterAction}
                      onChange={(e) => setLogFilterAction(e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">全部操作</option>
                      {ACTION_TYPES.map(action => (
                        <option key={action.value} value={action.value}>{action.label}</option>
                      ))}
                    </select>
                  </div>
                  {/* Date Range Filter */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-600">时间范围:</span>
                    <div className="flex gap-2">
                      {[
                        { value: 'all', label: '全部' },
                        { value: 'today', label: '今天' },
                        { value: 'week', label: '本周' },
                        { value: 'month', label: '本月' },
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setLogFilterDateRange(option.value as 'all' | 'today' | 'week' | 'month')}
                          className={`px-3 py-1 rounded-full text-xs transition-colors ${
                            logFilterDateRange === option.value
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    {hasActiveLogFilters && (
                      <button
                        onClick={clearLogFilters}
                        className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 ml-auto"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        清除筛选
                      </button>
                    )}
                  </div>
                  {/* Results Count */}
                  {hasActiveLogFilters && (
                    <div className="text-sm text-gray-600">
                      找到 <strong className="text-blue-600">{filteredLogs.length}</strong> 条记录
                      {logSearchTerm && <span className="text-gray-500">（搜索: "{logSearchTerm}"）</span>}
                    </div>
                  )}
                </div>
              )}

              {/* Log List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">暂无操作记录</div>
                ) : filteredLogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p>未找到匹配的记录</p>
                    <button
                      onClick={clearLogFilters}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      清除筛选
                    </button>
                  </div>
                ) : (
                  filteredLogs.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">
                          {log.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">
                          {formatLogAction(log.action)}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(log.timestamp).toLocaleString('zh-CN')}
                        </div>
                      </div>
                      {/* Show details if available */}
                      {Object.keys(log.details).length > 0 && (
                        <div className="text-xs text-gray-400 max-w-32 truncate" title={JSON.stringify(log.details)}>
                          {JSON.stringify(log.details).slice(0, 30)}...
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">确认清空数据</h3>
                <p className="text-sm text-gray-500">此操作将清除所有编辑内容</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              系统将在清空前自动创建备份，您可以随时恢复。确定要继续吗？
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={clearAllData}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                确认清空
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Confirmation Modal */}
      {showRestoreConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">确认恢复备份</h3>
                <p className="text-sm text-gray-500">当前数据将被覆盖</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              系统将在恢复前自动创建当前数据的备份。确定要恢复到此备份吗？
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRestoreConfirm(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => restoreBackup(showRestoreConfirm)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                确认恢复
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
