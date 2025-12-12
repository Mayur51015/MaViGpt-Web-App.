import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Search, Leaf, AlertCircle } from 'lucide-react';

const symptoms = [
  {
    name: 'Headache',
    remedies: [
      { title: 'Ginger Tea', description: 'Boil fresh ginger in water for 10 mins. Add honey and drink warm.' },
      { title: 'Peppermint Oil', description: 'Apply diluted peppermint oil to temples and massage gently.' },
      { title: 'Stay Hydrated', description: 'Drink plenty of water as dehydration often causes headaches.' },
    ],
  },
  {
    name: 'Cold & Cough',
    remedies: [
      { title: 'Turmeric Milk', description: 'Add 1 tsp turmeric to warm milk. Drink before bed for relief.' },
      { title: 'Honey & Lemon', description: 'Mix honey and lemon in warm water. Soothes throat and boosts immunity.' },
      { title: 'Steam Inhalation', description: 'Inhale steam with eucalyptus oil to clear nasal congestion.' },
    ],
  },
  {
    name: 'Indigestion',
    remedies: [
      { title: 'Jeera Water', description: 'Boil cumin seeds in water. Drink warm after meals.' },
      { title: 'Ajwain', description: 'Chew a pinch of ajwain (carom seeds) with warm water.' },
      { title: 'Buttermilk', description: 'Drink buttermilk with roasted cumin and salt after lunch.' },
    ],
  },
  {
    name: 'Fatigue',
    remedies: [
      { title: 'Ashwagandha', description: 'Take ashwagandha supplement or mix powder in warm milk.' },
      { title: 'Dates & Almonds', description: 'Eat 2-3 dates with almonds for natural energy boost.' },
      { title: 'Coconut Water', description: 'Drink fresh coconut water to replenish electrolytes.' },
    ],
  },
  {
    name: 'Joint Pain',
    remedies: [
      { title: 'Turmeric Paste', description: 'Apply warm turmeric paste to affected joints.' },
      { title: 'Ginger Compress', description: 'Use warm ginger compress on painful areas.' },
      { title: 'Sesame Oil Massage', description: 'Warm sesame oil massage improves circulation.' },
    ],
  },
  {
    name: 'Stress & Anxiety',
    remedies: [
      { title: 'Brahmi Tea', description: 'Drink brahmi tea to calm the mind and improve focus.' },
      { title: 'Tulsi Leaves', description: 'Chew 4-5 fresh tulsi leaves or drink tulsi tea.' },
      { title: 'Deep Breathing', description: 'Practice pranayama for 10-15 minutes daily.' },
    ],
  },
];

const SymptomChecker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState<typeof symptoms[0] | null>(null);

  const filteredSymptoms = symptoms.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Symptom Checker</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find traditional home remedies for common symptoms. These are time-tested solutions passed down through generations.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search symptoms..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {filteredSymptoms.map((symptom) => (
              <Button
                key={symptom.name}
                variant={selectedSymptom?.name === symptom.name ? 'default' : 'outline'}
                className="h-auto py-4 justify-start"
                onClick={() => setSelectedSymptom(symptom)}
              >
                <Leaf className="h-5 w-5 mr-2" />
                {symptom.name}
              </Button>
            ))}
          </div>

          {selectedSymptom && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Remedies for {selectedSymptom.name}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {selectedSymptom.remedies.map((remedy, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-primary" />
                        {remedy.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{remedy.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Disclaimer</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  These home remedies are for informational purposes only and should not replace professional medical advice. 
                  If symptoms persist or worsen, please consult a healthcare professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SymptomChecker;
