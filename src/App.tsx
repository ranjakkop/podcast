import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle, Headphones, Brain, Zap, Phone, ChevronDown } from 'lucide-react';

// Add CSS styles as a constant
const styles = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .fade-in-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .animate-bounce {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  .marquee {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1) 5%, rgba(255,255,255,1) 95%, rgba(255,255,255,0));
  }
  
  .marquee-content {
    display: inline-block;
    animation: marquee 60s linear infinite;
  }
  
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
  
  .marquee:hover .marquee-content {
    animation-play-state: paused;
  }

  .marquee-content span {
    font-family: 'Inter', sans-serif;
  }

  .marquee-content span em {
    font-style: italic;
  }

  .marquee-content span strong {
    font-weight: 600;
  }

  .marquee-content span em strong {
    font-style: italic;
    font-weight: 600;
  }

  .marquee-content span u {
    text-decoration: none;
    border-bottom: 1px solid currentColor;
  }

  .network-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.1;
    z-index: 0;
  }

  .network-node {
    fill: #4F46E5;
    animation: pulse 3s infinite;
  }

  .network-line {
    stroke: #4F46E5;
    stroke-width: 1;
    animation: drawLine 3s infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { opacity: 0.3; }
  }

  @keyframes drawLine {
    0% { opacity: 0.1; }
    50% { opacity: 0.3; }
    100% { opacity: 0.1; }
  }
