import { Open_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Lab 4",
  description: "Lab 4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
