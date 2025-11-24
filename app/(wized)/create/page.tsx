/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { WizardSidebar } from '@/components/Navigation/wizard-sidebar';
import { Step1BasicDetails } from '@/components/Steps/Step1BasicDetails';
import { Step2RewardsTimeline } from '@/components/Steps/Step2RewardsTimeline';
import { Step3BackerInfo } from '@/components/Steps/Step3BackerInfo';
import { MobileStepper } from '@/components/Navigation/Mob-sidebar';
import { useBounty } from '@/hooks/useBounty';
import { ThemeToggle } from '@/components/Theme/Theme-toggle';

export default function WizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, dispatch } = useBounty();

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate server request
    setTimeout(() => {
      // Format the final payload exactly as specified
      const payload = {
        title: state.title,
        description: state.description,
        type: state.type,
        dominant_core: state.dominant_core,
        mode: state.mode,
        ...(state.mode === 'physical' && { location: state.location }),
        reward: state.reward,
        timeline: {
          expiration_date: new Date(state.timeline.expiration_date).toISOString(),
          estimated_completion: state.timeline.estimated_completion,
        },
        hasImpactCertificate: state.hasImpactCertificate,
        ...(state.hasImpactCertificate && { impactBriefMessage: state.impactBriefMessage }),
        sdgs: state.sdgs,
        has_backer: state.has_backer,
        ...(state.has_backer && { backer: state.backer }),
        terms_accepted: state.terms_accepted,
      };

      localStorage.setItem('bountyPayload', JSON.stringify(payload));
      setIsSubmitting(false);
      router.push('/confirmation');
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background overflow-hidden">
      <WizardSidebar currentStep={currentStep} />
      <div className="md:hidden">
        <MobileStepper currentStep={currentStep} />
      </div>
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
          <div className="max-w-4xl mx-auto w-full px-4 md:px-8 py-3 md:py-4 flex justify-between items-center gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-3xl  tracking-tight truncate textbg">Bounty Wizard</h1>
            </div>

            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full p-4 md:p-8">
            {currentStep === 1 && <Step1BasicDetails onNext={handleNext} />}
            {currentStep === 2 && <Step2RewardsTimeline onNext={handleNext} onBack={handleBack} />}
            {currentStep === 3 && (
              <Step3BackerInfo
                onBack={handleBack}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
