'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    status === 'authenticated' && router.push('/home');
  }, [status]);
  return <div>{children}</div>;
}

export default layout;
