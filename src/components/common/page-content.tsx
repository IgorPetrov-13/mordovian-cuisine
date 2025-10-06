"use client";
import { siteConfig } from '@/config/site.config';
import { usePathname } from 'next/navigation';

function PageContent() {
  const pathname = usePathname();
  const pageContent = siteConfig.pageContent[pathname as keyof typeof siteConfig.pageContent];

  if (!pageContent) {
    return <div>Страница не найдена</div>;
  }

  return <p>{pageContent.content}</p>;
}
export default PageContent;
