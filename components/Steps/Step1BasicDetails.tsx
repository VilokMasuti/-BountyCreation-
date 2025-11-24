'use client';

import { useState } from 'react';
import { useBounty } from '@/hooks/useBounty';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Alert, AlertDescription } from '@/components/ui/alert';

import { Zap, AlertCircle } from 'lucide-react';

const BOUNTY_TYPES = ['Content', 'Design', 'Development', 'Marketing', 'Other'];
const IMPACT_CORES = ['Water', 'Earth', 'Social', 'Energy'];

export function Step1BasicDetails({ onNext }: { onNext: () => void }) {
  const { state, dispatch } = useBounty();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const e: Record<string, string> = {};

    if (!state.title.trim()) e.title = 'Title is required';
    else if (state.title.length > 40) e.title = 'Title must be under 40 characters';

    if (!state.description.trim()) e.description = 'Description is required';

    if (!state.type) e.type = 'Bounty type is required';

    if (!state.dominant_core) e.dominant_core = 'Impact core is required';

    if (state.mode === 'physical' && !state.location.trim())
      e.location = 'Location is required for physical mode';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) onNext();
  };

  const isFormValid =
    state.title.trim() &&
    state.title.length <= 40 &&
    state.description.trim() &&
    state.type &&
    state.dominant_core &&
    (state.mode === 'digital' || state.location.trim());

  return (
    <div className="space-y-8 animate-fade-in">
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Fix the highlighted fields to continue.</AlertDescription>
        </Alert>
      )}

      <Card className="bg-card/50 backdrop-blur-md border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Zap className="w-5 h-5 text-primary" />
            Bounty Details
          </CardTitle>
          <CardDescription>Provide the essential information for this bounty.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>

            <Input
              id="title"
              placeholder="e.g., Redesign homepage UI"
              value={state.title}
              maxLength={40}
              onChange={(e) => dispatch({ type: 'UPDATE', payload: { title: e.target.value } })}
              className="bg-background border-border/40"
            />

            <div className="flex justify-between text-xs">
              <span
                className={state.title.length > 30 ? 'text-amber-600' : 'text-muted-foreground'}
              >
                {state.title.length}/40 characters
              </span>

              {errors.title && <span className="text-destructive">{errors.title}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>

            <Textarea
              id="description"
              placeholder="Explain the task, scope, and expectations..."
              value={state.description}
              onChange={(e) =>
                dispatch({ type: 'UPDATE', payload: { description: e.target.value } })
              }
              className="min-h-[120px] resize-none bg-background border-border/40"
            />

            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Bounty Type <span className="text-destructive">*</span>
              </Label>

              <Select
                value={state.type}
                onValueChange={(v) => dispatch({ type: 'UPDATE', payload: { type: v } })}
              >
                <SelectTrigger className="bg-background border-border/40">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  {BOUNTY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <Label>
                Impact Core <span className="text-destructive">*</span>
              </Label>

              <Select
                value={state.dominant_core}
                onValueChange={(v) => dispatch({ type: 'UPDATE', payload: { dominant_core: v } })}
              >
                <SelectTrigger className="bg-background border-border/40">
                  <SelectValue placeholder="Select core" />
                </SelectTrigger>

                <SelectContent>
                  {IMPACT_CORES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.dominant_core && (
                <p className="text-xs text-destructive">{errors.dominant_core}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-md border-border/40">
        <CardHeader>
          <CardTitle className="text-lg">Bounty Mode</CardTitle>
        </CardHeader>

        <CardContent>
          <RadioGroup
            value={state.mode}
            onValueChange={(v) =>
              dispatch({ type: 'UPDATE', payload: { mode: v as 'digital' | 'physical' } })
            }
            className="space-y-3"
          >
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 cursor-pointer">
              <RadioGroupItem value="digital" id="digital" />
              <Label htmlFor="digital" className="flex-1 cursor-pointer">
                <span className="font-medium">Digital</span>
                <p className="text-xs text-muted-foreground">Work completed online</p>
              </Label>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 cursor-pointer">
              <RadioGroupItem value="physical" id="physical" />
              <Label htmlFor="physical" className="flex-1 cursor-pointer">
                <span className="font-medium">Physical</span>
                <p className="text-xs text-muted-foreground">Work completed at a real location</p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {state.mode === 'physical' && (
        <Card className="bg-card/50 backdrop-blur-md border-border/40 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Location</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <Label>
                Location <span className="text-destructive">*</span>
              </Label>

              <Input
                placeholder="City, Country or full address"
                value={state.location}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE', payload: { location: e.target.value } })
                }
                className="bg-background border-border/40"
              />

              {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} disabled={!isFormValid} className="min-w-[120px]">
          Next
        </Button>
      </div>
    </div>
  );
}
