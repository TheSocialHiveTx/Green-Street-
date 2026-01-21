import React, { useState } from 'react';
import { INITIAL_CONTENT, SECTION_PROMPTS } from './constants';
import { SiteContent, SectionType } from './types';
import { generateSectionContent } from './services/geminiService';
import { Menu, X, ArrowRight, CheckCircle2, Home, DollarSign, MapPin, Phone, Instagram, Facebook, Linkedin } from 'lucide-react';
import ChatWidget from './components/ChatWidget';
import AdminToolbar from './components/AdminToolbar';

const App: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [loadingSection, setLoadingSection] = useState<SectionType | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleRegenerate = async (section: SectionType) => {
    setLoadingSection(section);
    try {
      const prompt = SECTION_PROMPTS[section];
      const newBlock = await generateSectionContent(section, prompt);
      setContent(prev => ({
        ...prev,
        [section]: newBlock
      }));
    } catch (error) {
      console.error("Failed to regenerate content", error);
      alert("Failed to regenerate content. Please check API key configuration.");
    } finally {
      setLoadingSection(null);
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-greenstreet-200 selection:text-greenstreet-900">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="h-8 w-8 bg-greenstreet-600 rounded-sm mr-2 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">G</span>
              </div>
              <span className="font-serif font-bold text-xl text-greenstreet-900 tracking-tight">GREENSTREET</span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('buyers')} className="text-gray-600 hover:text-greenstreet-600 font-medium transition-colors">Home Buyers</button>
              <button onClick={() => scrollToSection('sellers')} className="text-gray-600 hover:text-greenstreet-600 font-medium transition-colors">Lot Sellers</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-greenstreet-600 font-medium transition-colors">Contact</button>
              <button 
                onClick={() => scrollToSection('buyers')}
                className="bg-greenstreet-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-greenstreet-700 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Find a Home
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => scrollToSection('buyers')} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-greenstreet-50 rounded-lg">Home Buyers</button>
              <button onClick={() => scrollToSection('sellers')} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-greenstreet-50 rounded-lg">Lot Sellers</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-greenstreet-50 rounded-lg">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Admin Toggle (Hidden/Subtle) */}
      <div className="fixed top-24 left-4 z-40 hidden lg:block">
        <button 
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-xs text-gray-300 hover:text-greenstreet-600 transition-colors"
        >
            {showAdmin ? 'Hide AI Tools' : 'Show AI Tools'}
        </button>
      </div>

      {showAdmin && (
        <AdminToolbar onRegenerate={handleRegenerate} loadingSection={loadingSection} />
      )}

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-greenstreet-50">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-greenstreet-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-greenstreet-300 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-greenstreet-100 text-greenstreet-700 text-xs font-bold tracking-wide uppercase mb-6">
              Establishment • Quality • Speed
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
              {content.HERO.headline}
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {content.HERO.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollToSection('buyers')}
                className="w-full sm:w-auto px-8 py-4 bg-greenstreet-600 text-white rounded-lg font-semibold text-lg hover:bg-greenstreet-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {content.HERO.ctaPrimary} <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('sellers')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-greenstreet-800 border-2 border-greenstreet-100 rounded-lg font-semibold text-lg hover:border-greenstreet-600 hover:bg-greenstreet-50 transition-all flex items-center justify-center gap-2"
              >
                {content.HERO.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">{content.VALUE_PROPS.headline}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{content.VALUE_PROPS.subheadline}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.VALUE_PROPS.points?.map((point, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-greenstreet-100 rounded-xl flex items-center justify-center text-greenstreet-600 mb-6">
                   {index === 0 ? <CheckCircle2 size={24} /> : index === 1 ? <DollarSign size={24} /> : <MapPin size={24} />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{point.split(':')[0]}</h3>
                <p className="text-gray-600">{point.split(':')[1] || point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Section */}
      <section id="buyers" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Modern Infill Home" 
                className="rounded-2xl shadow-2xl object-cover h-full w-full grayscale-[10%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-greenstreet-600 font-bold tracking-wide uppercase text-sm mb-4">
                <Home size={16} /> <span>For Home Buyers</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                {content.BUYER.headline}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {content.BUYER.subheadline}
              </p>
              
              <div className="space-y-4 mb-10">
                {content.BUYER.points?.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px]">
                      <CheckCircle2 className="text-greenstreet-500" size={20} />
                    </div>
                    <span className="text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
                 <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Simple 3-Step Process</h4>
                 <div className="flex justify-between text-sm text-center">
                    <div className="flex-1 px-2">
                        <div className="font-bold text-greenstreet-600 text-lg mb-1">01</div>
                        <div className="leading-tight text-gray-600">Choose Lot & Plan</div>
                    </div>
                    <div className="flex-1 px-2 border-l">
                        <div className="font-bold text-greenstreet-600 text-lg mb-1">02</div>
                        <div className="leading-tight text-gray-600">Select Finishes</div>
                    </div>
                    <div className="flex-1 px-2 border-l">
                        <div className="font-bold text-greenstreet-600 text-lg mb-1">03</div>
                        <div className="leading-tight text-gray-600">Close & Move In</div>
                    </div>
                 </div>
              </div>

              <button className="px-8 py-3 bg-greenstreet-800 text-white rounded-lg font-semibold hover:bg-greenstreet-900 transition-colors w-full sm:w-auto">
                {content.BUYER.ctaPrimary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Section */}
      <section id="sellers" className="py-24 bg-greenstreet-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
            <div className="mb-12 lg:mb-0">
              <div className="inline-flex items-center gap-2 text-greenstreet-300 font-bold tracking-wide uppercase text-sm mb-4">
                <DollarSign size={16} /> <span>Acquisition</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                {content.SELLER.headline}
              </h2>
              <p className="text-lg text-greenstreet-100 mb-8 leading-relaxed opacity-90">
                {content.SELLER.subheadline}
              </p>

              <div className="space-y-6 mb-10">
                 {content.SELLER.points?.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="bg-greenstreet-500 p-2 rounded-full">
                        <CheckCircle2 size={20} className="text-white" />
                    </div>
                    <span className="font-medium text-lg">{point}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
                  <div className="hidden lg:block w-px bg-greenstreet-700 h-24"></div>
                  <div>
                      <h4 className="font-bold text-greenstreet-200 mb-2">The Seller's Simple Process</h4>
                      <ol className="text-sm text-greenstreet-100 space-y-1 list-decimal list-inside">
                          <li>Submit Property Details</li>
                          <li>Receive Cash Offer</li>
                          <li>Title Review</li>
                          <li>Quick Closing</li>
                      </ol>
                  </div>
              </div>

            </div>
            
            {/* Seller Form Mockup */}
            <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-2">Get Your Offer</h3>
              <p className="text-gray-500 mb-6 text-sm">Fill out the form below. Your privacy is guaranteed.</p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-greenstreet-500 focus:outline-none" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-greenstreet-500 focus:outline-none" placeholder="John" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-greenstreet-500 focus:outline-none" placeholder="Doe" />
                   </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-greenstreet-500 focus:outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-greenstreet-500 focus:outline-none" placeholder="(555) 123-4567" />
                </div>
                <button type="submit" className="w-full bg-greenstreet-600 text-white font-bold py-3 rounded-lg hover:bg-greenstreet-700 transition-colors mt-2">
                  {content.SELLER.ctaPrimary}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-6 w-6 bg-greenstreet-500 rounded-sm mr-2 flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-sm">G</span>
                </div>
                <span className="font-serif font-bold text-lg text-white tracking-tight">GREENSTREET</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Building the future in the neighborhoods you love. Professional, predictable, production home building.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('buyers')} className="hover:text-greenstreet-400">Find a Home</button></li>
                <li><button onClick={() => scrollToSection('sellers')} className="hover:text-greenstreet-400">Sell Your Lot</button></li>
                <li><a href="#" className="hover:text-greenstreet-400">Our Process</a></li>
                <li><a href="#" className="hover:text-greenstreet-400">About Us</a></li>
              </ul>
            </div>

             <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-greenstreet-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-greenstreet-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-greenstreet-400">Accessibility</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><MapPin size={16} /> 123 Builder Lane, City, ST 90210</li>
                <li className="flex items-center gap-2"><Phone size={16} /> (555) 867-5309</li>
                <li className="flex items-center gap-2"><div className="w-4 h-4 bg-greenstreet-500 rounded-full"></div> hello@greenstreet.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Greenstreet Builders. All rights reserved.
          </div>
        </div>
      </footer>

      <ChatWidget />
      
    </div>
  );
};

export default App;