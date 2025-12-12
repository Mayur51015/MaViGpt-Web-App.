import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Info } from 'lucide-react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // convert cm to m
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      setBmi(Math.round(bmiValue * 10) / 10);
      
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal weight');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  const getBMIColor = () => {
    if (!bmi) return 'text-muted-foreground';
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi < 25) return 'text-primary';
    if (bmi < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">BMI Calculator</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Calculate your Body Mass Index to understand your weight status and get personalized health recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Details</CardTitle>
                <CardDescription>Input your height and weight to calculate BMI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 170"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <Button onClick={calculateBMI} className="w-full" size="lg">
                  Calculate BMI
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Results</CardTitle>
                <CardDescription>BMI analysis and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                {bmi ? (
                  <div className="text-center py-6">
                    <div className={`text-6xl font-bold mb-2 ${getBMIColor()}`}>{bmi}</div>
                    <div className={`text-xl font-semibold mb-6 ${getBMIColor()}`}>{category}</div>
                    <div className="bg-muted rounded-lg p-4 text-left">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-primary mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          {category === 'Normal weight' ? (
                            <p>Great! Your BMI is within the healthy range. Maintain a balanced diet and regular exercise.</p>
                          ) : category === 'Underweight' ? (
                            <p>Consider consulting a nutritionist to develop a healthy weight gain plan with nutrient-rich foods.</p>
                          ) : category === 'Overweight' ? (
                            <p>Focus on portion control, increase physical activity, and incorporate more vegetables and whole grains.</p>
                          ) : (
                            <p>We recommend consulting a healthcare professional for personalized guidance on weight management.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Enter your height and weight to see your BMI results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 grid sm:grid-cols-4 gap-4">
            {[
              { range: '< 18.5', label: 'Underweight', color: 'bg-blue-100 text-blue-700' },
              { range: '18.5 - 24.9', label: 'Normal', color: 'bg-green-100 text-green-700' },
              { range: '25 - 29.9', label: 'Overweight', color: 'bg-yellow-100 text-yellow-700' },
              { range: '≥ 30', label: 'Obese', color: 'bg-red-100 text-red-700' },
            ].map((item) => (
              <div key={item.label} className={`rounded-lg p-4 text-center ${item.color}`}>
                <div className="font-bold">{item.range}</div>
                <div className="text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BMICalculator;
