import React from 'react';
import { AppProvider } from './context/AppContext';
import { useSmoothScroll, Reveal } from './lib/motion';
import { Navbar } from './components/Navbar';
import { Hero, TrustStrip } from './components/Hero';
import { StoryJourney, ChapterBreak } from './components/StoryJourney';
import { ProblemSection } from './components/ProblemSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { VirtualPetShowcase } from './components/VirtualPetShowcase';
import { DifferenceSection } from './components/DifferenceSection';
import { TargetAudience } from './components/TargetAudience';
import { PricingSection } from './components/PricingSection';
import { ApkHubSection } from './components/ApkHubSection';
import { AdminApkModal } from './components/AdminApkModal';
import { InteractivePetWidget } from './components/InteractivePetWidget';
import { Footer } from './components/Footer';

export default function App() {
  useSmoothScroll();

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
        <Navbar />

        {/* Mạch truyện: chần chừ -> tập dượt -> đủ công cụ -> quyết định */}
        {/* overflow-x-clip chứ không hidden: hidden biến main thành scroll
            container và làm chết position:sticky bên trong StoryJourney */}
        <main className="flex-grow w-full max-w-full overflow-x-clip">
          <Hero />
          <TrustStrip />

          <ChapterBreak textKey="story.bridge1" />

          <Reveal><ProblemSection /></Reveal>

          <StoryJourney />

          <Reveal><VirtualPetShowcase /></Reveal>
          <Reveal><FeaturesGrid /></Reveal>
          <Reveal><DifferenceSection /></Reveal>

          <ChapterBreak textKey="story.bridge2" />

          <Reveal><TargetAudience /></Reveal>
          <Reveal><PricingSection /></Reveal>
          <Reveal><ApkHubSection /></Reveal>
        </main>

        <InteractivePetWidget />
        <AdminApkModal />
        <Footer />
      </div>
    </AppProvider>
  );
}
