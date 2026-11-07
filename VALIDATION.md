# Kiểm chứng bàn giao — 07/11/2026

MVP đã có mã nguồn, npm lockfile và nhánh riêng. Các kiểm tra mã nguồn bên dưới đạt trên dependency khai báo. Chưa đủ bằng chứng nghiệm thu giao diện và tương tác trong trình duyệt.

## Kết quả kiểm tra mới

| Lệnh | Kết quả |
| --- | --- |
| npm install --no-audit --no-fund | Đạt, cài 361 package và tạo package-lock.json |
| npm test | 5/5 đạt: dữ liệu 36 cặp môn/lớp, chống cộng sao trùng, thưởng sau 4 bước, độc lập theo lớp, xử lý dữ liệu lỗi |
| npm run typecheck | Đạt trên dependency dự án |
| npm run lint | Đạt sau khi sửa export cấu hình PostCSS |
| npm run build | Đạt, Next.js 16.4.5 tạo tĩnh / và /_not-found |

Build lần đầu gặp EPERM khi tạo thư mục .next/server/app/_not-found.segments/_not-found trên Windows. Tạo thư mục bằng PowerShell rồi chạy lại build đã đạt. Next.js còn cảnh báo bỏ qua lockfile ngoài repository ở thư mục người dùng; build sử dụng lockfile trong dự án.

CI dùng Node.js 24 và npm ci với lockfile đã commit.

## Kết nối GitHub

Đã xác nhận tài khoản Vanhuy0112, quyền push/admin và tạo nhánh codex/issue-1-kids-learning-city thành công. Không merge main.

## Các kiểm tra trước đây

Đã kiểm tra XML của 3 SVG, render HTML React cho 6 môn/6 lớp/3 thẻ hỗ trợ/4 tiện ích, 27 anchor hợp lệ và không trùng id. Các kết quả render HTML không thay thế kiểm thử trình duyệt.

## Phần còn chờ nghiệm thu

- Chưa có screenshot hoặc kết quả kiểm thử responsive trong trình duyệt tại 375, 390, 768, 1024 và 1440px.
- Cần kiểm tra thao tác 6 môn/6 lớp, menu Tab/Enter/Escape, CTA/focus, câu trả lời sai/đúng/reset, thưởng 4 bước, chống cộng sao trùng và tải lại.
- Cần kiểm tra localStorage bị hỏng/bị chặn, reduced motion, giọng đọc tùy chọn, console và hydration.
- Bản kiểm tra trước không truy cập được máy chủ local từ trình duyệt; không tuyên bố kiểm tra trình duyệt đã đạt.

## Thiết kế và phạm vi

Minh họa SVG tự tạo, 4 nhân vật, 6 công trình và màu accent theo Issue #1. Chưa có ảnh concept gốc; chưa đối chiếu pixel-perfect. Baloo 2/Nunito chỉ được ưu tiên nếu có trên máy, chưa đóng gói font.

Không có backend, tài khoản, CMS, analytics, quảng cáo, chat hoặc thu thập dữ liệu cá nhân. Sao, tiến độ và cấp độ được đánh dấu dữ liệu minh họa.
