# IPIF — Hệ sinh thái chăm sóc thú cưng

> Nuôi thú cưng đúng cách, ngay cả khi bạn chưa từng nuôi.

IPIF là một ứng dụng hệ sinh thái chăm sóc thú cưng, giúp người dùng vượt qua rào cản kiến thức, quản lý sức khỏe – lịch hẹn cho boss, và trải nghiệm cảm giác nuôi thú cưng thật thông qua một "thú cưng ảo" trước khi quyết định nhận nuôi ngoài đời.

---

## 🎯 Vấn đề IPIF giải quyết

Người mới nuôi (và cả người đang nuôi) thường gặp 3 rào cản lớn:

1. **Thiếu kiến thức nền** — không biết bắt đầu từ đâu, chăm sóc thế nào cho đúng.
2. **Thiếu công cụ quản lý** — hồ sơ bệnh án, lịch tiêm phòng, tẩy giun, tái khám nằm rải rác, dễ quên.
3. **Rào cản tâm lý trước khi nuôi** — lo sợ không đủ khả năng, không biết chi phí và trách nhiệm thực sự lớn đến đâu.

IPIF được thiết kế để gỡ bỏ lần lượt cả 3 rào cản này.

---

## 🐾 Các tính năng cốt lõi

### 1. Thú cưng ảo (Virtual Pet)
Không phải một game Tamagotchi giải trí, mà là một **mô phỏng chân thực về việc nuôi thú cưng**:
- Cho người dùng cảm nhận **chi phí sở hữu thực tế** và trách nhiệm hằng ngày.
- Có các trạng thái **ốm bệnh** và **hệ quả xấu nhất là "pet được đưa đi nhận nuôi"** (thay vì để pet chết) — nhấn mạnh tính trách nhiệm mà vẫn nhân văn.
- Trải nghiệm hướng tới cảm giác **nuôi một bé thật**, tối giản, không rối mắt.

### 2. Learn — Kho kiến thức thú cưng
- Duyệt và tìm kiếm kiến thức chăm sóc thú cưng theo chủ đề.
- Giúp người mới có nền tảng vững trước và trong khi nuôi.

### 3. Health Tracking — Theo dõi sức khỏe
Dành cho **thú cưng thật** ngoài đời:
- Cân nặng, tiêm phòng (vaccination), tẩy giun (deworming), tái khám, thuốc men.
- Theo dõi hoạt động dựa trên **người dùng tự ghi nhận** (đi dạo, ngủ, ăn) — không cần thiết bị đeo phần cứng.

### 4. Hồ sơ bệnh án số & Đặt lịch
- Định hướng **đồng bộ hồ sơ bệnh án số với bệnh viện thú y**.
- Đặt lịch khám, phân tách rõ ràng giữa **"bệnh viện"** và **"shop phụ kiện"**.

---

## 👥 Đối tượng người dùng

- **Người mới nuôi** — cần kiến thức nền và sự tự tin.
- **Người bận rộn** — cần công cụ quản lý lịch & hồ sơ tập trung.
- **Người muốn trải nghiệm premium** — sẵn sàng chi trả cho tính năng nâng cao.

---

## 💰 Mô hình kinh doanh

- **Freemium** với gói **Premium 50.000đ/tháng**.
- Bán **background/scene có thể thay đổi** phía sau thú cưng ảo (vật phẩm trang trí).

**Mục tiêu 3 năm:**
| Chỉ số | Mục tiêu |
|---|---|
| Registered users | 100.000 |
| MAU | 40.000 |
| DAU | 10.000 |
| Tỷ lệ chuyển đổi Premium | 5% |

---

## 🛠️ Kiến trúc kỹ thuật

### Backend
- **.NET 8** theo **Clean Architecture** + **Domain-Driven Design** (Aggregates, Aggregate Roots, Value Objects, Domain Services).
- Bảo mật & hạ tầng: **Cloudflare Workers** (secret-header auth để bảo vệ origin), tối ưu cho **Render free-tier**.
- Logging có cấu trúc với **Serilog** + **Grafana Cloud**.
- Tuân thủ **OWASP API Security Top 10**.
- Kiểm thử tải với **k6** (kịch bản JWT nhiều bước, ngưỡng p95/p99).
- Chiến lược giảm thiểu DDoS: Cloudflare + Nginx + fail2ban.

### Frontend (Mobile)
- **Flutter** theo **Clean Architecture + BLoC**, quy trình plan-before-code nghiêm ngặt.
- Stack cố định: `flutter_bloc`, `get_it`, `injectable`, `dartz`, `freezed`.

---

## 🎨 Brief cho Landing Page

> Phần này dành cho Agent/designer dựng trang landing. Đọc kỹ để giữ đúng tinh thần sản phẩm.

### Mục tiêu trang
Giới thiệu IPIF tới người dùng phổ thông (thị trường Việt Nam), truyền tải thông điệp: *nuôi thú cưng đúng cách trở nên dễ dàng và tự tin hơn*. Thu thập đăng ký sớm / tải app.

### Tông & cảm giác (Tone & Vibe)
- **Ấm áp, thân thiện, đáng tin cậy** — không lạnh lùng kiểu tech, không trẻ con kiểu game.
- Tối giản, nhiều khoảng trắng, hình ảnh thú cưng thật đáng yêu.
- Ngôn ngữ chính: **tiếng Việt**.

### Cấu trúc gợi ý (các section)
1. **Hero** — tagline + mô tả ngắn + nút CTA ("Tải ứng dụng" / "Đăng ký sớm") + mockup app.
2. **Vấn đề** — trình bày 3 rào cản (kiến thức, quản lý, tâm lý).
3. **Giải pháp / Tính năng** — 4 khối: Thú cưng ảo, Learn, Health Tracking, Hồ sơ & Đặt lịch (mỗi khối 1 icon + tiêu đề + mô tả ngắn).
4. **Điểm khác biệt** — nhấn mạnh thú cưng ảo mô phỏng chi phí & trách nhiệm thật (không chỉ là game).
5. **Đối tượng phù hợp** — 3 nhóm người dùng.
6. **Pricing** — Free vs Premium (50.000đ/tháng).
7. **CTA cuối** — kêu gọi đăng ký / tải app.
8. **Footer** — thông tin liên hệ, mạng xã hội, chính sách.

### Yêu cầu kỹ thuật gợi ý
- Responsive (mobile-first, vì đây là app mobile).
- Tối ưu tốc độ tải & SEO cơ bản.
- Có form thu thập email đăng ký sớm (hoặc link store khi app phát hành).

> **Lưu ý:** Nếu có sẵn `DESIGN.md` với hệ màu, typography và style guide của IPIF, hãy tuân theo tài liệu đó thay vì tự chọn.

---

## 📌 Trạng thái dự án

Dự án khởi nghiệp cá nhân đang trong quá trình phát triển — hoàn thiện MVP, chuẩn bị pitch và demo.
