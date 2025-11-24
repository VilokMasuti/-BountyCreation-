import BountyContext from '@/store/Wizardstore';
import { useContext } from 'react';

export function useBounty() {
  const context = useContext(BountyContext);
  if (context === undefined) {
    throw new Error('useBounty must be used within BountyProvider');
  }
  return context;
}
