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
        if (parsed && parsed.version === 'v1.0.2') {
          return parsed;
        }
      } catch (e) {
        console.error("Error parsing saved apk info", e);
      }
    }
    return {
      version: 'v1.0.2',
      releaseDate: '14/09/2026',
      fileSize: '77.5 MB',
      fileName: 'ipif-v1.0.2.apk',
      sha256: '1f0e06f6d7d041cfb21c705d2198439e8b50f7a59c4a94d62ce060d908eabb4c',
      changelog: lang === 'vi' 
        ? '• Cập nhật mẹo chăm sóc hôm nay: Nhấn vào mẹo mở ngay chi tiết bài viết cẩm nang.\n• Cải tiến thanh tương tác bài đăng: Căn đều vừa vặn nút Chia sẻ trên mọi kích thước màn hình.\n• Tối ưu tải và hiển thị hình ảnh bài đăng mượt mà giữa các thiết bị.\n• Nâng cấp hiệu năng và sửa các lỗi trải nghiệm.'
        : '• Direct Care Tips Navigation: Tap any daily tip to open its full article detail immediately.\n• Redesigned Post Action Bar: Centered and responsive Like/Comment/Share buttons.\n• Seamless multi-device image loading and display.\n• General performance optimizations and fixes.',
      totalDownloads: 14650,
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
