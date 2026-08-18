import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "N-Takım | Takım Ara",
  description: "Kendine en uygun proje ve takım arkadaşlarını bul."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="tr"><body>{children}</body></html>;
}
