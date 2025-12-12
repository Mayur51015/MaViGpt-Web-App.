import { useState } from 'react';
import { Menu, X, ChevronDown, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Nutrition Education', href: '/nutrition-education' },
  { label: 'Home Remedies', href: '/home-remedies' },
  { label: 'Diet Planning', href: '/diet-planning' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">NutriRoots</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link to="/expert-resources">
            <Button variant="navCta" size="default">
              Get Expert Guidance
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Link to="/expert-resources" onClick={() => setIsMenuOpen(false)}>
                <Button variant="navCta" size="default" className="w-full">
                  Get Expert Guidance
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