`;

// Country codes data
const countryCodes = [
  { code: '+1', country: 'US/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+55', country: 'Brazil' },
  { code: '+52', country: 'Mexico' },
  { code: '+27', country: 'South Africa' },
  { code: '+971', country: 'UAE' },
  { code: '+65', country: 'Singapore' },
  { code: '+31', country: 'Netherlands' },
  { code: '+34', country: 'Spain' },
  // Other option at the end
  { code: 'other', country: 'Other' },
];

function App() {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isEditingCountryCode, setIsEditingCountryCode] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const countryCodeInputRef = useRef<HTMLInputElement>(null);
  const subscribers = [
    "Acquired - Tech and Business Deep Dives",
    "My First Million - Startup Stories",
    "Business Breakdowns - Company Analysis",
    "The Knowledge Project - Deep Conversations",
    "Twenty Minute VC - Venture Capital",
    "Invest Like the Best - Investment Insights",
    "The Indicator - Economics Daily",
    "Odd Lots - Markets and Finance",
    "Masters in Business - Industry Leaders",
    "Lennys Podcast - Product and Growth"
  ];

  // Add the CSS to the document
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Add fade-in effect on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, { threshold: 0.1 });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Focus input when editing country code
  useEffect(() => {
    if (isEditingCountryCode && countryCodeInputRef.current) {
      countryCodeInputRef.current.focus();
    }
  }, [isEditingCountryCode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown && !(event.target as Element).closest('.country-dropdown')) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const selectCountryCode = (code: string) => {
    if (code === 'other') {
      setIsEditingCountryCode(true);
      setCountryCode('+');
    } else {
      setCountryCode(code);
    }
    setShowCountryDropdown(false);
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Ensure it starts with a plus sign
    if (!value.startsWith('+')) {
      value = '+' + value;
    }
    
    // Only allow numbers and the plus sign
    if (/^\+[0-9]*$/.test(value) || value === '+') {
      setCountryCode(value);
    }
  };

  const handleCountryCodeBlur = () => {
    // If empty or just a plus, reset to default
    if (countryCode === '' || countryCode === '+') {
      setCountryCode('+1');
    }
    setIsEditingCountryCode(false);
  };

  const toggleCountryCodeEdit = () => {
    if (!isEditingCountryCode) {
      setIsEditingCountryCode(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Neural Network Background */}
      <svg className="network-bg" viewBox="0 0 1000 1000">
        {/* Nodes */}
        <circle className="network-node" cx="100" cy="100" r="4" />
        <circle className="network-node" cx="300" cy="150" r="4" />
        <circle className="network-node" cx="500" cy="100" r="4" />
        <circle className="network-node" cx="700" cy="200" r="4" />
        <circle className="network-node" cx="200" cy="300" r="4" />
        <circle className="network-node" cx="400" cy="350" r="4" />
        <circle className="network-node" cx="600" cy="400" r="4" />
        <circle className="network-node" cx="800" cy="300" r="4" />
        <circle className="network-node" cx="150" cy="500" r="4" />
        <circle className="network-node" cx="350" cy="600" r="4" />
        <circle className="network-node" cx="550" cy="550" r="4" />
        <circle className="network-node" cx="750" cy="650" r="4" />

        {/* Connecting Lines */}
        <line className="network-line" x1="100" y1="100" x2="300" y2="150" />
        <line className="network-line" x1="300" y1="150" x2="500" y2="100" />
        <line className="network-line" x1="500" y1="100" x2="700" y2="200" />
        <line className="network-line" x1="200" y1="300" x2="400" y2="350" />
        <line className="network-line" x1="400" y1="350" x2="600" y2="400" />
        <line className="network-line" x1="600" y1="400" x2="800" y2="300" />
        <line className="network-line" x1="150" y1="500" x2="350" y2="600" />
        <line className="network-line" x1="350" y1="600" x2="550" y2="550" />
        <line className="network-line" x1="550" y1="550" x2="750" y2="650" />
        <line className="network-line" x1="100" y1="100" x2="200" y2="300" />
        <line className="network-line" x1="300" y1="150" x2="400" y2="350" />
        <line className="network-line" x1="500" y1="100" x2="600" y2="400" />
        <line className="network-line" x1="700" y1="200" x2="800" y2="300" />
      </svg>

      {/* Hero Section - Modified for fluid design */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Headphones className="h-10 w-10 text-indigo-600" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                The Podcast Digest
              </h1>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Stay Ahead with the Best Podcasts in Business, Finance and AI!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
              📩 Get daily WhatsApp updates with expert summaries from top podcasts in tech, business, and AI—delivered straight to your phone.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
              {/* Left side: Form */}
              <div className="w-full fade-in">
                {!submitted ? (
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold mb-4 text-center">Join Our Newsletter</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <div className="flex">
                          <div className="relative country-dropdown">
                            {isEditingCountryCode ? (
                              <input
                                ref={countryCodeInputRef}
                                type="text"
                                value={countryCode}
                                onChange={handleCountryCodeChange}
                                onBlur={handleCountryCodeBlur}
                                className="w-24 px-3 py-3 rounded-l-lg bg-white shadow-sm border border-gray-200 border-r-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                              />
                            ) : (
                              <button 
                                type="button"
                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                onDoubleClick={toggleCountryCodeEdit}
                                className="flex items-center justify-between w-24 px-3 py-3 rounded-l-lg bg-white shadow-sm border border-gray-200 border-r-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                              >
                                {countryCode} <ChevronDown className="h-4 w-4 ml-1" />
                              </button>
                            )}
                            {showCountryDropdown && (
                              <div className="absolute z-50 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {countryCodes.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => selectCountryCode(country.code)}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-800 text-sm flex items-center justify-between"
                                  >
                                    <span>{country.code === 'other' ? 'Other' : country.code}</span>
                                    <span className="text-gray-500 text-xs">{country.country}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <input
                            type="tel"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            placeholder="WhatsApp number"
                            required
                            className="flex-1 pl-4 pr-4 py-3 rounded-r-lg bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Click dropdown to select or double-click to edit country code
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center text-white font-medium ${
                          loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {loading ? (
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                          <>
                            Subscribe <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                    
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      By subscribing, you agree to receive updates via email and WhatsApp. We respect your privacy.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl text-center h-full flex flex-col justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">You're all set!</h3>
                    <p className="text-gray-700">
                      Thank you for subscribing. We'll send you the best podcast summaries straight to your inbox and WhatsApp.Please send this Whatsapp message : "join think-tree" to this number "+14155238886"
                    </p>
                  </div>
                )}
              </div>
              
              {/* Right side: Image */}
              <div className="w-full fade-in" style={{transitionDelay: '200ms'}}>
                <div className="relative mx-auto">
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-100 rounded-full opacity-70 z-0"></div>
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-100 rounded-full opacity-70 z-0"></div>
                  
                  <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl">
                    <img 
                      src="/images/podcastimage.png" 
                      alt="Podcast Illustration" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -left-4 p-3 bg-white rounded-lg shadow-lg z-20 animate-bounce" style={{animationDuration: '5s'}}>
                    <Brain className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 p-3 bg-white rounded-lg shadow-lg z-20 animate-bounce" style={{animationDuration: '7s', animationDelay: '1s'}}>
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribers List Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Added podcast partnerships text */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 uppercase tracking-wider">Podcast Partnerships</p>
          </div>
          <div className="marquee" style={{background: 'none'}}>
            <div className="marquee-content py-3">
              {subscribers.map((subscriber, index) => (
                <span 
                  key={index} 
                  className="mx-6 font-medium inline-flex items-center"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span style={
                    index % 3 === 0 ? { 
                      fontFamily: 'Inter, sans-serif', 
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#000000'
                    } :
                    index % 3 === 1 ? { 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.5rem',
                      fontStyle: 'italic',
                      color: '#000000'
                    } :
                    { 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.5rem',
                      textDecoration: 'underline',
                      color: '#000000'
                    }
                  }>
                    {subscriber}
                  </span>
                </span>
              ))}
              {/* Duplicate for seamless scrolling */}
              {subscribers.map((subscriber, index) => (
                <span 
                  key={`duplicate-${index}`} 
                  className="mx-6 font-medium inline-flex items-center"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span style={
                    index % 3 === 0 ? { 
                      fontFamily: 'Inter, sans-serif', 
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#000000'
                    } :
                    index % 3 === 1 ? { 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.5rem',
                      fontStyle: 'italic',
                      color: '#000000'
                    } :
                    { 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.5rem',
                      textDecoration: 'underline',
                      color: '#000000'
                    }
                  }>
                    {subscriber}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We do the heavy lifting so you can save time by not listening to hours and hours of podcasts and still get the latest news
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center flex-1 max-w-xs mx-auto fade-in" style={{transitionDelay: '100ms'}}>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20 text-white">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Subscribe</h3>
              <p className="text-gray-700">
                Enter your email and WhatsApp to join our newsletter. It's free and you can unsubscribe anytime.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center flex-1 max-w-xs mx-auto fade-in" style={{transitionDelay: '200ms'}}>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20 text-white">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-3">We Listen</h3>
              <p className="text-gray-700">
                Our team listens to hours of podcasts and creates concise summaries using AI without missing anything important.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center flex-1 max-w-xs mx-auto fade-in" style={{transitionDelay: '300ms'}}>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20 text-white">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Stay Informed</h3>
              <p className="text-gray-700">
                Receive daily digests with key insights and takeaways discussed on the best podcasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Headphones className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">The Podcast Digest</span>
            </div>
            <div className="flex gap-6">
              <a 
                href="https://www.linkedin.com/in/avnish-ranjak-32070ba0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://avnishranjak.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-15.5a1 1 0 011 1V12a1 1 0 11-2 0V7.5a1 1 0 011-1zm0 8.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
