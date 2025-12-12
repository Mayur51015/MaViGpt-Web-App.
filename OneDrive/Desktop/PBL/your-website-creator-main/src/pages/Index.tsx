import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { QuickTools } from '@/components/QuickTools';
import { TrendingTopics } from '@/components/TrendingTopics';
import { SeasonalTip } from '@/components/SeasonalTip';
import { ResourcesSection } from '@/components/ResourcesSection';
import { Testimonials } from '@/components/Testimonials';
import { ExpertsSection } from '@/components/ExpertsSection';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <QuickTools />
        <TrendingTopics />
        <SeasonalTip />
        <ResourcesSection />
        <Testimonials />
        <ExpertsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
