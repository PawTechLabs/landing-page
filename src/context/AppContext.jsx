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
        if (parsed && parsed.version === 'v1.0.3') {
          return parsed;
        }
      } catch (e) {
        console.error("Error parsing saved apk info", e);
      }
    }
    return {
      version: 'v1.0.3',
      releaseDate: '18/09/2026',
      fileSize: '79.4 MB',
      fileName: 'ipif-v1.0.3.apk',
      sha256: '1d88e5d7afdfb111c44c34a7b34226c4ee504af862c23d1b37d2cb87f667de00',
      changelog: lang === 'vi' 
        ? '• Tích hợp Trợ lý ảo AI Chatbot thông minh: Tư vấn y tế, hành vi & dinh dưỡng thú cưng 24/7 trực quan với định dạng Markdown.\n• Tinh chỉnh giao diện: Bo viền Avatar chuẩn xác chống tràn viền, nút AI nổi bo góc mượt mà không tì vết.\n• Minh bạch trải nghiệm Cửa hàng IPIF Mart: Thêm nhãn & thông báo thử nghiệm sản phẩm đối tác mẫu.\n• Tối ưu hoá luồng tạo thú cưng chuẩn Multipart FormData và ổn định luồng thanh toán VietQR gói VIP.'
        : '• Integrated Smart AI Chatbot Assistant: 24/7 pet health, care and nutrition guidance with rich Markdown formatting.\n• UI Polish: Pixel-perfect avatar circular cropping across devices and ultra-smooth 3D floating AI assistant button.\n• Transparent Pet Mart Experience: Added preview badges and testing disclaimers for mock catalog items.\n• Backend & Network Stability: Hardened pet profile multipart creation and reliable VietQR VIP subscription checkout.',
      totalDownloads: 15320,
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
