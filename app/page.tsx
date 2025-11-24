'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/Theme/Theme-toggle';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex flex-col">
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 px-4 sm:px-6 lg:px-8  justify-between items-center">
            <Link className="flex items-center space-x-2 mr-6" href="#">
              <span className=" font-sans text-2xll tracking-tight textbg">
                Bounty Wizard
                <span className="textbg animate-star-movement-bottom duration-1000"> </span>
              </span>
            </Link>

            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1">
          <section className="w-full py-20 md:py-32 lg:py-40">
            <div className="container px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center space-y-8 text-center">
                <div className="space-y-6 max-w-7xl">
                  <Badge
                    variant={'outline'}
                    className="inline-flex items-center rounded-full ring-1  border-border  border-2 px-4 py-1.5 text-sm"
                  >
                    <Sparkles className="mr-2 h-3.5 w-3.5 animate-pulse duration-700 " />
                    <span className="  font-display">Launch bounties in minutes</span>
                  </Badge>

                  <h1 className="text-4xl tracking-tight sm:text-5xl md:text-5xl lg:text-6xl text-balance textbg  font-display">
                    Create And Track <span className="text-muted-foreground">Global Bounties</span>
                  </h1>

                  <p className="mx-auto max-w-[700px] text-lg  md:text-sm leading-relaxed text-pretty  textLight  font-display">
                    Define rewards, set timelines, and track impact goals with our streamlined
                    creation wizard. Built for speed and ease of use
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="h-10 px-8 text-base font-display rounded">
                    <Link href="/create">
                      Create New Bounty <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-10 px-8 text-base bg-transparent rounded font-display"
                  >
                    <Link href="#features" className=" font-display">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>
          <a href="https://github.com/VilokMasuti">V I L O K</a>
        </p>
      </footer>
    </div>
  );
}
