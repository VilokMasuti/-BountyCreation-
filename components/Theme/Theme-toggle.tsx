'use client';
import { useThemeToggle } from '../ui/skiper-ui/skiper26';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { toggleTheme, isDark } = useThemeToggle({
    variant: 'circle',
    start: 'left-right',
  });

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="transition-smooth">
      {isDark ? (
        <Moon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" />
      ) : (
        <Sun className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" />
      )}
    </Button>
  );
}
