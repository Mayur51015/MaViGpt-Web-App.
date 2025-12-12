import { ChevronRight, Eye } from 'lucide-react';
import turmericMilk from '@/assets/turmeric-milk.jpg';
import seasonalVegetables from '@/assets/seasonal-vegetables.jpg';
import ayurvedicHerbs from '@/assets/ayurvedic-herbs.jpg';

const topics = [
  {
    image: turmericMilk,
    badge: 'Home Remedies',
    title: 'Turmeric Milk Benefits for Winter Immunity',
    views: '12.5K views',
  },
  {
    image: seasonalVegetables,
    badge: 'Seasonal Eating',
    title: 'Complete Guide to Seasonal Eating in India',
    views: '8.3K views',
  },
  {
    image: ayurvedicHerbs,
    badge: 'Ayurveda',
    title: 'Ayurvedic Diet Planning for Vata Balance',
    views: '9.7K views',
  },
];

export function TrendingTopics() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Trending Topics</h2>
          <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <article
              key={topic.title}
              className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                  {topic.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {topic.views}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
