import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { EmergencyModal } from './components/common/EmergencyModal';
import { HomeView } from './components/home/HomeView';
import { ServicesListView } from './components/services/ServicesListView';
import { ServiceDetailView } from './components/services/ServiceDetailView';
import { ServiceAreasView } from './components/areas/ServiceAreasView';
import { ServiceAreaDetailView } from './components/areas/ServiceAreaDetailView';
import { ProjectsView } from './components/projects/ProjectsView';
import { GalleryView } from './components/gallery/GalleryView';
import { ReviewsView } from './components/reviews/ReviewsView';
import { FaqView } from './components/faq/FaqView';
import { AboutView } from './components/about/AboutView';
import { ContactView } from './components/contact/ContactView';
import { QuoteRequestView } from './components/forms/QuoteRequestView';
import { ScheduleInspectionView } from './components/forms/ScheduleInspectionView';
import { PrivacyPolicyView, TermsOfServiceView, CookiePolicyView } from './components/legal/LegalViews';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import {
  initialBusinessConfig,
  servicesData,
  projectsData,
  serviceAreasData,
  testimonialsData
} from './data/roofingData';
import { BusinessConfig } from './types';
import { trackEvent } from './utils/analytics';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [business, setBusiness] = useState<BusinessConfig>(initialBusinessConfig);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [calculatorQuoteParams, setCalculatorQuoteParams] = useState<any>(null);

  // Admin authentication state
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return sessionStorage.getItem('ironclad_admin_token');
  });
  const [adminUser, setAdminUser] = useState<{ username: string; role: string } | null>(() => {
    const cached = sessionStorage.getItem('ironclad_admin_user');
    return cached ? JSON.parse(cached) : null;
  });

  // Fetch business configuration from API on startup
  useEffect(() => {
    async function fetchBusiness() {
      try {
        const res = await fetch('/api/business');
        if (res.ok) {
          const data = await res.json();
          setBusiness(data);
        }
      } catch (err) {
        console.debug('Using local business defaults');
      }
    }
    fetchBusiness();
  }, []);

  // Sync route on popstate and pushState
  const navigate = (route: string) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('page_view', route);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    // Initial page view track
    trackEvent('page_view', window.location.pathname || '/');
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Admin login
  const handleAdminLoginSuccess = (token: string, user: { username: string; role: string }) => {
    setAdminToken(token);
    setAdminUser(user);
    sessionStorage.setItem('ironclad_admin_token', token);
    sessionStorage.setItem('ironclad_admin_user', JSON.stringify(user));
    navigate('/admin');
  };

  const handleAdminLogout = async () => {
    if (adminToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (e) {}
    }
    setAdminToken(null);
    setAdminUser(null);
    sessionStorage.removeItem('ironclad_admin_token');
    sessionStorage.removeItem('ironclad_admin_user');
    navigate('/');
  };

  // Route matching helpers
  const isServicesDetail = currentRoute.startsWith('/services/');
  const serviceSlug = isServicesDetail ? currentRoute.replace('/services/', '') : '';
  const currentService = servicesData.find(s => s.slug === serviceSlug);

  const isAreaDetail = currentRoute.startsWith('/service-areas/');
  const areaSlug = isAreaDetail ? currentRoute.replace('/service-areas/', '') : '';
  const currentArea = serviceAreasData.find(a => a.slug === areaSlug);

  // Render appropriate view based on route
  const renderCurrentView = () => {
    // Admin route
    if (currentRoute === '/admin') {
      if (adminToken && adminUser) {
        return (
          <AdminDashboard
            token={adminToken}
            user={adminUser}
            business={business}
            onUpdateBusiness={(updated) => setBusiness(updated)}
            onLogout={handleAdminLogout}
          />
        );
      }
      return (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onCancel={() => navigate('/')}
        />
      );
    }

    // Services detail
    if (isServicesDetail && currentService) {
      return (
        <ServiceDetailView
          service={currentService}
          onNavigate={navigate}
          onSelectForQuote={(slug) => {
            const service = servicesData.find(s => s.slug === slug);
            setCalculatorQuoteParams({
              material: service?.materials[0] || 'Carlisle 60-mil TPO Membrane',
              sqFt: 15000,
              pitch: 'flat'
            });
            navigate('/request-a-quote');
          }}
        />
      );
    }

    // Service area detail
    if (isAreaDetail && currentArea) {
      return (
        <ServiceAreaDetailView
          area={currentArea}
          business={business}
          onNavigate={navigate}
          onRequestQuote={(city) => {
            navigate('/request-a-quote');
          }}
        />
      );
    }

    // Specific named routes
    switch (currentRoute) {
      case '/services':
        return (
          <ServicesListView
            services={servicesData}
            onNavigate={navigate}
            onSelectService={(slug) => navigate(`/services/${slug}`)}
          />
        );

      case '/service-areas':
        return (
          <ServiceAreasView
            serviceAreas={serviceAreasData}
            business={business}
            onNavigate={navigate}
            onSelectArea={(slug) => navigate(`/service-areas/${slug}`)}
          />
        );

      case '/projects':
        return (
          <ProjectsView
            projects={projectsData}
            onNavigate={navigate}
            onRequestQuote={() => navigate('/request-a-quote')}
          />
        );

      case '/gallery':
        return <GalleryView />;

      case '/reviews':
        return (
          <ReviewsView
            onRequestQuote={() => navigate('/request-a-quote')}
          />
        );

      case '/faq':
        return (
          <FaqView
            onRequestQuote={() => navigate('/request-a-quote')}
            onScheduleInspection={() => navigate('/schedule-inspection')}
          />
        );

      case '/about':
        return (
          <AboutView
            business={business}
            onNavigate={navigate}
          />
        );

      case '/contact':
        return (
          <ContactView
            business={business}
            onNavigate={navigate}
          />
        );

      case '/request-a-quote':
        return (
          <QuoteRequestView
            initialParams={calculatorQuoteParams}
            onNavigate={navigate}
          />
        );

      case '/schedule-inspection':
        return (
          <ScheduleInspectionView
            onNavigate={navigate}
          />
        );

      case '/privacy-policy':
        return (
          <PrivacyPolicyView
            business={business}
            onBack={() => navigate('/')}
          />
        );

      case '/terms':
        return (
          <TermsOfServiceView
            business={business}
            onBack={() => navigate('/')}
          />
        );

      case '/cookie-policy':
        return (
          <CookiePolicyView
            onBack={() => navigate('/')}
          />
        );

      case '/':
      default:
        return (
          <HomeView
            business={business}
            services={servicesData}
            projects={projectsData}
            serviceAreas={serviceAreasData}
            testimonials={testimonialsData}
            onNavigate={navigate}
            onSelectService={(slug) => navigate(`/services/${slug}`)}
            onSelectArea={(slug) => navigate(`/service-areas/${slug}`)}
            onProceedToQuoteWithParams={(params) => {
              setCalculatorQuoteParams(params);
              navigate('/request-a-quote');
            }}
            onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e0e5ec] text-[#2d3436] antialiased selection:bg-[#ff4757] selection:text-white">
      {/* Structural Header */}
      <Header
        business={business}
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderCurrentView()}
      </main>

      {/* Heavy Industrial Chassis Footer */}
      <Footer
        business={business}
        onNavigate={navigate}
      />

      {/* 24/7 Rapid Leak Emergency Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        business={business}
        onClose={() => setEmergencyModalOpen(false)}
      />
    </div>
  );
}
