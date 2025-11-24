'use client';

import { cn } from '@/lib/utils';

export function MobileStepper({ currentStep }: { currentStep: number }) {
  const STEPS = [
    { id: 1, title: 'Basics' },
    { id: 2, title: 'Rewards' },
    { id: 3, title: 'Backer' },
  ];

  return (
    <div className="md:hidden px-4 py-3 border-b border-border/40 bg-card/40 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        {STEPS.map((step) => (
          <div key={step.id} className="flex-1 flex flex-col items-center relative">
            {/* Circle */}
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                currentStep === step.id
                  ? 'bg-primary text-primary-foreground'
                  : currentStep > step.id
                  ? 'bg-muted text-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {step.id}
            </div>

            {/* Title */}
            <span className="mt-1 text-xs font-medium text-foreground/80">{step.title}</span>

            {/* Connector line */}
            {step.id !== 3 && (
              <div
                className={cn(
                  'absolute top-4 left-[65%] w-full h-0.5',
                  currentStep > step.id ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
