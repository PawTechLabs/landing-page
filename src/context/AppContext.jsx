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
      sha256: '75804fd9596429317d447e09416c370ecf1e46fc40f5dc95c6c983e1de538df6',
      changelog: lang === 'vi' 
        ? '• Hỗ trợ toàn diện các định dạng ảnh: Samsung/iPhone HEIC/HEIF, AVIF, GIF, BMP, TIFF, SVG, WebP, PNG, JPG.\n• Nâng cấp độ phân giải ảnh 2K sắc nét vượt trội khi đăng bài, tải ảnh thú cưng và đại diện.\n• Đồng bộ lưu trữ đám mây Cloudflare R2: Ảnh hiển thị tức thì và đồng nhất trên mọi thiết bị.\n• Tối ưu thanh tương tác bài đăng & mở nhanh cẩm nang chăm sóc từ trang chủ.'
        : '• Comprehensive image format support: HEIC/HEIF (Samsung & iPhone), AVIF, GIF, BMP, TIFF, SVG, WebP, PNG, JPG.\n• Crystal-clear 2K high-resolution uploads for posts, pet profiles, and avatars.\n• Cloudflare R2 Cloud Storage sync: Seamless real-time image availability across all devices.\n• Optimized post action bar & instant navigation to pet care guides.',
      totalDownloads: 14720,
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
