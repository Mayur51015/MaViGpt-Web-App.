import { Leaf, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  resources: [
    { label: 'Nutrition Education', href: '/nutrition-education' },
    { label: 'Home Remedies', href: '/home-remedies' },
    { label: 'Diet Planning', href: '/diet-planning' },
    { label: 'Local Foods Guide', href: '/local-foods' },
  ],
  tools: [
    { label: 'BMI Calculator', href: '/bmi-calculator' },
    { label: 'Symptom Checker', href: '/symptom-checker' },
    { label: 'Daily Health Tip', href: '/daily-health-tip' },
    { label: 'Expert Resources', href: '/expert-resources' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Disclaimer', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gray-50">NutriRoots</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              Bridging traditional wisdom and modern nutrition. Empowering communities through culturally-relevant health guidance.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-gray-800 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-50 mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-gray-50 mb-4">Tools</h4>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-50 mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© 2024 NutriRoots. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
