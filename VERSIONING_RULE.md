# 📦 QUY TẮC PHÁT HÀNH VÀ NÂNG CẤP PHIÊN BẢN (VERSIONING RULE) CHO LANDING PAGE & APK

> **Tài liệu quy chuẩn dành cho Developer & AI Assistant khi thực hiện sửa lỗi (bugfix), cập nhật tính năng (features) hoặc build lại APK trên Landing Page.**
> **BẮT BUỘC TUÂN THỦ 100% - KHÔNG ĐƯỢC GIỮ NGUYÊN VERSION CŨ KHI CÓ THAY ĐỔI CODE HOẶC BUILD LẠI FILE APK.**

---

## 🚨 1. NGUYÊN TẮC CỐT LÕI (GOLDEN RULES)

1. **Mỗi lần sửa/cập nhật và build lại APK $\rightarrow$ BẮT BUỘC TĂNG VERSION:**
   - Sửa lỗi (Fix bug, giao diện, tối ưu): Tăng **PATCH** version (ví dụ: `v1.0.1` $\rightarrow$ `v1.0.2`).
   - Thêm tính năng mới (New features, screen mới): Tăng **MINOR** version (ví dụ: `v1.0.2` $\rightarrow$ `v1.1.0`).
   - Thay đổi kiến trúc lớn / breaking changes: Tăng **MAJOR** version (ví dụ: `v1.x` $\rightarrow$ `v2.0.0`).
2. **Không giữ nguyên file APK cũ khi có mã nguồn mới:**
   - Khách hàng và người dùng tải từ Landing Page phải luôn nhận được đúng file APK mới nhất tương ứng với mã phiên bản hiển thị.
3. **Đồng bộ thông tin tuyệt đối:**
   - Số phiên bản (Version), Tên file APK, Dung lượng (MB), Mã băm SHA-256, Ngày phát hành và Nhật ký thay đổi (Changelog) phải trùng khớp 100% giữa file thực tế và thông tin hiển thị trên Web.

---

## 📋 2. DANH SÁCH CÁC TẬP TIN BẮT BUỘC CẬP NHẬT

Khi nâng cấp phiên bản `vX.Y.Z` (ví dụ: `v1.0.2`), các file sau đây **phải được cập nhật đồng thời**:

### 1. `FE/IPIF-mobile/pubspec.yaml`
Cập nhật số phiên bản và mã build:
```yaml
version: 1.0.2+3 # Tăng patch version và tăng build number (+1)
```

### 2. `FE/landing-page/src/context/AppContext.jsx`
Cập nhật toàn bộ thông số APK mặc định và cơ chế bypass cache `localStorage`:
```javascript
// Kiểm tra cache localStorage - nếu không khớp version mới thì bỏ qua để lấy metadata mới:
const saved = localStorage.getItem('ipif_apk_info');
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    if (parsed && parsed.version === 'v1.0.2') { // <-- PHẢI ĐỔI ĐÚNG VERSION MỚI
      return parsed;
    }
  } catch (e) {
    console.error("Error parsing saved apk info", e);
  }
}

return {
  version: 'v1.0.2',                      // <-- Version mới (kèm chữ v)
  releaseDate: 'DD/MM/YYYY',              // <-- Ngày build thực tế
  fileSize: '80.8 MB',                    // <-- Dung lượng đo được từ file APK thực tế
  fileName: 'ipif-v1.0.2.apk',            // <-- Tên file APK có kèm số version
  sha256: '<MA_BAM_SHA256_CHINH_XAC>',   // <-- Sinh từ lệnh: sha256sum <file_apk>
  changelog: lang === 'vi' 
    ? '• Liệt kê ngắn gọn 3-4 gạch đầu dòng các lỗi đã fix hoặc tính năng mới bằng tiếng Việt.'
    : '• Short summary of bug fixes or new features in English.',
  totalDownloads: 14280,
  customBlobUrl: null
};
```

