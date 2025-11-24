'use client';

import React, { createContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';

export interface BountyFormData {
  title: string;
  description: string;
  type: string;
  dominant_core: string;
  mode: 'digital' | 'physical';
  location: string;

  reward: {
    currency: string;
    amount: number;
    winners: number;
  };

  timeline: {
    expiration_date: string;
    estimated_completion: {
      days: number;
      hours: number;
      minutes: number;
    };
  };

  hasImpactCertificate: boolean;
  impactBriefMessage: string;
  sdgs: string[];

  has_backer: boolean;
  backer: {
    name: string;
    logo: string;
    message: string;
  };

  terms_accepted: boolean;
}

export const initialState: BountyFormData = {
  title: '',
  description: '',
  type: '',
  dominant_core: '',
  mode: 'digital',
  location: '',
  reward: {
    currency: 'USD',
    amount: 0,
    winners: 1,
  },
  timeline: {
    expiration_date: '',
    estimated_completion: {
      days: 0,
      hours: 0,
      minutes: 0,
    },
  },
  hasImpactCertificate: false,
  impactBriefMessage: '',
  sdgs: [],
  has_backer: false,
  backer: {
    name: '',
    logo: '',
    message: '',
  },
  terms_accepted: false,
};

type Action =
  | { type: 'UPDATE'; payload: Partial<BountyFormData> }
  | { type: 'UPDATE_REWARD'; payload: Partial<BountyFormData['reward']> }
  | { type: 'UPDATE_TIMELINE'; payload: Partial<BountyFormData['timeline']> }
  | {
      type: 'UPDATE_ESTIMATED_COMPLETION';
      payload: Partial<BountyFormData['timeline']['estimated_completion']>;
    }
  | { type: 'UPDATE_BACKER'; payload: Partial<BountyFormData['backer']> }
  | { type: 'UPDATE_SDGS'; payload: string[] }
  | { type: 'RESET' };

function bountyReducer(state: BountyFormData, action: Action): BountyFormData {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        ...action.payload, // top-level updates
      };

    case 'UPDATE_REWARD':
      return {
        ...state,
        reward: {
          ...state.reward,
          ...action.payload,
        },
      };

    case 'UPDATE_TIMELINE':
      return {
        ...state,
        timeline: {
          ...state.timeline,
          ...action.payload,
        },
      };

    case 'UPDATE_ESTIMATED_COMPLETION':
      return {
        ...state,
        timeline: {
          ...state.timeline,
          estimated_completion: {
            ...state.timeline.estimated_completion,
            ...action.payload,
          },
        },
      };

    case 'UPDATE_BACKER':
      return {
        ...state,
        backer: {
          ...state.backer,
          ...action.payload,
        },
      };

    case 'UPDATE_SDGS':
      return {
        ...state,
        sdgs: action.payload,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

interface BountyContextType {
  state: BountyFormData;
  dispatch: React.Dispatch<Action>;
  resetForm: () => void;
}

export const BountyContext = createContext<BountyContextType | undefined>(undefined);

export function BountyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bountyReducer, initialState);

  //! Load LocalStorage only once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('bountyFormData');
    if (saved) {
      dispatch({ type: 'UPDATE', payload: JSON.parse(saved) });
    }
  }, []);

  //! Save to LocalStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('bountyFormData', JSON.stringify(state));
  }, [state]);

  //! RESET FIX (Most important part)
  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET' });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('bountyFormData');
      localStorage.removeItem('bountyPayload');
    }
  }, []);

  return (
    <BountyContext.Provider value={{ state, dispatch, resetForm }}>
      {children}
    </BountyContext.Provider>
  );
}

export default BountyContext;
