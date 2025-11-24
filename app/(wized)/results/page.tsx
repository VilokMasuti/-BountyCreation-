'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Home, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useBounty } from '@/hooks/useBounty';

interface BountyPayload {
  title: string;
  type: string;
  mode: string;
  reward: {
    currency: string;
    amount: number;
    winners: number;
  };
  dominant_core: string;
  sdgs: string[];
  has_backer: boolean;
}

export default function ResultsPage() {
  const router = useRouter();
  const { resetForm } = useBounty();
  const [payload, setPayload] = useState<BountyPayload | null>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('bountyPayload') : null;
    return saved ? JSON.parse(saved) : null;
  });
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (payload) {
      navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadJSON = () => {
    if (payload) {
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2))
      );
      element.setAttribute('download', 'bounty-payload.json');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleNewBounty = () => {
    resetForm();
    router.push('/create');
  };

  if (!payload) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className=" text-center p-8  w-[30rem]">
          <p className="text-muted-foreground mb-4">No bounty data found</p>
          <Button
            variant={'outline'}
            onClick={() => router.push('/create')}
            className=" textbg cursor-pointer"
          >
            Create One Lets Go..!
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card p-4 md:p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
            <h1 className="text-2xl md:text-4xl  textbg tracking-tight">
              Bounty Created Successfully!
            </h1>
          </div>
          <p className="textLight mt-2">Your bounty is ready to be shared with the community</p>
        </div>

        <Card className=" mb-8">
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4">
            <CardTitle className=" font-display textbg">JSON Payload</CardTitle>
            <div className="flex gap-2 flex-wrap w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="gap-2 bg-transparent flex-1 md:flex-none cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                <span className="sm:hidden">{copied ? '✓' : 'Copy'}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadJSON}
                className="gap-2 bg-transparent flex-1 md:flex-none cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">DL</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted/30 border border-border/50 p-3 md:p-4 rounded-lg overflow-auto max-h-[300px] md:max-h-[400px] text-xs leading-relaxed">
              <code className="text-foreground/80">{JSON.stringify(payload, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Bounty Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-start gap-2">
                <span className="text-muted-foreground font-medium">Title</span>
                <span className="font-semibold text-right flex-1">{payload.title}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-muted-foreground font-medium">Type</span>
                <Badge variant="outline" className="ml-auto">
                  {payload.type}
                </Badge>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-muted-foreground font-medium">Mode</span>
                <Badge variant="outline" className="ml-auto">
                  {payload.mode}
                </Badge>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-muted-foreground font-medium">Reward</span>
                <span className="font-semibold">
                  {payload.reward.currency} {payload.reward.amount.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Key Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-start gap-2">
                <span className="text-muted-foreground font-medium">Winners</span>
                <p className="ml-auto">{payload.reward.winners}</p>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-muted-foreground font-medium">Impact Core</span>
                <p className="ml-auto">{payload.dominant_core}</p>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-muted-foreground font-medium">SDGs</span>
                <span className="font-semibold">{payload.sdgs.length || 'None'}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-muted-foreground font-medium">Backer</span>
                <Badge variant={payload.has_backer ? 'outline' : 'destructive'} className="ml-auto">
                  {payload.has_backer ? 'Yes' : 'No'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {payload.sdgs.length > 0 && (
          <Card className=" mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Selected SDGs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {payload.sdgs.map((sdg: string) => (
                  <Badge key={sdg} variant={'outline'} className="  bg-zinc-950 text-slate-200">
                    {sdg}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="gap-2 bg-transparent order-2 sm:order-1 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Button>
          <Button onClick={handleNewBounty} className="gap-2 order-1 sm:order-2 cursor-pointer">
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Create Another</span>
            <span className="sm:hidden">New Bounty</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
