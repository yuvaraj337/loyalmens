import React from 'react';
import { Navbar } from './components/navigation/Navbar';
import { CinematicHero } from './components/hero/CinematicHero';
import { LoyalExperienceSection } from './components/space/LoyalExperienceSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
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
      </main>
    </div>
  );
}

export default App;
