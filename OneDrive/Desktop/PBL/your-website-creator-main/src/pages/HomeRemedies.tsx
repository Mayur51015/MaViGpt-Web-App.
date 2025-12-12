import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Leaf, Search, Clock, AlertCircle, X } from 'lucide-react';

import turmericMilkImg from '@/assets/remedies/turmeric-milk.jpg';
import gingerTeaImg from '@/assets/remedies/ginger-tea.jpg';
import tulsiKadhaImg from '@/assets/remedies/tulsi-kadha.jpg';
import jeeraWaterImg from '@/assets/remedies/jeera-water.jpg';
import honeyLemonImg from '@/assets/remedies/honey-lemon.jpg';
import amlaMurabbaImg from '@/assets/remedies/amla-murabba.jpg';
import ajwainWaterImg from '@/assets/remedies/ajwain-water.jpg';
import coconutOilImg from '@/assets/remedies/coconut-oil.jpg';

const remedies = [
  {
    name: 'Turmeric Milk (Haldi Doodh)',
    category: 'Immunity',
    image: turmericMilkImg,
    ingredients: ['1 cup warm milk', '1/2 tsp turmeric powder', 'Pinch of black pepper', 'Honey to taste'],
    instructions: [
      'Warm the milk in a saucepan over medium heat.',
      'Add turmeric powder and a pinch of black pepper.',
      'Stir well until the turmeric is fully dissolved.',
      'Remove from heat and let it cool slightly.',
      'Add honey to taste and stir well.',
      'Drink warm before bed for best results.'
    ],
    benefits: ['Anti-inflammatory properties', 'Boosts immunity', 'Aids restful sleep', 'Reduces cold and flu symptoms', 'Supports joint health'],
    prepTime: '5 mins',
  },
  {
    name: 'Ginger Tea (Adrak Chai)',
    category: 'Digestion',
    image: gingerTeaImg,
    ingredients: ['1 inch fresh ginger', '1 cup water', 'Tea leaves', 'Milk (optional)', 'Sugar or jaggery'],
    instructions: [
      'Crush or grate the fresh ginger.',
      'Boil water in a saucepan.',
      'Add crushed ginger and let it boil for 5 minutes.',
      'Add tea leaves and continue to boil for 2 minutes.',
      'Add milk if desired and bring to a boil.',
      'Strain into a cup and add sweetener to taste.'
    ],
    benefits: ['Relieves nausea and motion sickness', 'Aids digestion', 'Reduces cold and cough symptoms', 'Anti-inflammatory', 'Improves circulation'],
    prepTime: '10 mins',
  },
  {
    name: 'Tulsi Kadha',
    category: 'Immunity',
    image: tulsiKadhaImg,
    ingredients: ['10-12 fresh tulsi leaves', '1 inch ginger', '5 black peppercorns', '1 cup water', 'Jaggery or honey'],
    instructions: [
      'Wash the tulsi leaves thoroughly.',
      'Crush the ginger and black peppercorns.',
      'Add all ingredients except sweetener to a cup of water.',
      'Boil until the water reduces to half.',
      'Strain the kadha into a cup.',
      'Add jaggery or honey when slightly cooled.',
      'Drink warm, 1-2 times a day during cold season.'
    ],
    benefits: ['Powerful immunity booster', 'Improves respiratory health', 'Rich in antioxidants', 'Reduces stress', 'Natural antibacterial properties'],
    prepTime: '15 mins',
  },
  {
    name: 'Jeera Water',
    category: 'Digestion',
    image: jeeraWaterImg,
    ingredients: ['1 tsp cumin seeds (jeera)', '1 cup water'],
    instructions: [
      'Dry roast cumin seeds for 30 seconds until fragrant.',
      'Add cumin seeds to a cup of water.',
      'Boil the water for 5 minutes.',
      'Let it cool to a drinkable temperature.',
      'Strain and drink warm.',
      'Best consumed on an empty stomach in the morning.'
    ],
    benefits: ['Improves digestion', 'Reduces bloating and gas', 'Aids in weight loss', 'Detoxifies the body', 'Rich in iron'],
    prepTime: '5 mins',
  },
  {
    name: 'Honey Lemon Water',
    category: 'Detox',
    image: honeyLemonImg,
    ingredients: ['1 cup warm water (not hot)', '1 tbsp raw honey', 'Juice of half a lemon'],
    instructions: [
      'Heat water until warm (not boiling).',
      'Squeeze fresh lemon juice into the water.',
      'Add raw honey and stir well.',
      'Drink immediately on an empty stomach.',
      'Wait 30 minutes before eating breakfast.'
    ],
    benefits: ['Detoxifies the body', 'Aids in weight management', 'Boosts immunity', 'Improves skin health', 'Aids digestion'],
    prepTime: '2 mins',
  },
  {
    name: 'Amla Murabba',
    category: 'Immunity',
    image: amlaMurabbaImg,
    ingredients: ['500g fresh amla', '500g sugar or jaggery', '2 cups water', 'Cardamom powder', 'Saffron strands (optional)'],
    instructions: [
      'Wash and prick amla with a fork.',
      'Boil amla until slightly soft, then drain.',
      'Make sugar syrup with water until one-string consistency.',
      'Add amla to the syrup and cook on low heat.',
      'Add cardamom and saffron.',
      'Let it cool and store in a glass jar.',
      'Eat one amla daily in the morning.'
    ],
    benefits: ['Extremely rich in Vitamin C', 'Strengthens immunity', 'Promotes healthy hair and skin', 'Improves eye health', 'Natural antioxidant'],
    prepTime: 'Several weeks',
  },
  {
    name: 'Ajwain Water',
    category: 'Digestion',
    image: ajwainWaterImg,
    ingredients: ['1 tsp ajwain (carom seeds)', '1 cup water'],
    instructions: [
      'Add ajwain seeds to a cup of water.',
      'Bring to a boil.',
      'Let it simmer for 5 minutes.',
      'Strain the water into a cup.',
      'Drink warm after meals.',
      'Can be stored and consumed throughout the day.'
    ],
    benefits: ['Relieves gas and bloating', 'Improves digestion', 'Reduces acidity', 'Helps with stomach pain', 'Aids respiratory health'],
    prepTime: '5 mins',
  },
  {
    name: 'Coconut Oil Pulling',
    category: 'Oral Health',
    image: coconutOilImg,
    ingredients: ['1 tbsp virgin coconut oil'],
    instructions: [
      'Take coconut oil on an empty stomach.',
      'Put the oil in your mouth.',
      'Swish the oil around for 15-20 minutes.',
      'Do not swallow the oil.',
      'Spit into a trash can (not sink).',
      'Rinse mouth with warm water.',
      'Brush teeth as normal.'
    ],
    benefits: ['Improves oral health', 'Whitens teeth naturally', 'Removes toxins', 'Reduces harmful bacteria', 'Freshens breath'],
    prepTime: '20 mins',
  },
];

