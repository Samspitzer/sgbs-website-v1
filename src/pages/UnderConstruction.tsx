import { Link } from 'react-router-dom';
import { ArrowLeft, Construction, Phone, Mail } from 'lucide-react';

interface UnderConstructionProps {
  pageName?: string;
}

export function UnderConstruction({ pageName = 'This Page' }: UnderConstructionProps) {
  // Map slugs to display names
  const pageNames: Record<string, string> = {
    'interior-doors': 'Interior Doors',
    'exterior-doors': 'Exterior & Entry Doors',
    'hollow-metal': 'Hollow Metal Doors & Frames',
    'fire-rated': 'Fire-Rated Assemblies',
    'hardware': 'Door Hardware',
    'molding': 'Molding & Millwork',
    'employee-login': 'Employee Portal',
  };

  const displayName = pageNames[pageName] || pageName;

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 pt-20">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-accent-500/10 border border-accent-500/30">
            <Construction className="w-12 h-12 text-accent-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-cream-100 mb-4">
          Under Construction
        </h1>
        
        {/* Page Name Badge */}
        <div className="mb-6">
          <span className="inline-block px-6 py-2 bg-accent-500 text-white font-semibold">
            {displayName}
          </span>
        </div>

        {/* Description */}
        <p className="text-cream-100/70 text-lg mb-10 max-w-lg mx-auto">
          We're currently building this page to give you detailed information. 
          Check back soon or contact us directly.
        </p>

        {/* Contact CTA */}
        <div className="bg-dark-900 border border-dark-700 p-8 mb-10">
          <h2 className="text-xl font-semibold text-cream-100 mb-4">
            Need Information Now?
          </h2>
          <p className="text-cream-100/60 mb-6">
            Our team is ready to help you with product details, pricing, and availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:845-923-2052"
              className="btn-primary"
            >
              <Phone className="w-5 h-5" />
              Call 845-923-2052
            </a>
            <a
              href="mailto:sales@sgbsny.com"
              className="btn-outline"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>

        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-cream-100/60 hover:text-accent-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Decorative dots */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-2 h-2 bg-accent-500 animate-pulse" />
          <div className="w-2 h-2 bg-accent-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-accent-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
