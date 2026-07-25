import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Upload, Settings, CheckCircle2, ShieldAlert, KeyRound, FileCheck } from 'lucide-react';

export const AdminApkModal = () => {
  const { t, apkInfo, updateApk, isAdminOpen, setIsAdminOpen } = useApp();

  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passError, setPassError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [version, setVersion] = useState(apkInfo.version);
  const [changelog, setChangelog] = useState(apkInfo.changelog);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  if (!isAdminOpen) return null;

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === '123456' || passcode === 'admin') {
      setIsUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateApk(
      {
        version: version || apkInfo.version,
        changelog: changelog || apkInfo.changelog
      },
      selectedFile
    );
    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
      setIsAdminOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-500 text-white shadow-3d-orange">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {t('adminModal.title')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('adminModal.subtitle')}
            </p>
          </div>
        </div>

        {/* Lock Screen Passcode Step */}
        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="space-y-4 pt-2">
            <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300">
              💡 Mã PIN bảo vệ trang quản trị mặc định là <strong className="underline">123456</strong> (hoặc gõ <strong className="underline">admin</strong>).
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-brand-500" />
                {t('adminModal.passcodeLabel')}
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Nhập mã PIN..."
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-brand-500 outline-none"
              />
              {passError && (
                <p className="text-xs font-bold text-rose-500 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {t('adminModal.passError')}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm shadow-3d-orange transition-all"
            >
              Mở Khóa Bảng Quản Trị
            </button>
          </form>
        ) : (
          /* Unlocked Admin Form */
          <form onSubmit={handleSave} className="space-y-5 pt-2">
            
            {publishedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>{t('adminModal.successMsg')}</span>
              </div>
            )}

            {/* File Upload Zone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-brand-500" />
                {t('adminModal.fileLabel')}
              </label>
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800/50">
                <input
                  type="file"
                  accept=".apk"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-brand-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {selectedFile ? `Đã chọn: ${selectedFile.name} (${(selectedFile.size / (1024*1024)).toFixed(1)} MB)` : 'Kéo thả file .apk vào đây hoặc click để chọn'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Hỗ trợ định dạng file .apk</p>
              </div>
            </div>

            {/* Version Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t('adminModal.versionLabel')}
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Changelog Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <FileCheck className="w-4 h-4 text-brand-500" />
                {t('adminModal.changelogLabel')}
              </label>
              <textarea
                rows="4"
                value={changelog}
                onChange={(e) => setChangelog(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
              >
                {t('adminModal.closeBtn')}
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-brand-500 hover:bg-brand-600 text-white shadow-3d-orange transition-all"
              >
                {t('adminModal.saveBtn')}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
