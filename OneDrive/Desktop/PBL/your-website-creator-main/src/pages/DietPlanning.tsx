import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UtensilsCrossed, CheckCircle } from 'lucide-react';

const mealPlans = {
  weightLoss: {
    title: 'Weight Loss Plan',
    description: 'Calorie-controlled, nutrient-dense meals',
    meals: {
      breakfast: ['Moong dal chilla with mint chutney', 'Poha with vegetables', 'Oats idli with sambar'],
      lunch: ['Brown rice with dal, sabzi, and salad', 'Roti with paneer bhurji and raita', 'Quinoa pulao with curd'],
      dinner: ['Vegetable soup with multigrain roti', 'Grilled fish with steamed vegetables', 'Dal khichdi with vegetables'],
      snacks: ['Roasted chana', 'Buttermilk', 'Fruit with nuts'],
    },
  },
  muscleGain: {
    title: 'Muscle Building Plan',
    description: 'High protein, balanced nutrition',
    meals: {
      breakfast: ['Egg bhurji with paratha', 'Paneer paratha with curd', 'Sprouted moong salad with eggs'],
      lunch: ['Chicken curry with rice and dal', 'Rajma chawal with paneer', 'Fish curry with roti and vegetables'],
      dinner: ['Grilled chicken with quinoa', 'Soya chunks curry with rice', 'Egg curry with multigrain roti'],
      snacks: ['Protein shake with banana', 'Greek yogurt with nuts', 'Peanut butter on toast'],
    },
  },
  balanced: {
    title: 'Balanced Nutrition Plan',
    description: 'Well-rounded meals for overall health',
    meals: {
      breakfast: ['Upma with coconut chutney', 'Stuffed paratha with curd', 'Idli sambar with fruit'],
      lunch: ['Thali - rice, dal, roti, sabzi, curd', 'Chole with rice and salad', 'Vegetable biryani with raita'],
      dinner: ['Roti with mixed dal and sabzi', 'Khichdi with kadhi', 'Vegetable curry with jeera rice'],
      snacks: ['Fresh fruit', 'Sprouts chaat', 'Coconut water'],
    },
  },
  diabetic: {
    title: 'Diabetic-Friendly Plan',
    description: 'Low GI, blood sugar friendly meals',
    meals: {
      breakfast: ['Besan chilla with vegetables', 'Ragi dosa with sambar', 'Vegetable omelette'],
      lunch: ['Jowar roti with palak dal', 'Brown rice with fish curry', 'Quinoa salad with paneer'],
      dinner: ['Soup with multigrain roti', 'Grilled vegetables with dahi', 'Moong dal cheela'],
      snacks: ['Cucumber and carrot sticks', 'Roasted makhana', 'Small portion of nuts'],
    },
  },
};

const DietPlanning = () => {
  const [goal, setGoal] = useState<keyof typeof mealPlans>('balanced');
  const [showPlan, setShowPlan] = useState(false);

  const currentPlan = mealPlans[goal];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Diet Planning</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get personalized meal plans based on your health goals. All plans feature traditional Indian foods.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Your Goal</CardTitle>
              <CardDescription>Choose what you want to achieve with your diet</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={goal} onValueChange={(v) => setGoal(v as keyof typeof mealPlans)} className="grid sm:grid-cols-2 gap-4">
                {Object.entries(mealPlans).map(([key, plan]) => (
                  <Label
                    key={key}
                    htmlFor={key}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      goal === key ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={key} id={key} />
                    <div>
                      <div className="font-semibold text-foreground">{plan.title}</div>
                      <div className="text-sm text-muted-foreground">{plan.description}</div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              <Button className="mt-6 w-full sm:w-auto" size="lg" onClick={() => setShowPlan(true)}>
                Generate Meal Plan
              </Button>
            </CardContent>
          </Card>

          {showPlan && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-2xl font-bold text-foreground">{currentPlan.title}</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
                    <CardTitle className="text-lg">🌅 Breakfast Options</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {currentPlan.meals.breakfast.map((meal, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {meal}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-green-50 dark:bg-green-950/20">
                    <CardTitle className="text-lg">☀️ Lunch Options</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {currentPlan.meals.lunch.map((meal, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {meal}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
                    <CardTitle className="text-lg">🌙 Dinner Options</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {currentPlan.meals.dinner.map((meal, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {meal}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                    <CardTitle className="text-lg">🍎 Healthy Snacks</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {currentPlan.meals.snacks.map((snack, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {snack}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">💡 Pro Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Drink water 30 minutes before meals</li>
                  <li>• Eat slowly and mindfully</li>
                  <li>• Include seasonal vegetables</li>
                  <li>• Avoid eating heavy meals after 8 PM</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DietPlanning;
