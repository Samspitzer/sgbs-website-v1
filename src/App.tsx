import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { UnderConstruction } from './pages/UnderConstruction';

// Wrapper for dynamic product pages
function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  return <UnderConstruction pageName={slug} />;
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen flex flex-col bg-dark-950">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />

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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
