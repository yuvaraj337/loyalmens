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
import { BeardGroomingPage } from './components/services/BeardGroomingPage';
import { FacialSkinCarePage } from './components/services/FacialSkinCarePage';
import { HairColourTreatmentPage } from './components/services/HairColourTreatmentPage';
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
      } else if (href === '/services/beard-grooming' || href === '/services/beard') {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath('/services/beard-grooming');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href === '/services/facial-skin-care' || href === '/services/facial') {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath('/services/facial-skin-care');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href === '/services/hair-colour-treatment' || href === '/services/colour' || href === '/services/color') {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath('/services/hair-colour-treatment');
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
  const isBeardPage = currentPath === '/services/beard-grooming' || currentPath === '/services/beard' || currentPath.startsWith('/services/beard');
  const isFacialPage = currentPath === '/services/facial-skin-care' || currentPath === '/services/facial' || currentPath.startsWith('/services/facial');
  const isColourPage = currentPath === '/services/hair-colour-treatment' || currentPath === '/services/colour' || currentPath === '/services/color' || currentPath.startsWith('/services/hair-colour') || currentPath.startsWith('/services/colour');
  
  const isServicesPage = !isHaircutPage && !isBeardPage && !isFacialPage && !isColourPage && (currentPath === '/services' || currentPath.startsWith('/services'));
  const isShopPage = currentPath === '/shop' || currentPath.startsWith('/shop');

  if (isHaircutPage) {
    return (
      <div className="app-root haircut-route-active">
        <HaircutStylingPage />
      </div>
    );
  }

  if (isBeardPage) {
    return (
      <div className="app-root beard-route-active">
        <BeardGroomingPage />
      </div>
    );
  }

  if (isFacialPage) {
    return (
      <div className="app-root facial-route-active">
        <FacialSkinCarePage />
      </div>
    );
  }

  if (isColourPage) {
    return (
      <div className="app-root colour-route-active">
        <HairColourTreatmentPage />
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

