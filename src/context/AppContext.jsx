import React, { createContext, useContext, useState, useEffect } from 'react';
import { vi } from '../locales/vi';
import { en } from '../locales/en';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Language State
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('ipif_lang') || 'vi';
  });

  const toggleLang = () => {
    const nextLang = lang === 'vi' ? 'en' : 'vi';
    setLang(nextLang);
    localStorage.setItem('ipif_lang', nextLang);
  };

  const t = (path) => {
    const dict = lang === 'vi' ? vi : en;
    const keys = path.split('.');
    let current = dict;
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        return path;
      }
    }
    return current;
  };

  // 2. Theme State (Dark / Light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ipif_theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ipif_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // 3. APK File & Management State
  const [apkInfo, setApkInfo] = useState(() => {
    const saved = localStorage.getItem('ipif_apk_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.version === 'v1.0.1') {
          return parsed;
        }
      } catch (e) {
        console.error("Error parsing saved apk info", e);
      }
    }
    return {
      version: 'v1.0.1',
      releaseDate: '13/09/2026',
      fileSize: '80.8 MB',
      fileName: 'ipif-v1.0.1.apk',
      sha256: 'b1b64a5ce359609d562d0d25c786f9ce1de564a02801d98fe029dc76f8e74fe3',
      changelog: lang === 'vi' 
        ? '• Nâng cấp bản đồ Google Maps HD tiếng Việt cực sắc nét, chi tiết và không watermark.\n• Khắc phục hoàn toàn lỗi hiển thị thú cưng ảo (nhận diện đúng chú cún Corgi ngay khi mở màn hình).\n• Sắp xếp lại giao diện thanh trạng thái thú ảo, khắc phục lỗi chữ đè lấn chỉ số.\n• Tối ưu tải file APK một chạm mượt mà trên mọi thiết bị.'
        : '• Upgraded to high-definition Google Maps tiles with native Vietnamese labeling and no watermark.\n• Fixed virtual pet initial species load to display Corgi dog instantly.\n• Redesigned virtual pet top HUD to eliminate text and stats overlap.\n• Optimized single-tap APK download experience on mobile browsers.',
      totalDownloads: 14280,
      customBlobUrl: null
    };
  });

  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Update APK from Admin
  const updateApk = (newMetadata, fileObject) => {
    let customUrl = null;
    if (fileObject) {
      customUrl = URL.createObjectURL(fileObject);
    }
    
    const updated = {
      ...apkInfo,
      ...newMetadata,
      customBlobUrl: customUrl || apkInfo.customBlobUrl,
      fileName: fileObject ? fileObject.name : apkInfo.fileName,
      fileSize: fileObject ? (fileObject.size / (1024 * 1024)).toFixed(1) + ' MB' : apkInfo.fileSize,
      releaseDate: new Date().toLocaleDateString('vi-VN')
    };

    setApkInfo(updated);
    localStorage.setItem('ipif_apk_info', JSON.stringify({
      ...updated,
      customBlobUrl: null // Don't persist raw blob URLs in localstorage
    }));
  };

  // Download APK Action
  const downloadApk = () => {
    if (downloading) return;
    setDownloading(true);
    setDownloadProgress(10);

    // Trigger single download
    const fallbackFile = apkInfo.fileName || 'ipif-v1.0.1.apk';
    const downloadUrl = apkInfo.customBlobUrl || `/${fallbackFile}`;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fallbackFile;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 100);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(() => {
      setDownloadProgress(100);
      
      // Increment download counter
      setApkInfo(prev => ({
        ...prev,
        totalDownloads: prev.totalDownloads + 1
      }));

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore
      }

      setTimeout(() => {
        setDownloading(false);
        setDownloadProgress(0);
      }, 800);

    }, 800);
  };

  return (
    <AppContext.Provider value={{
      lang,
      toggleLang,
      t,
      theme,
      toggleTheme,
      apkInfo,
      updateApk,
      downloadApk,
      downloading,
      downloadProgress,
      isAdminOpen,
      setIsAdminOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
