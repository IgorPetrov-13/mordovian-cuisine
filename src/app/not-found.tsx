'use client';
import { Button } from '@heroui/react';
import Link from 'next/link';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-8xl font-bold">404</h1>
      <p>К сожалению, такая страница не найдена</p>
      <Button as={Link} href='/'>вернуться на главную</Button>
    </div>
  );
}

export default NotFoundPage;
