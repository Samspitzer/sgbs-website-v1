interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <>
          <div className="absolute inset-0">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 overlay-page-hero" />
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      )}
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="container-custom relative">
        <div className="max-w-3xl">
          <div className="line-accent mb-6 animate-fade-in" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cream-100 animate-fade-in-up">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg lg:text-xl text-cream-100/70 leading-relaxed animate-fade-in-up stagger-2">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}