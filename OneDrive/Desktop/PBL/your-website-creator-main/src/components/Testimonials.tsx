import { Star, TrendingUp, Heart, Users } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    avatar: 'PS',
    rating: 5,
    text: 'NeutriRoots helped me understand how to combine traditional foods with modern nutrition. I lost 12kg in 4 months while enjoying my favorite regional dishes!',
    result: 'Lost 12kg in 4 months',
    resultIcon: TrendingUp,
  },
  {
    name: 'Rajesh Kumar',
    location: 'Bangalore',
    avatar: 'RK',
    rating: 5,
    text: 'The home remedies database is a treasure trove! I found natural solutions for my digestion issues that actually work. The scientific backing gives me confidence.',
    result: 'Improved digestion health',
    resultIcon: Heart,
  },
  {
    name: 'Anita Desai',
    location: 'Pune',
    avatar: 'AD',
    rating: 5,
    text: "As a mother of two, the personalized diet planning tools have been life-changing. My whole family now eats healthier while staying connected to our cultural roots.",
    result: 'Transformed family nutrition',
    resultIcon: Users,
  },
];

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '15K+', label: 'Success Stories' },
  { value: '4.8/5', label: 'Average Rating' },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Community Success Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real people, real results. Discover how NeutriRoots is transforming lives through traditional wisdom and modern nutrition.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-xl p-6 shadow-md border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                <testimonial.resultIcon className="h-4 w-4" />
                {testimonial.result}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Join thousands of satisfied community members
          </p>
          <div className="flex justify-center gap-8 md:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
