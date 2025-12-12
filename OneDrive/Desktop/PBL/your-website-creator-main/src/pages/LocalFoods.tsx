import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Leaf, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const regions = [
  {
    name: 'North India',
    foods: [
      { name: 'Sarson ka Saag', benefits: 'Rich in iron, calcium, and vitamins A & C. Great for bone health.' },
      { name: 'Makki ki Roti', benefits: 'High fiber, gluten-free, good source of energy and B vitamins.' },
      { name: 'Rajma', benefits: 'Excellent protein source, high in fiber, helps regulate blood sugar.' },
      { name: 'Lassi', benefits: 'Probiotic-rich, aids digestion, cooling effect on the body.' },
    ],
  },
  {
    name: 'South India',
    foods: [
      { name: 'Sambar', benefits: 'Protein-rich lentils with vegetables, anti-inflammatory spices.' },
      { name: 'Coconut Chutney', benefits: 'Healthy fats, antimicrobial properties, aids digestion.' },
      { name: 'Ragi Mudde', benefits: 'High calcium, iron-rich, excellent for diabetics.' },
      { name: 'Rasam', benefits: 'Digestive aid, immunity booster, rich in antioxidants.' },
    ],
  },
  {
    name: 'West India',
    foods: [
      { name: 'Dhokla', benefits: 'Fermented food, probiotic benefits, low calorie, protein-rich.' },
      { name: 'Thepla', benefits: 'Fiber-rich fenugreek leaves, good for digestion.' },
      { name: 'Poha', benefits: 'Light on stomach, iron-fortified, easy to digest.' },
      { name: 'Kokum Sharbat', benefits: 'Cooling, aids digestion, rich in hydroxycitric acid.' },
    ],
  },
  {
    name: 'East India',
    foods: [
      { name: 'Machher Jhol', benefits: 'Omega-3 rich fish curry, good for heart and brain.' },
      { name: 'Posto', benefits: 'Poppy seeds rich in minerals, calming properties.' },
      { name: 'Chura Dahi', benefits: 'Probiotic curd with flattened rice, easy on digestion.' },
      { name: 'Bamboo Shoot', benefits: 'Low calorie, high fiber, rich in potassium.' },
    ],
  },
];

const LocalFoods = () => {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const allFoods = regions.flatMap(r => r.foods.map(f => ({ ...f, region: r.name })));
  const filteredFoods = searchTerm 
    ? allFoods.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : selectedRegion.foods;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Local Foods Guide</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover the nutritional benefits of regional Indian foods. Eating local is healthier, sustainable, and connects you to your roots.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search foods..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {!searchTerm && (
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {regions.map((region) => (
                <Button
                  key={region.name}
                  variant={selectedRegion.name === region.name ? 'default' : 'outline'}
                  onClick={() => setSelectedRegion(region)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {region.name}
                </Button>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {filteredFoods.map((food, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    {food.name}
                    {searchTerm && 'region' in food && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground ml-auto">
                        {(food as { region: string }).region}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{food.benefits}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/10 to-green-100 dark:from-primary/20 dark:to-green-900/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Why Eat Local?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">🌱 Fresher & Nutritious</h4>
                <p className="text-sm text-muted-foreground">Local foods travel less, retaining more nutrients and flavor.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">🌍 Sustainable</h4>
                <p className="text-sm text-muted-foreground">Reduces carbon footprint and supports local farmers.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">💪 Suited to Climate</h4>
                <p className="text-sm text-muted-foreground">Regional foods are naturally suited to your body's needs in that climate.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LocalFoods;
