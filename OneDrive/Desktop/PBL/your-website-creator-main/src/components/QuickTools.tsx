import { Calculator, Heart, Lightbulb, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    icon: Calculator,
    title: 'BMI Calculator',
    description: 'Check your body mass index',
    color: 'text-primary',
    bgColor: 'bg-green-50',
    href: '/bmi-calculator',
  },
  {
    icon: Heart,
    title: 'Symptom Checker',
    description: 'Find remedies for symptoms',
    color: 'text-primary',
    bgColor: 'bg-green-50',
    href: '/symptom-checker',
  },
  {
    icon: Lightbulb,
    title: 'Daily Health Tip',
    description: 'Get personalized advice',
    color: 'text-primary',
    bgColor: 'bg-green-50',
    href: '/daily-health-tip',
  },
  {
    icon: MapPin,
    title: 'Local Foods',
    description: 'Discover regional nutrition',
    color: 'text-primary',
    bgColor: 'bg-green-50',
    href: '/local-foods',
  },
];

export function QuickTools() {
  return (
    <section className="relative -mt-16 z-30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <Link
              key={tool.title}
              to={tool.href}
              className="group bg-card rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-border/50 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex p-3 rounded-lg ${tool.bgColor} mb-3`}>
                <tool.icon className={`h-5 w-5 ${tool.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
