'use client';

import { BountyProvider } from '@/store/Wizardstore';
import type React from 'react';

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return <BountyProvider>{children}</BountyProvider>;
}
