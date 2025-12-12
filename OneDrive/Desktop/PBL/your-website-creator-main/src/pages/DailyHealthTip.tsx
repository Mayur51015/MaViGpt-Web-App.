import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, RefreshCw, Share2, Bookmark, Sun, Moon, Droplets } from 'lucide-react';

const healthTips = [
  {
    category: 'Morning Routine',
    icon: Sun,
    tip: 'Start your day with a glass of warm water with lemon to kickstart digestion and hydrate your body.',
    benefit: 'Boosts metabolism and aids detoxification',
  },
  {
    category: 'Nutrition',
    icon: Droplets,
    tip: 'Include seasonal fruits and vegetables in your diet. They are fresher, more nutritious, and easier on your wallet.',
    benefit: 'Better nutrition and environmental sustainability',
  },
  {
    category: 'Ayurveda',
    icon: Moon,
    tip: 'Eat your largest meal at lunch when your digestive fire (Agni) is strongest, according to Ayurvedic principles.',
    benefit: 'Improved digestion and energy levels',
  },
  {
    category: 'Hydration',
    icon: Droplets,
    tip: 'Drink water 30 minutes before meals, not during. This helps in better digestion and nutrient absorption.',
    benefit: 'Enhanced digestive efficiency',
  },
  {
    category: 'Sleep',
    icon: Moon,
    tip: 'Avoid screens 1 hour before bed. Try drinking warm milk with a pinch of nutmeg for better sleep.',
    benefit: 'Improved sleep quality and recovery',
  },
  {
    category: 'Movement',
    icon: Sun,
    tip: 'Practice Surya Namaskar (Sun Salutation) in the morning. Just 10 minutes can energize your entire day.',
    benefit: 'Full body workout and mental clarity',
  },
  {
    category: 'Mindfulness',
    icon: Moon,
    tip: 'Take 5 deep breaths before each meal. This activates your parasympathetic nervous system for better digestion.',
    benefit: 'Reduced stress and improved digestion',
  },
  {
    category: 'Spices',
    icon: Sun,
    tip: 'Add a pinch of turmeric to your cooking daily. It has powerful anti-inflammatory and antioxidant properties.',
    benefit: 'Reduced inflammation and better immunity',
  },
];

const DailyHealthTip = () => {
  const [currentTip, setCurrentTip] = useState(healthTips[0]);
  const [savedTips, setSavedTips] = useState<string[]>([]);

  useEffect(() => {
    // Get tip based on current date
    const today = new Date().getDate();
    setCurrentTip(healthTips[today % healthTips.length]);
  }, []);

  const getNewTip = () => {
    const randomIndex = Math.floor(Math.random() * healthTips.length);
    setCurrentTip(healthTips[randomIndex]);
  };

  const saveTip = () => {
    if (!savedTips.includes(currentTip.tip)) {
      setSavedTips([...savedTips, currentTip.tip]);
    }
  };

  const shareTip = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Health Tip from NutriRoots',
        text: currentTip.tip,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Daily Health Tip</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Simple, actionable health tips rooted in traditional wisdom to improve your daily wellbeing.
            </p>
          </div>

          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-green-600 p-6 text-primary-foreground">
              <div className="flex items-center gap-2 mb-2">
                <currentTip.icon className="h-5 w-5" />
                <span className="text-sm font-medium opacity-90">{currentTip.category}</span>
              </div>
              <h2 className="text-xl font-semibold">Today's Tip</h2>
            </div>
            <CardContent className="p-8">
              <p className="text-xl text-foreground mb-6 leading-relaxed">{currentTip.tip}</p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Benefit:</span> {currentTip.benefit}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={getNewTip} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Tip
                </Button>
                <Button onClick={saveTip} variant="outline">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={shareTip} variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-bold text-foreground mb-4">All Health Tips</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {healthTips.map((tip, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all hover:shadow-md ${currentTip.tip === tip.tip ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setCurrentTip(tip)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <tip.icon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">{tip.category}</span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">{tip.tip}</p>
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

export default DailyHealthTip;