const categories = ['All', 'Immunity', 'Digestion', 'Detox', 'Oral Health'];

interface Remedy {
  name: string;
  category: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  prepTime: string;
}

const HomeRemedies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy | null>(null);

  const filteredRemedies = remedies.filter(remedy => {
    const matchesSearch = remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         remedy.benefits.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || remedy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Home Remedies</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Traditional home remedies passed down through generations. Natural solutions for everyday health concerns.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search remedies..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRemedies.map((remedy, index) => (
              <Card 
                key={index} 
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => setSelectedRemedy(remedy)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={remedy.image} 
                    alt={remedy.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {remedy.category}
                  </span>
                  <h3 className="font-semibold text-foreground mt-2 line-clamp-2">{remedy.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                    <Clock className="h-3 w-3" />
                    {remedy.prepTime}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Important Note</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  These remedies are based on traditional knowledge. While generally safe, please consult a healthcare 
                  professional if symptoms persist or if you have any medical conditions or allergies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Remedy Detail Modal */}
      <Dialog open={!!selectedRemedy} onOpenChange={() => setSelectedRemedy(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedRemedy && (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">{selectedRemedy.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={selectedRemedy.image} 
                    alt={selectedRemedy.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-center">
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {selectedRemedy.category}
                  </span>
                  <h2 className="text-2xl font-bold text-foreground mt-3">{selectedRemedy.name}</h2>
                  <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    Prep Time: {selectedRemedy.prepTime}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      Ingredients
                    </h3>
                    <ul className="space-y-2">
                      {selectedRemedy.ingredients.map((ing, i) => (
                        <li key={i} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">How to Prepare</h3>
                    <ol className="space-y-2">
                      {selectedRemedy.instructions.map((step, i) => (
                        <li key={i} className="text-muted-foreground flex items-start gap-3">
                          <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {selectedRemedy.benefits.map((benefit, i) => (
                        <li key={i} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeRemedies;