import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { PageHero } from '../components/PageHero';

export function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectLocation: '',
    projectSize: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="bg-dark-950">
      <PageHero
        title="Contact Us"
        subtitle="Get a quote or ask a question — we respond quickly"
        backgroundImage="/images/projects/madison-2020.jpg"
      />

      <section className="section-padding bg-dark-900 relative overflow-hidden noise-overlay">
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="line-accent mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
                Let's Talk
              </h2>
              <p className="mt-4 text-cream-100/70 text-lg">
                Ready to start your project? Get in touch for a quote or to discuss your requirements.
              </p>

              <div className="mt-10 space-y-6">
                <a
                  href="https://maps.google.com/?q=200+NY-17M+Harriman+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-dark-800 border border-dark-600 group-hover:border-accent-500/50 transition-colors">
                    <MapPin className="w-5 h-5 text-accent-400" />
                  </div>
                  <div>
                    <div className="text-sm text-cream-100/50 uppercase tracking-wide">Location</div>
                    <div className="mt-1 text-cream-100 group-hover:text-accent-400 transition-colors">
                      200 NY-17M<br />
                      Harriman, NY 10926
                    </div>
                  </div>
                </a>

                <a href="tel:845-923-2052" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-dark-800 border border-dark-600 group-hover:border-accent-500/50 transition-colors">
                    <Phone className="w-5 h-5 text-accent-400" />
                  </div>
                  <div>
                    <div className="text-sm text-cream-100/50 uppercase tracking-wide">Phone</div>
                    <div className="mt-1 text-cream-100 group-hover:text-accent-400 transition-colors">
                      845-923-2052
                    </div>
                  </div>
                </a>

                <a href="mailto:sales@sgbsny.com" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-dark-800 border border-dark-600 group-hover:border-accent-500/50 transition-colors">
                    <Mail className="w-5 h-5 text-accent-400" />
                  </div>
                  <div>
                    <div className="text-sm text-cream-100/50 uppercase tracking-wide">Email</div>
                    <div className="mt-1 text-cream-100 group-hover:text-accent-400 transition-colors">
                      sales@sgbsny.com
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-dark-800 border border-dark-600">
                    <Clock className="w-5 h-5 text-accent-400" />
                  </div>
                  <div>
                    <div className="text-sm text-cream-100/50 uppercase tracking-wide">Hours</div>
                    <div className="mt-1 text-cream-100">
                      Mon – Fri: 8AM – 5PM<br />
                      <span className="text-cream-100/60">Sat – Sun: Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 aspect-video bg-dark-800 border border-dark-600 flex items-center justify-center">
                <a
                  href="https://maps.google.com/?q=200+NY-17M+Harriman+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100/60 hover:text-accent-400 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  View on Google Maps
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-dark-800 border border-dark-700 p-8 lg:p-10">
                <h3 className="text-2xl font-semibold text-cream-100 mb-2">
                  Request a Quote
                </h3>
                <p className="text-cream-100/60 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {formState === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-accent-500/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-8 h-8 text-accent-400" />
                    </div>
                    <h4 className="text-2xl font-semibold text-cream-100 mb-2">
                      Thank You!
                    </h4>
                    <p className="text-cream-100/70">
                      We've received your message and will be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-cream-100/80 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-600 text-cream-100 placeholder-cream-100/40 focus:outline-none focus:border-accent-500 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-cream-100/80 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-600 text-cream-100 placeholder-cream-100/40 focus:outline-none focus:border-accent-500 transition-colors"
                          placeholder="Company name"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-cream-100/80 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-600 text-cream-100 placeholder-cream-100/40 focus:outline-none focus:border-accent-500 transition-colors"
                          placeholder="email@company.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-cream-100/80 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-600 text-cream-100 placeholder-cream-100/40 focus:outline-none focus:border-accent-500 transition-colors"
                          placeholder="(555) 555-5555"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="projectLocation" className="block text-sm font-medium text-cream-100/80 mb-2">
                          Project Location
                        </label>
                        <input
                          type="text"
                          id="projectLocation"
                          name="projectLocation"
                          value={formData.projectLocation}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-600 text-cream-100 placeholder-cream-100/40 focus:outline-none focus:border-accent-500 transition-colors"
                          placeholder="City, State"
                        />
                      </div>
                      <div>
                        <label htmlFor="projectSize" className="block text-sm font-medium text-cream-100/80 mb-2">
                          Project Size
                        </label>
                        <select
                          id="projectSize"
                          name="projectSize"
                          value={formData.projectSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-600 text-cream-100 focus:outline-none focus:border-accent-500 transition-colors"
                        >
                          <option value="">Select size...</option>
                          <option value="1-50">1 - 50 Units</option>
                          <option value="51-100">51 - 100 Units</option>
                          <option value="101-200">101 - 200 Units</option>
                          <option value="201-500">201 - 500 Units</option>
                          <option value="500+">500+ Units</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-cream-100/80 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-900 border border-dark-600 text-cream-100 placeholder-cream-100/40 resize-none focus:outline-none focus:border-accent-500 transition-colors"
                        placeholder="Tell us about your project, timeline, and what you need..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full py-4 bg-accent-500 text-white font-semibold tracking-wide uppercase hover:bg-accent-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Request <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
