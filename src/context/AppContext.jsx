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
      sha256: 'de327e26c2ef4c3f969b106828bd6a521d95f0a1d4ad652af3fca9297c43dd23',
      changelog: lang === 'vi' 
        ? '• Ra mắt hệ thống Hội viên VIP: Nuôi không giới hạn thú cưng (gói Thường tối đa 2 bé), tặng kèm Xu ảo chăm sóc thú cưng.\n• Tính năng Xuất Sổ Y Bạ & Tiêm Chủng (PDF) chuẩn y tế: Xuất và in ấn hồ sơ sức khỏe thú cưng tiện lợi.\n• Tối ưu hệ thống thanh toán VietQR gói cước: Dùng thử 39K & Tiêu chuẩn 50K.\n• Hỗ trợ toàn diện các định dạng ảnh: HEIC/HEIF Samsung & iPhone, AVIF, GIF, WebP, PNG, JPG sắc nét 2K qua Cloudflare R2.'
        : '• VIP Membership Launch: Unlimited pet profiles (free accounts limited to 2 pets), bonus Pet Coins for care activities.\n• Medical-grade Health & Vaccination PDF Export: Easily export and print complete pet medical records.\n• Enhanced VietQR automated subscription payments with Trial 39K & Standard 50K plans.\n• Full multi-format 2K image support: Samsung & iPhone HEIC/HEIF, AVIF, GIF, WebP, PNG, JPG via Cloudflare R2.',
      totalDownloads: 14850,
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
