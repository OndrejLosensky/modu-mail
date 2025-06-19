'use client';

import React, { useEffect } from 'react';
import { initializeBlocks } from '@/blocks/init';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize blocks on app start
    initializeBlocks();
  }, []);

  return <>{children}</>;
} 