# Thành Phố Học Tập

Website giáo dục tiếng Việt theo concept **Kids Learning City**, triển khai MVP của [Issue #1](https://github.com/Vanhuy0112/city-student/issues/1) cho trẻ từ mẫu giáo đến lớp 5.

## Chạy trên máy

Cần **Node.js 22.18 trở lên** (khuyến nghị Node.js 24 LTS) và npm.

```sh
npm install
npm run dev
```

Mở địa chỉ mà Next.js in ra, mặc định `http://127.0.0.1:3000`. Không cần API key hoặc biến môi trường.

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

## Những phần đã triển khai

- Next.js App Router, TypeScript strict và Tailwind CSS; design tokens pastel theo đặc tả. CSS riêng cho minh họa thành phố và bố cục mobile.
- Trang chủ có header, hero, bản đồ 6 tòa nhà tương tác, chọn 6 cấp lớp, bài học mẫu, 3 thẻ hỗ trợ, 4 tiện ích, mini game, huy hiệu, thông tin phụ huynh và footer.
- 6 môn theo đúng thứ tự: Toán học, Tiếng Việt, Tiếng Anh, Khoa học, Lịch sử & Địa lý, Nghệ thuật.
- Mẫu giáo và các lớp 1–5 có mô tả riêng. Có 36 cặp môn/lớp; Toán có 2 bài riêng mỗi lớp. Các môn còn lại có nội dung theo 3 nhóm mẫu giáo, lớp 1–2, lớp 3–5.
- Game đếm sao cho mẫu giáo, phép tính phù hợp cho lớp 1–5; phản hồi nhẹ nhàng, có thể thử lại, không tính giờ.
- Mỗi hoạt động đúng lần đầu nhận 5 sao. Thử thách gồm 2 bài Toán khác nhau, 1 bài Tiếng Việt và 1 game; đủ 4 bước tự thưởng thêm 30 sao. Thử thách độc lập theo lớp; không tự đặt lại theo ngày. Nhãn “hôm nay” là nội dung demo.
- Luyện lại hoặc bấm nhiều lần không tăng sao; cấp độ = `floor(tổng sao / 50) + 1`. Tiến độ và huy hiệu được tính từ hoạt động đã hoàn thành, không bịa dữ liệu thực tế.
- Chọn môn, lớp, âm thanh và mã hoạt động được lưu bằng localStorage có kiểm tra kiểu, phiên bản và mã hợp lệ; SSR dùng trạng thái mặc định rồi khôi phục sau khi trang sẵn sàng. Nếu lưu trữ bị chặn, website vẫn chạy trong phiên và hiện thông báo. Có nút đặt lại với xác nhận tại khu phụ huynh.
- Bàn phím Tab/Enter/Escape, menu di động có trạng thái mở/đóng, focus rõ, skip link, vùng thông báo hỗ trợ trình đọc màn hình. `prefers-reduced-motion` áp dụng cho CSS và cuộn bằng JavaScript.
- Mobile dùng lưới môn 2 cột, lớp 3 cột, thanh điều hướng dưới và khoảng chừa nội dung. Tablet và desktop có quy tắc bố cục riêng.
- Giọng đọc tiếng Việt là tùy chọn, mặc định tắt; bật biểu tượng âm thanh rồi bấm “Nghe câu hỏi”. Phụ thuộc Web Speech API và giọng đọc của thiết bị, không tự phát tiếng.

## Cấu trúc

```text
src/app/                 App Router, metadata và CSS responsive
src/components/          Thành phố, câu hỏi, SVG và icon tái sử dụng
src/data/catalog.ts      6 môn, 6 lớp, nội dung bài học/game typed
src/lib/progress.ts      Kiểm tra localStorage, thử thách và tính sao
public/                  Thành phố, tòa nhà, nhân vật và favicon SVG tự tạo
tests/                   Kiểm thử nội dung, lưu trữ và logic phần thưởng
```

## Giới hạn MVP và quyền riêng tư

Tất cả sao, cấp độ, tiến độ, thử thách và huy hiệu đều là **dữ liệu minh họa**, chỉ lưu trên trình duyệt đang dùng. Chưa có đồng bộ giữa tài khoản, thiết bị hoặc tab. Nút đặt lại chỉ ảnh hưởng khóa dữ liệu của website này.

Không có backend/LMS, cơ sở dữ liệu, đăng nhập, AI chatbot, thanh toán, analytics, quảng cáo, chat công khai hoặc bảng xếp hạng. Website không hỏi tên, email, tuổi hay thông tin cá nhân của trẻ. Không có chức năng tìm kiếm/thông báo giả và không có liên kết `href="#"`.

Bài học ngắn chỉ minh họa trải nghiệm, chưa phải chương trình giảng dạy đầy đủ hay nội dung đã được thẩm định chuyên môn. Nên có phụ huynh đồng hành, đặc biệt với trẻ chưa biết đọc.

## ASSET_GAP

- Repo gốc chỉ có README, không có ảnh concept từ cuộc trò chuyện ChatGPT. **Chưa đối chiếu pixel-perfect**; giao diện bám mô tả trong Issue #1.
- Tất cả minh họa thành phố, công trình, Minh, An, Go và Cún Sao là SVG tự tạo trong `public/`. Chưa có bộ nhân vật hoặc mô hình 3D gốc. Không hotlink ảnh, không dùng emoji làm minh họa chính.
- CSS ưu tiên Baloo 2 và Nunito nếu có trên máy; fallback Trebuchet MS/Segoe UI/Arial hỗ trợ tiếng Việt. Chưa đóng gói font. Không tải font bên thứ ba trong lúc chạy; có thể bổ sung font có giấy phép trong giai đoạn thiết kế tiếp theo.

## Kiểm thử và trạng thái bàn giao

Xem [VALIDATION.md](VALIDATION.md) để phân biệt kiểm thử đã chạy với kiểm thử còn bị giới hạn môi trường. Không xem một bản demo hiển thị được là bằng chứng production build đã đạt.

Mã nguồn được chuẩn bị trên nhánh `codex/issue-1-kids-learning-city`, dựa trên commit gốc `43a2b13e911c177f8acce94ea13c2f1445c2866d`. Nhánh `main` giữ nguyên. Ngày 07/11/2026 đã kết nối đúng tài khoản Vanhuy0112, xác nhận quyền ghi và tạo nhánh GitHub thành công. Xem Draft PR trên repository để theo dõi nghiệm thu còn lại.

## Hướng mở rộng

Sau khi duyệt giao diện: bổ sung font và asset gốc có giấy phép, thẩm định nội dung học, mở rộng ngân hàng câu hỏi, rồi cân nhắc WordPress REST API hoặc headless CMS. Giữ lớp truy xuất nội dung tách khỏi presentation. Chỉ thêm tài khoản và đồng bộ khi có yêu cầu sản phẩm rõ ràng; không tích hợp WordPress trong MVP này.
