import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thành Phố Học Tập | Học vui mỗi ngày",
  description: "Khám phá thành phố đầy sắc màu với 6 môn học, từ mẫu giáo đến lớp 5. Cùng Minh, An, Go và Cún Sao học vui, chơi hay mỗi ngày!",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
