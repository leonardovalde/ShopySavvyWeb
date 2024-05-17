'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
  }, []);

  return null;
}

export default home;
