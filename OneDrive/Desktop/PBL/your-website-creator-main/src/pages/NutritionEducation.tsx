import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Apple, Droplets, Dumbbell, Moon, Heart } from 'lucide-react';

const topics = [
  {
    icon: Apple,
    title: 'Macronutrients',
    description: 'Understanding proteins, carbohydrates, and fats',
    content: 'Macronutrients are the building blocks of nutrition. Proteins build and repair tissues, carbohydrates provide energy, and fats support cell growth and hormone production. A balanced Indian diet naturally includes all three through dal (protein), rice/roti (carbs), and ghee/oil (fats).',
    tips: ['Include dal or legumes in every meal', 'Choose whole grains over refined', 'Use healthy fats like mustard oil or ghee in moderation'],
  },
  {
    icon: Droplets,
    title: 'Micronutrients',
    description: 'Vitamins and minerals essential for health',
    content: 'Micronutrients include vitamins and minerals that are crucial for various body functions. Indian cuisine is rich in micronutrients through spices, vegetables, and traditional preparations.',
    tips: ['Eat colorful vegetables daily', 'Include iron-rich foods like spinach and jaggery', 'Get vitamin D through morning sunlight'],
  },
  {
    icon: Dumbbell,
    title: 'Protein Sources',
    description: 'Plant and animal proteins in Indian diet',
    content: 'India offers diverse protein sources for both vegetarians and non-vegetarians. Combining cereals with pulses (like dal-chawal) creates complete proteins with all essential amino acids.',
    tips: ['Combine dal with rice for complete protein', 'Include paneer, tofu, or eggs', 'Try sprouted legumes for better absorption'],
  },
  {
    icon: Moon,
    title: 'Ayurvedic Nutrition',
    description: 'Ancient wisdom for modern health',
    content: 'Ayurveda emphasizes eating according to your body type (dosha), the season, and time of day. It promotes mindful eating, proper food combinations, and using food as medicine.',
    tips: ['Eat your largest meal at lunch', 'Avoid cold drinks with meals', 'Include all six tastes in your diet'],
  },
  {
    icon: Heart,
    title: 'Gut Health',
    description: 'The importance of digestive wellness',
    content: 'Good gut health is foundational to overall wellness. Traditional Indian foods like curd, pickles, and fermented batters are natural probiotics that support gut microbiome.',
    tips: ['Include curd or buttermilk daily', 'Eat fermented foods like idli, dosa', 'Use digestive spices like cumin and ginger'],
  },
  {
    icon: BookOpen,
    title: 'Meal Planning',
    description: 'Creating balanced, nutritious meals',
    content: 'A well-planned Indian meal follows the thali concept - a balanced plate with grains, protein, vegetables, and accompaniments. This ensures variety and complete nutrition.',
    tips: ['Follow the thali concept', 'Prep ingredients on weekends', 'Keep healthy snacks ready'],
  },
];

const NutritionEducation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Nutrition Education</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Learn the fundamentals of nutrition with a focus on Indian dietary wisdom and modern science.
            </p>
          </div>

          <div className="space-y-6">
            {topics.map((topic, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <topic.icon className="h-5 w-5 text-primary" />
                    </div>
                    {topic.title}
                  </CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{topic.content}</p>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Quick Tips:</h4>
                    <ul className="space-y-1">
                      {topic.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NutritionEducation;
