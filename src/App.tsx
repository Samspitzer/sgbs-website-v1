import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { UnderConstruction } from './pages/UnderConstruction';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Wrapper for dynamic product pages
function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  return <UnderConstruction pageName={slug} />;
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />

          {/* Employee Portal */}
          <Route
            path="/employee-login"
            element={<UnderConstruction pageName="employee-login" />}
          />

          {/* Product Pages - Under Construction */}
          <Route path="/products/:slug" element={<ProductPage />} />

          {/* 404 */}
          <Route path="*" element={<UnderConstruction pageName="Page Not Found" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppContent />
    </Router>
  );
}

export default App;