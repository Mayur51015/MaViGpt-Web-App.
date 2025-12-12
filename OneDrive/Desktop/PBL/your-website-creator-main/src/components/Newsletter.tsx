import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-orange-600">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex p-3 rounded-full bg-primary-foreground/10 mb-6">
            <Mail className="h-6 w-6 text-primary-foreground" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Get Daily Health Tips
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Receive personalized nutrition advice and validated home remedies directly in your inbox
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-primary-foreground">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-primary-foreground text-foreground border-0 h-12"
                required
              />
              <Button
                type="submit"
                variant="outline"
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0"
              >
                Subscribe Now
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-primary-foreground/70">
            <span>50K+ Daily Subscribers</span>
            <span>•</span>
            <span>Free Forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}
