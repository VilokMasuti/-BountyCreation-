'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Users, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useBounty } from '@/hooks/useBounty';

export function Step3BackerInfo({
  onBack,
  onSubmit,
  isSubmitting = false,
}: {
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}) {
  const { state, dispatch } = useBounty();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (state.has_backer) {
      if (!state.backer.name.trim()) newErrors.backer_name = 'Backer name is required';
      if (!state.backer.logo.trim()) {
        newErrors.backer_logo = 'Backer logo URL is required';
      } else {
        try {
          new URL(state.backer.logo);
        } catch {
          newErrors.backer_logo = 'Enter a valid URL';
        }
      }
    }

    if (!state.terms_accepted) {
      newErrors.terms = 'You must accept the terms to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep()) onSubmit();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ERROR ALERT */}
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Fix all errors before continuing</AlertDescription>
        </Alert>
      )}

      {/* BACKER SECTION */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Backer Information
          </CardTitle>
          <CardDescription>Add backer details (optional)</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Toggle */}
          <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/20">
            <Checkbox
              checked={state.has_backer}
              onCheckedChange={(checked) =>
                dispatch({ type: 'UPDATE', payload: { has_backer: Boolean(checked) } })
              }
            />
            <Label className="cursor-pointer flex-1">
              <span className="font-medium">Add a Backer</span>
              <p className="text-xs text-muted-foreground">Show your sponsor or organization</p>
            </Label>

            {/* STATUS BADGE */}
            {state.has_backer ? (
              <Badge className="bg-green-600 text-white">Enabled</Badge>
            ) : (
              <Badge variant="outline">Optional</Badge>
            )}
          </div>

          {/* Backer Fields */}
          {state.has_backer && (
            <div className="p-4 rounded-lg bg-muted/10 border space-y-4 animate-fade-in">
              {/* NAME */}
              <div className="space-y-2">
                <Label>
                  Backer Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  placeholder="Organization name"
                  value={state.backer.name}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE',
                      payload: { backer: { ...state.backer, name: e.target.value } },
                    })
                  }
                />
                {errors.backer_name && (
                  <p className="text-xs text-destructive">{errors.backer_name}</p>
                )}
              </div>

              {/* LOGO */}
              <div className="space-y-2">
                <Label>
                  Logo URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  placeholder="https://example.com/logo.png"
                  value={state.backer.logo}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE',
                      payload: { backer: { ...state.backer, logo: e.target.value } },
                    })
                  }
                />

                {errors.backer_logo && (
                  <p className="text-xs text-destructive">{errors.backer_logo}</p>
                )}

                {/* Preview */}
                {state.backer.logo && !errors.backer_logo && (
                  <div className="mt-3 border rounded-lg bg-background p-3 flex justify-center">
                    <img
                      src={state.backer.logo}
                      className="h-12 object-contain"
                      alt="Backer Logo"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>

              {/* MESSAGE */}
              <div className="space-y-2">
                <Label>Message (optional)</Label>
                <Textarea
                  placeholder="Short message from your sponsor"
                  value={state.backer.message}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE',
                      payload: { backer: { ...state.backer, message: e.target.value } },
                    })
                  }
                  className="resize-none min-h-[100px]"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* TERMS */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Review & Confirm</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/20">
            <Checkbox
              checked={state.terms_accepted}
              onCheckedChange={(checked) =>
                dispatch({ type: 'UPDATE', payload: { terms_accepted: Boolean(checked) } })
              }
            />

            <Label className="cursor-pointer flex-1">
              I agree to the Terms & Conditions
              <span className="text-destructive">*</span>
              <p className="text-xs text-muted-foreground mt-1">
                You must confirm before submitting
              </p>
            </Label>

            {state.terms_accepted ? (
              <Badge className="bg-green-600 text-white">Accepted</Badge>
            ) : (
              <Badge variant="destructive">Required</Badge>
            )}
          </div>

          {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}
        </CardContent>
      </Card>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="sm:w-auto w-full"
        >
          Back
        </Button>

        <Button onClick={handleSubmit} disabled={isSubmitting} className="sm:w-auto w-full gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Create Bounty
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
