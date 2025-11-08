import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

// Font Awesome config
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'SevenIsK',
  description: 'SevenIsK - We build high-quality software solutions.',
  // Favicon links from your index.html
  icons: [
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon_io/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon_io/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon_io/favicon-16x16.png' },
  ],
  manifest: '/favicon_io/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster position="top-right" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}