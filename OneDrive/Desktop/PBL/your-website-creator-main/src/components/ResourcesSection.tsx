import { BookOpen, Home, Utensils, Users, MapPin } from 'lucide-react';
import turmericMilk from '@/assets/turmeric-milk.jpg';
import seasonalVegetables from '@/assets/seasonal-vegetables.jpg';
import ayurvedicHerbs from '@/assets/ayurvedic-herbs.jpg';
import heroSpices from '@/assets/hero-spices.jpg';
import heroVegetables from '@/assets/hero-vegetables.jpg';

const resources = [
  {
    icon: BookOpen,
    title: 'Nutrition Education',
    description: 'Learn about macronutrients, micronutrients, and balanced eating with culturally relevant examples.',
    image: heroVegetables,
    color: 'bg-orange-500',
  },
  {
    icon: Home,
    title: 'Home Remedies',
    description: 'Discover validated traditional remedies backed by science for everyday health concerns.',
    image: heroSpices,
    color: 'bg-secondary',
  },
  {
    icon: Utensils,
    title: 'Diet Planning',
    description: 'Create personalized meal plans with BMI calculators and nutrition tracking tools.',
    image: turmericMilk,
    color: 'bg-orange-500',
  },
  {
    icon: Users,
    title: 'Expert Resources',
    description: 'Access professional consultations, webinars, and research-backed wellness guidance.',
    image: seasonalVegetables,
    color: 'bg-secondary',
  },
  {
    icon: MapPin,
    title: 'Local Foods Guide',
    description: 'Explore regional ingredients and traditional cooking methods with complete nutritional profiles.',
    image: ayurvedicHerbs,
    color: 'bg-orange-500',
  },
];

export function ResourcesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Explore Our Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and knowledge to support your wellness journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div
              key={resource.title}
              className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${
                index === 3 || index === 4 ? 'md:col-span-1' : ''
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className={`inline-flex p-2 rounded-lg ${resource.color} mb-3`}>
                  <resource.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-gray-50 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{resource.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
