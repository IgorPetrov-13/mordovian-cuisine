'use client';
import { siteConfig } from '@/config/site.config';
import { usePathname } from 'next/navigation';

function Title() {
  const pathname = usePathname();

  const currentNavItem = siteConfig.navItems.find((item) => item.href === pathname);

  const pageTitle = currentNavItem?.label ?? siteConfig.title;
  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
}

export default Title;
