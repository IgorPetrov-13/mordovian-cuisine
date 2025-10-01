import { auth } from '@/auth/auth';
import Header from '@/components/ui/layout/header';
import { layoutConfig } from '@/config/layout.config';
import { siteConfig } from '@/config/site.config';
import { Providers } from '@/providers/provider';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppLoader from '@/hoc/app-loader';
import Title from '@/components/ui/layout/title';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              <Title />
              <main
                className={`flex justify-center items-center`}
                style={{ height: `calc(100vh  - ${layoutConfig.footerHeight} - ${layoutConfig.headerHeight})` }}
              >
                {children}
              </main>
              <footer className={`flex justify-center items-center h-[${layoutConfig.footerHeight}]`}>
                <p>{siteConfig.description}</p>
              </footer>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
