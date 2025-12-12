import { Cloud, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SeasonalTip() {
  return (
    <section className="py-6 bg-muted">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border/50 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Cloud className="h-5 w-5" />
              <span className="text-sm">Mumbai, Maharashtra</span>
            </div>
            <div className="text-2xl font-bold text-foreground">28°C</div>
            <span className="text-sm text-muted-foreground">Partly Cloudy</span>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-secondary" />
              <span className="font-medium text-foreground">Seasonal Eating Tip</span>
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">
              Perfect weather for cooling foods like cucumber and coconut water
            </p>
          </div>

          <Button variant="secondary" size="sm">
            View Seasonal Foods
          </Button>
        </div>
      </div>
    </section>
  );
}
