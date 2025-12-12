import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Users, Star, BookOpen, Video, FileText, MessageCircle, CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const experts = [
  {
    name: 'Dr. Meera Patel',
    title: 'Clinical Nutritionist',
    specialization: 'Weight Management & Metabolic Health',
    experience: '15+ years',
    rating: 4.9,
    avatar: 'MP',
  },
  {
    name: 'Dr. Arjun Reddy',
    title: 'Ayurvedic Practitioner',
    specialization: 'Traditional Medicine & Detox',
    experience: '20+ years',
    rating: 4.8,
    avatar: 'AR',
  },
  {
    name: 'Dr. Kavita Singh',
    title: 'Dietetics Specialist',
    specialization: 'Sports Nutrition & Diabetes Care',
    experience: '12+ years',
    rating: 4.9,
    avatar: 'KS',
  },
  {
    name: 'Dr. Priya Sharma',
    title: 'Wellness Coach',
    specialization: 'Holistic Health & Lifestyle',
    experience: '10+ years',
    rating: 4.7,
    avatar: 'PS',
  },
];

const resources = [
  {
    icon: Video,
    title: 'Video Courses',
    description: 'In-depth nutrition courses by certified experts',
    count: '50+ courses',
  },
  {
    icon: FileText,
    title: 'Research Articles',
    description: 'Evidence-based articles on nutrition science',
    count: '200+ articles',
  },
  {
    icon: BookOpen,
    title: 'E-Books & Guides',
    description: 'Comprehensive guides on various health topics',
    count: '25+ guides',
  },
  {
    icon: MessageCircle,
    title: 'Community Forum',
    description: 'Connect with others on their health journey',
    count: '10k+ members',
  },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
  date: Date | undefined;
  time: string;
}

const ExpertResources = () => {
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    notes: '',
    date: undefined,
    time: '',
  });

  const handleBookConsultation = (expert: typeof experts[0]) => {
    setSelectedExpert(expert);
    setIsBookingOpen(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time) {
      toast({
        title: "Please fill all required fields",
        description: "Name, phone, email, date, and time are required.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Confirmed!",
      description: `Your consultation with ${selectedExpert?.name} is scheduled for ${format(formData.date, 'PPP')} at ${formData.time}.`,
    });

    setIsBookingOpen(false);
    setFormData({ name: '', phone: '', email: '', notes: '', date: undefined, time: '' });
    setSelectedExpert(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Expert Resources</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Access expert guidance, educational resources, and connect with certified nutrition professionals.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Experts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {experts.map((expert, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                        {expert.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{expert.name}</h3>
                        <p className="text-sm text-primary">{expert.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{expert.specialization}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-muted-foreground">{expert.experience}</span>
                          <span className="flex items-center gap-1 text-xs">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {expert.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => handleBookConsultation(expert)}
                    >
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Learning Resources</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {resources.map((resource, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <span className="text-xs text-primary font-medium">{resource.count}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 text-primary-foreground text-center">
            <h2 className="text-2xl font-bold mb-3">Get Personalized Expert Guidance</h2>
            <p className="mb-6 opacity-90 max-w-xl mx-auto">
              Schedule a one-on-one consultation with our certified nutrition experts. 
              Get customized advice for your unique health goals.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => handleBookConsultation(experts[0])}
            >
              Book a Free Consultation
            </Button>
          </section>
        </div>
      </main>
      <Footer />

      {/* Booking Form Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Consultation</DialogTitle>
            <DialogDescription>
              {selectedExpert && `Schedule your appointment with ${selectedExpert.name}`}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitBooking} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes / Health Concerns (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Describe any specific health concerns or topics you'd like to discuss..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData({ ...formData, date })}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Preferred Time *</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={formData.time === time ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                    onClick={() => setFormData({ ...formData, time })}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" size="lg">
              Confirm Appointment
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpertResources;