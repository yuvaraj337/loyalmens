import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { CinematicHero } from './components/hero/CinematicHero';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { LoyalExperienceSection } from './components/space/LoyalExperienceSection';
import { LocationSection } from './components/location/LocationSection';
import { Footer } from './components/footer/Footer';
import { SalonServicesPage } from './components/services/SalonServicesPage';
import { RizheenaShopPage } from './components/shop/RizheenaShopPage';
import { HaircutStylingPage } from './components/services/HaircutStylingPage';
import './styles/variables.css';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleGlobalLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Handle internal routes
      if (href === '/services/haircut-styling' || href === '/services/haircut') {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath('/services/haircut-styling');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href === '/services' || href.startsWith('/services#')) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath('/services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href === '/shop' || href.startsWith('/shop#')) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath('/shop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href === '/') {
        e.preventDefault();
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleGlobalLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleGlobalLinkClick);
    };
  }, []);

  const isHaircutPage = currentPath === '/services/haircut-styling' || currentPath === '/services/haircut' || currentPath.startsWith('/services/haircut');
  const isServicesPage = !isHaircutPage && (currentPath === '/services' || currentPath.startsWith('/services'));
  const isShopPage = currentPath === '/shop' || currentPath.startsWith('/shop');

  if (isHaircutPage) {
    return (
      <div className="app-root haircut-route-active">
        <HaircutStylingPage />
      </div>
    );
  }

  if (isServicesPage) {
    return (
      <div className="app-root services-route-active">
        <SalonServicesPage />
      </div>
    );
  }

  if (isShopPage) {
    return (
      <div className="app-root shop-route-active">
        <RizheenaShopPage />
      </div>
    );
  }

  return (
    <div className="app-root">
      {/* Global Fixed Luxury Navbar */}
      <Navbar />

      <main>
        {/* 2. Cinematic Hero */}
        <CinematicHero />

        {/* 3. Choose Your Experience (ExperienceSection with LifestylePreview) */}
        <ExperienceSection />

        {/* 4. A Space Designed Around You (LoyalExperienceSection) */}
        <LoyalExperienceSection />

        {/* 5. Find Us Here (LocationSection) */}
        <LocationSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;

