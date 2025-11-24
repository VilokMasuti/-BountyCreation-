'use client';

import { cn } from '@/lib/utils';
import { Check, ReceiptText, Gift, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function WizardSidebar({ currentStep }: { currentStep: number }) {
  return (
    <aside className="hidden md:flex w-72 border-r bg-card/80 backdrop-blur-xl border-border/40 flex-col">
      <ScrollArea className="h-full">
        <SidebarContent currentStep={currentStep} />
      </ScrollArea>
    </aside>
  );
}

export function SidebarContent({ currentStep }: { currentStep: number }) {
  const STEPS = [
    { id: 1, title: 'Basics', icon: ReceiptText },
    { id: 2, title: 'Rewards', icon: Gift },
    { id: 3, title: 'Backer', icon: Users },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <p className="text-sm uppercase text-muted-foreground  textbg tracking-wider">
          Wizard Progress
        </p>
        <Separator />
      </div>

      {/* STEPS */}
      <div className="space-y-3  flex flex-col gap-10">
        {STEPS.map((step) => {
          const active = currentStep === step.id;
          const completed = currentStep > step.id;
          const locked = currentStep < step.id;

          return (
            <div
              key={step.id}
              className={cn(
                'flex items-center gap-4 p-3 rounded border transition-all group select-none cursor-pointer',
                active && ' border-primary textLight shadow-md shadow-primary/40',
                completed &&
                  'border-border/40 bg-muted/30 hover:bg-muted/50 cursor-pointer hover:shadow-sm hover:shadow-primary/20',
                locked &&
                  'border-border/20 bg-card/50 text-muted-foreground opacity-60 cursor-not-allowed'
              )}
            >
              {/* STEP INDICATOR */}
              <div
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold transition-all',
                  active
                    ? 'bg-primary-foreground text-primary ring-2 ring-primary/50'
                    : completed
                    ? 'bg-muted text-muted-foreground group-hover:bg-primary/20'
                    : 'bg-muted/70 text-muted-foreground'
                )}
              >
                {completed ? <Check className="w-4 h-4" /> : step.id}
              </div>

              {/* TITLE + ICON */}
              <div className="flex-1 flex items-center gap-2">
                <step.icon
                  className={cn(
                    'w-4 h-4 transition-colors',
                    active ? 'text-white' : 'text-muted-foreground'
                  )}
                />
                <span
                  className={cn(
                    'truncate font-medium',
                    active && 'font-semibold',
                    locked && 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER PROGRESS */}
      <div className="pt-6">
        <Badge variant="default" className="w-full py-2 justify-center text-xs  textbg  uppercase">
          Step {currentStep} -{STEPS.length}
        </Badge>
      </div>
    </div>
  );
}
