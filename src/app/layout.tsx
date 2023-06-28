import "./globals.css";
import { Inter } from "next/font/google";
import { DragDropContext } from "react-beautiful-dnd";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Taskify",
  description: "Prueba TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={[inter.className, "App"].join(" ")}>{children}</body>
    </html>
  );
}
