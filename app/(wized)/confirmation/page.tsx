'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import StarBorder from '../../../components/StarBorder';

import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { Badge } from '@/components/ui/badge';

export default function ConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/results');
    }, 8000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className=" mx-auto flex items-center justify-center min-h-screen">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center ">
        <DottedGlowBackground
          className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100  "
          opacity={2}
          gap={10}
          radius={1.6}
          colorLightVar="--color-neutral-500"
          glowColorLightVar="--color-neutral-600"
          colorDarkVar="--color-neutral-500"
          glowColorDarkVar="--color-sky-800"
          backgroundOpacity={0}
          speedMin={0.3}
          speedMax={1.7}
          speedScale={1}
        />

        <div className="relative z-10 flex w-full flex-col items-center justify-between space-y-6 px-8 py-16 text-center md:flex-row">
          <div>
            <div className="text-center text-4xl font-normal   tracking-tight text-neutral-900 sm:text-5xl md:text-left dark:text-neutral-400">
              <span className=" font-display textbg">Bounty Created</span>{' '}
            </div>
            <p className="mt-4 max-w-lg text-center text-base  textLight md:text-left ">
              Your bounty has been deployed and is now active in the network 🎉 You will be
              Redirecting to Result control in 8 seconds....!
            </p>
          </div>
          <div className="flex flex-col gap-4 ">
            <StarBorder className="custom-class  " color="cyan" speed="3s">
              Mission Live
            </StarBorder>
          </div>
        </div>
      </div>
    </main>
  );
}
