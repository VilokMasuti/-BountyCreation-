/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useBounty } from '@/hooks/useBounty';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Gift, Calendar, Leaf, AlertCircle } from 'lucide-react';

const CURRENCIES = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'CAD', 'AUD'];
const SDGS = [
  'No Poverty',
  'Zero Hunger',
  'Good Health',
  'Quality Education',
  'Gender Equality',
  'Clean Water',
  'Affordable Energy',
  'Decent Work',
  'Industry Innovation',
  'Reduced Inequalities',
  'Sustainable Cities',
  'Responsible Consumption',
  'Climate Action',
  'Life Below Water',
  'Life on Land',
  'Peace & Justice',
  'Partnerships',
];

export function Step2RewardsTimeline({ onNext, onBack }: any) {
  const { state, dispatch } = useBounty();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    // -------- REWARD --------
    if (!state.reward.currency) newErrors.currency = 'Currency is required';
    if (!state.reward.amount || state.reward.amount <= 0)
      newErrors.amount = 'Amount must be greater than 0';
    if (!state.reward.winners || state.reward.winners <= 0)
      newErrors.winners = 'Number of winners must be greater than 0';

    // -------- TIMELINE --------
    if (!state.timeline.expiration_date) newErrors.expiration_date = 'Expiration date is required';

    // Estimated completion
    if (
      state.timeline.estimated_completion.days === 0 &&
      state.timeline.estimated_completion.hours === 0 &&
      state.timeline.estimated_completion.minutes === 0
    ) {
      newErrors.estimated = 'Completion estimate required';
    }

    // -------- IMPACT CERT --------
    if (state.hasImpactCertificate && !state.impactBriefMessage.trim())
      newErrors.impactBrief = 'Impact brief required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) onNext();
  };

  const toggleSDG = (sdg: string) => {
    const updated = state.sdgs.includes(sdg)
      ? state.sdgs.filter((s) => s !== sdg)
      : [...state.sdgs, sdg];

    dispatch({ type: 'UPDATE_SDGS', payload: updated });
  };

  return (
    <div className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Please fix all highlighted fields to continue.</AlertDescription>
        </Alert>
      )}

      {/* ================== REWARD ================== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" /> Reward
          </CardTitle>
          <CardDescription>Set compensation details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Currency */}
            <div className="space-y-2">
              <Label>Currency *</Label>
              <Select
                value={state.reward.currency}
                onValueChange={(v) => dispatch({ type: 'UPDATE_REWARD', payload: { currency: v } })}
              >
                <SelectTrigger className={errors.currency ? 'border-destructive' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.currency && <p className="text-xs text-destructive">{errors.currency}</p>}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label>Amount *</Label>
              <Input
                type="number"
                value={state.reward.amount || ''}
                className={errors.amount ? 'border-destructive' : ''}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_REWARD',
                    payload: { amount: Number(e.target.value) || 0 },
                  })
                }
              />
              {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
            </div>

            {/* Winners */}
            <div className="space-y-2">
              <Label>Winners *</Label>
              <Input
                type="number"
                className={errors.winners ? 'border-destructive' : ''}
                value={state.reward.winners || ''}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_REWARD',
                    payload: { winners: Number(e.target.value) || 1 },
                  })
                }
              />
              {errors.winners && <p className="text-xs text-destructive">{errors.winners}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================== TIMELINE ================== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Timeline
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Expiration date */}
          <div className="space-y-2">
            <Label>Expiration Date *</Label>
            <Input
              type="date"
              className={errors.expiration_date ? 'border-destructive' : ''}
              value={state.timeline.expiration_date}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_TIMELINE',
                  payload: { expiration_date: e.target.value },
                })
              }
            />
            {errors.expiration_date && (
              <p className="text-xs text-destructive">{errors.expiration_date}</p>
            )}
          </div>

          {/* Estimated completion */}
          <div className="grid grid-cols-3 gap-3">
            {['days', 'hours', 'minutes'].map((unit) => (
              <div key={unit}>
                <Label className="capitalize">{unit}</Label>
                <Input
                  type="number"
                  className={errors.estimated ? 'border-destructive' : ''}
                  value={(state.timeline.estimated_completion as any)[unit]}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_ESTIMATED_COMPLETION',
                      payload: { [unit]: Number(e.target.value) || 0 },
                    })
                  }
                />
              </div>
            ))}
          </div>

          {errors.estimated && <p className="text-xs text-destructive">{errors.estimated}</p>}
        </CardContent>
      </Card>

      {/* IMPACT CERTIFICATE */}
      <Card>
        <CardHeader>
          <CardTitle>Impact Certificate</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-3 items-center">
            <Checkbox
              checked={state.hasImpactCertificate}
              onCheckedChange={(checked) =>
                dispatch({
                  type: 'UPDATE',
                  payload: { hasImpactCertificate: Boolean(checked) },
                })
              }
            />
            <Label>Include impact certificate</Label>
          </div>

          {state.hasImpactCertificate && (
            <div className="space-y-2">
              <Label>Impact Brief *</Label>
              <Input
                className={errors.impactBrief ? 'border-destructive' : ''}
                value={state.impactBriefMessage}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE',
                    payload: { impactBriefMessage: e.target.value },
                  })
                }
              />
              {errors.impactBrief && (
                <p className="text-xs text-destructive">{errors.impactBrief}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================== SDGS ================== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" /> SDGs
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SDGS.map((sdg) => (
              <div key={sdg} className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={state.sdgs.includes(sdg)}
                  onCheckedChange={() => toggleSDG(sdg)}
                />
                <Label>{sdg}</Label>
              </div>
            ))}
          </div>

          {state.sdgs.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-3">
              {state.sdgs.map((sdg) => (
                <Badge key={sdg} onClick={() => toggleSDG(sdg)} className="cursor-pointer">
                  {sdg} ✕
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* BUTTONS */}
      <div className="flex gap-3 pt-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Next
        </Button>
      </div>
    </div>
  );
}
