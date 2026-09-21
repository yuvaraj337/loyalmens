import React from 'react';
import { Navbar } from './components/navigation/Navbar';
import { CinematicHero } from './components/hero/CinematicHero';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { LoyalExperienceSection } from './components/space/LoyalExperienceSection';
import { LocationSection } from './components/location/LocationSection';
import { Footer } from './components/footer/Footer';
import './styles/variables.css';

export function App() {
  return (
    <div className="app-root">
      {/* Global Fixed Luxury Navbar */}
      <Navbar />

      <main>
        {/* Section 1: Scroll-controlled Cinematic Hero with 488 frames */}
        <CinematicHero />

        {/* Section 2: Editorial Showcase: A Space Designed Around You (Image 1 + Image 2) */}
        <LoyalExperienceSection />

        {/* Section 3: Choose Your Experience with 4 Arched Cards & Trust Strip */}
        <ExperienceSection />

        {/* Section 4: Location & Parlour Information */}
        <LocationSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