### 3. Thư mục `FE/landing-page/public/`
- Tên file APK phải chứa số version: `ipif-vX.Y.Z.apk` (ví dụ: `public/ipif-v1.0.2.apk`).
- Xóa file APK của phiên bản cũ để tránh làm nặng repository Git:
  ```bash
  rm public/ipif-v1.0.1.apk
  ```

---

## 🛠️ 3. QUY TRÌNH BUILD & PHÁT HÀNH CHUẨN (RELEASE WORKFLOW)

Khi được yêu cầu fix/cập nhật và đẩy lên Landing Page, thực hiện lần lượt 6 bước sau:

### 🔹 Bước 1: Sửa code và cập nhật `pubspec.yaml`
1. Thực hiện sửa lỗi / tính năng trên `FE/IPIF-mobile`.
2. Mở `pubspec.yaml`, tăng version (ví dụ: `1.0.2+3`).
3. Chạy `flutter analyze` đảm bảo không có lỗi biên dịch.

### 🔹 Bước 2: Build bản Release APK
Chạy lệnh build release kèm file biến môi trường:
```bash
cd /home/amtia/Projects/exe/FE/IPIF-mobile
flutter build apk --release --dart-define-from-file=.env
```
*(File output nằm tại `build/app/outputs/flutter-apk/app-release.apk`)*

### 🔹 Bước 3: Tính toán thông số chính xác
Chạy lệnh lấy dung lượng và mã băm SHA-256:
```bash
ls -la build/app/outputs/flutter-apk/app-release.apk
sha256sum build/app/outputs/flutter-apk/app-release.apk
```

### 🔹 Bước 4: Sao chép sang Landing Page & Cập nhật Metadata
1. Copy file sang thư mục public của Landing Page với tên file mới:
   ```bash
   cp build/app/outputs/flutter-apk/app-release.apk /home/amtia/Projects/exe/FE/landing-page/public/ipif-vX.Y.Z.apk
   ```
2. Xóa file APK phiên bản cũ trong `public/`.
3. Sửa [`AppContext.jsx`](file:///home/amtia/Projects/exe/FE/landing-page/src/context/AppContext.jsx) với đầy đủ `version`, `fileName`, `fileSize`, `sha256`, `releaseDate`, `changelog`.

### 🔹 Bước 5: Kiểm tra biên dịch Landing Page
Chạy thử nghiệm bản build web Vite:
```bash
cd /home/amtia/Projects/exe/FE/landing-page
npm run build
```
Đảm bảo build hoàn tất không phát sinh bất kỳ lỗi cú pháp nào.

### 🔹 Bước 6: Commit & Push lên Git
1. **Repository Mobile:** Commit và push lên nhánh `develop`:
   ```bash
   cd /home/amtia/Projects/exe/FE/IPIF-mobile
   git add . && git commit -m "fix/feat: <mô_tả> (bump to vX.Y.Z)" && git push origin develop
   ```
2. **Repository Landing Page:** Commit và push lên nhánh `main`:
   ```bash
   cd /home/amtia/Projects/exe/FE/landing-page
   git add . && git commit -m "feat(release): publish APK vX.Y.Z with updated changelog and checksum" && git push origin main
   ```

---

## ⚠️ 4. CHECKLIST KIỂM THỰC TRƯỚC KHI BÀN GIAO (VERIFICATION CHECKLIST)
- [ ] Version đã tăng và đồng bộ giữa `pubspec.yaml` và `AppContext.jsx`.
- [ ] Tên file trong `public/` khớp chính xác với trường `fileName` trong `AppContext.jsx`.
- [ ] Mã `sha256` được sinh từ đúng file APK vừa build xong.
- [ ] Điều kiện `parsed.version === 'vX.Y.Z'` trong `AppContext.jsx` đã được cập nhật để tránh cache cũ.
- [ ] Đã chạy `npm run build` trên Landing Page thành công 100%.
- [ ] Đã push thành công lên remote của cả hai repository.
