import { Star } from 'lucide-react';

const experts = [
  {
    name: 'Dr. Meera Patel',
    title: 'Clinical Nutritionist',
    avatar: 'MP',
  },
  {
    name: 'Dr. Arjun Reddy',
    title: 'Ayurvedic Practitioner',
    avatar: 'AR',
  },
  {
    name: 'Dr. Kavita Singh',
    title: 'Dietetics Specialist',
    avatar: 'KS',
  },
];

export function ExpertsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our content is reviewed and validated by certified nutritionists, Ayurvedic practitioners, and healthcare experts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {experts.map((expert) => (
            <div
              key={expert.name}
              className="text-center p-6 bg-card rounded-xl border border-border/50 shadow-sm"
            >
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-primary-foreground font-bold text-lg">
                {expert.avatar}
              </div>
              <h4 className="font-semibold text-foreground">{expert.name}</h4>
              <p className="text-sm text-muted-foreground">{expert.title}</p>
              <div className="flex justify-center gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
