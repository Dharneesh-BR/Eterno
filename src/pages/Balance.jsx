import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { trackCTAClick } from '../utils/metaPixel';

export default function Balance() {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
      
      <SEO 
        title="Balance Weight Program - Eterno"
        description="Doctor-led, AI-powered weight transformation program using genetic testing, microbiome analysis, and precision diagnostics for sustainable metabolic health."
        keywords="balance weight program, metabolic health, genetic testing, microbiome analysis, precision health, sustainable weight loss"
        image="/assets/Balance weight 2.webp"
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Balance Weight Program - Eterno',
          description: 'Doctor-led, AI-powered transformation program designed to restore your body\'s metabolic intelligence using advanced diagnostics.',
          url: 'https://eterno.fit/balance',
          mainEntity: {
            '@type': 'Organization',
            name: 'Eterno',
            description: 'Precision health and wellness programs'
          }
        }}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hidden sm:block relative w-screen min-h-[97.5vh] sm:min-h-[90vh] md:min-h-[90vh] overflow-hidden">
          {/* Banner Image Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src="/assets/Balance weight 2.webp"
              alt="Eterno Banner"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/50 to-black/0"></div>
          </div>
         
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24">
            <div className="text-left mb-12">
              <h1 className="text-h1 text-white mb-4 leading-tight break-words px-4">
                Healthy Weight <br/>For a Longer Life.
                  
              </h1>
              <h2 className="text-h2 text-white mb-4 leading-tight break-words px-4">
                Balance your metabolism <br/>For lifelong vitality.
                  
              </h2>
                                     
            </div>
          </div>
        </section>

        {/* Mobile Content Section - Above Banner */}
        <section className="sm:hidden relative w-full py-12 bg-gradient-to-br from-black/50 via-black/30 to-black/50">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-h1 text-purple-300 mb-6 leading-tight break-words">
              <span className="text-white bg-clip-text bg-transparent">
                Healthy Weight for a Longer Life.<br/>
              </span>
              <span className="text-h2 text-white bg-clip-text bg-transparent">
                Balance your metabolism for lifelong vitality.
              </span>
            </h1>
                                  
          </div>
        </section>

        {/* Mobile Banner Section - Below Content */}
        <section className="sm:hidden relative w-full py-40 overflow-hidden">
          {/* Banner Image Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src="/assets/balance weight.webp"
              alt="Eterno Banner"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </section>
        
        {/* Floating App Image - Between Hero and Why Traditional Weight Loss Fails */}
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[24rem] pointer-events-none">
          <div className="absolute inset-0 flex items-start justify-center md:items-center md:pt-8">
            <img 
              src="/assets/eva app 2.webp"
              alt="Eterno App"
              className="w-96 h-96 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain"
              style={{
                animation: 'float 6s ease-in-out infinite',
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>
        </div>

        {/* Why Traditional Weight Loss Fails */}
        <section className="pt-36 sm:pt-24 py-8 relative overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#936af7]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 backdrop-blur-lg rounded-xl p-4 border border-purple-300 shadow-md max-w-lg mx-auto">
                <h2 className="text-h2 font-bold text-white mb-3 sm:mb-4 leading-tight">
                  <span className="text-purple-600 bg-clip-text bg-gradient-to-r from-[#936af7] via-blue-300 to-indigo-300 animate-gradient">
                    Why Traditional Weight Loss Fails
                  </span>
                </h2>
                
                <p className="text-h3 text-purple-500 font-semibold leading-relaxed mb-6">Most programs focus on calorie restriction & generic plans. <br/>They ignore:</p>
                
                <div className="space-y-3 mb-6">
                  {[
                    'Genetic predispositions',
                    'Gut microbiome diversity',
                    'Hormonal patterns',
                    'Stress physiology',
                    'Sleep architecture',
                    'Individual metabolic response'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 bg-[#936af7] rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-800 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-800 mb-4 leading-relaxed">Without understanding your biology, sustainable change is impossible.</p>
                <p className="text-base sm:text-lg md:text-xl text-purple-500 font-bold tracking-wide">
                  Your biology is your blueprint.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Precision Diagnostics */}
        <section className="py-16 relative overflow-hidden bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Foundation of Your Transformation
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Advanced diagnostics that decode your unique biology for personalized results
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Genetic Testing Card */}
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                  <div className="flex items-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🧬</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Genetic Testing</h3>
                      <p className="text-blue-100 text-sm">DNA-Based Analysis</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Your genes influence:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Fat storage patterns',
                        'Carbohydrate sensitivity',
                        'Lipid metabolism',
                        'Inflammation response',
                        'Detoxification pathways',
                        'Exercise responsiveness'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-purple-300 rounded-lg p-4">
                    <p className="text-sm text-gray-700 font-medium mb-2">Through DNA analysis, we:</p>
                    <div className="space-y-1">
                      {[
                        'Personalize macronutrient ratios',
                        'Optimize training style',
                        'Identify metabolic vulnerabilities',
                        'Reduce trial-and-error dieting'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-purple-200/50">
                    <p className="text-center text-gray-500 italic text-sm">
                      "Your genetics are not your destiny — They are your blueprint."
                    </p>
                  </div>
                </div>
              </div>

              {/* Microbiome Testing Card */}
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-teal-500 to-green-600 p-6">
                  <div className="flex items-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🦠</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Microbiome Testing</h3>
                      <p className="text-teal-100 text-sm">Gut Health Mapping</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Your gut microbiome affects:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Weight regulation',
                        'Insulin sensitivity',
                        'Nutrient absorption',
                        'Cravings & appetite',
                        'Inflammation',
                        'Mood & mental clarity'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-teal-300 rounded-lg p-4">
                    <p className="text-sm text-gray-700 font-medium mb-2">Based on analysis, we create:</p>
                    <div className="space-y-1">
                      {[
                        'Personalized nutrition strategies',
                        'Targeted prebiotic & probiotic plans',
                        'Gut restoration protocols',
                        'Anti-inflammatory dietary adjustments'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-teal-200/50">
                    <p className="text-center text-gray-500 italic text-sm">
                      "A balanced microbiome supports sustainable fat loss & metabolic efficiency."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Holistic Framework */}
        <section className="py-16 relative overflow-hidden bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Holistic Framework
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Beyond testing, we integrate balance across all aspects of your health
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: '🧬',
                  title: 'Metabolic Intelligence',
                  description: 'Improving insulin sensitivity & metabolic flexibility.',
                  color: 'from-purple-500 to-indigo-600',
                  bgColor: 'from-purple-50 to-indigo-50',
                  borderColor: 'border-purple-200'
                },
                {
                  icon: '🧠',
                  title: 'Nervous System Regulation',
                  description: 'Managing stress & cortisol to prevent weight retention.',
                  color: 'from-blue-500 to-cyan-600',
                  bgColor: 'from-blue-50 to-cyan-50',
                  borderColor: 'border-blue-200'
                },
                {
                  icon: '🌿',
                  title: 'Lifestyle Architecture',
                  description: 'Optimizing circadian rhythm, sleep & recovery.',
                  color: 'from-green-500 to-emerald-600',
                  bgColor: 'from-green-50 to-emerald-50',
                  borderColor: 'border-green-200'
                },
                {
                  icon: '🫁',
                  title: 'Breath & Energy Optimization',
                  description: 'Enhancing oxygen efficiency & resilience.',
                  color: 'from-teal-500 to-cyan-600',
                  bgColor: 'from-teal-50 to-cyan-50',
                  borderColor: 'border-teal-200'
                },
                {
                  icon: '🧘',
                  title: 'Conscious Behavioral Design',
                  description: 'Creating sustainable eating & lifestyle habits.',
                  color: 'from-indigo-500 to-purple-600',
                  bgColor: 'from-indigo-50 to-purple-50',
                  borderColor: 'border-indigo-200'
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br ${item.bgColor} rounded-2xl shadow-lg border ${item.borderColor} overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <div className={`bg-gradient-to-r ${item.color} p-4`}>
                    <div className="flex items-center text-white">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-2xl p-6 border border-purple-200 shadow-lg max-w-2xl mx-auto">
                <p className="text-lg text-gray-800 mb-3 font-medium">
                  Weight becomes the natural result of systemic harmony.
                </p>
                <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 font-bold">
                  Balance is the foundation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor-Led AI-Powered */}
        <section className="py-16 relative overflow-hidden bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Doctor-Led. AI-Powered.
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Combining medical expertise with artificial intelligence for personalized care
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Clinical Oversight Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                  <div className="flex items-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">👨‍⚕️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Clinical Oversight</h3>
                      <p className="text-blue-100 text-sm">Expert Medical Guidance</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Doctors & health experts:</h4>
                    <div className="space-y-2">
                      {[
                        'Interpret genetic & microbiome data',
                        'Assess metabolic markers',
                        'Design personalized intervention plans',
                        'Monitor & adjust protocols'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50/50 rounded-lg p-4">
                    <p className="text-center text-blue-600 font-semibold">
                      Precision meets safety.
                    </p>
                  </div>
                </div>
              </div>

              {/* AI-Driven Card */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl shadow-xl border border-teal-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6">
                  <div className="flex items-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">AI-Driven Adaptation</h3>
                      <p className="text-teal-100 text-sm">Smart Continuous Learning</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Our AI platform integrates:</h4>
                    <div className="space-y-2">
                      {[
                        'DNA insights',
                        'Microbiome results',
                        'Biomarkers',
                        'Activity & sleep data',
                        'Nutritional response tracking',
                        'Behavioral patterns'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-teal-50/50 rounded-lg p-4">
                    <p className="text-center text-gray-700 mb-2">The system continuously adapts as your biology evolves.</p>
                    <p className="text-center text-teal-600 font-semibold">
                      No static plans. Only dynamic intelligence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Eterno Wellness App */}
        <section className="py-16 relative overflow-hidden bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Eterno Wellness App
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Your personalized health command center for comprehensive wellness management
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: '📊',
                  title: 'Precision Dashboard',
                  description: 'Track weight trends, metabolic markers & biological progress.',
                  color: 'from-purple-500 to-indigo-600',
                  bgColor: 'from-purple-50 to-indigo-50',
                  borderColor: 'border-purple-200'
                },
                {
                  icon: '🥗',
                  title: 'Adaptive Nutrition',
                  description: 'Meal guidance aligned with genetics & microbiome profile.',
                  color: 'from-green-500 to-emerald-600',
                  bgColor: 'from-green-50 to-emerald-50',
                  borderColor: 'border-green-200'
                },
                {
                  icon: '🏃',
                  title: 'Smart Movement',
                  description: 'Exercise aligned with genetic responsiveness & recovery.',
                  color: 'from-blue-500 to-cyan-600',
                  bgColor: 'from-blue-50 to-cyan-50',
                  borderColor: 'border-blue-200'
                },
                {
                  icon: '😌',
                  title: 'Stress & Breath',
                  description: 'Nervous system recalibration tools integrated into daily life.',
                  color: 'from-teal-500 to-cyan-600',
                  bgColor: 'from-teal-50 to-cyan-50',
                  borderColor: 'border-teal-200'
                },
                {
                  icon: '📅',
                  title: 'Habit Optimization',
                  description: 'Structured micro-habit formation for sustainable transformation.',
                  color: 'from-orange-500 to-red-600',
                  bgColor: 'from-orange-50 to-red-50',
                  borderColor: 'border-orange-200'
                },
                {
                  icon: '💬',
                  title: 'Expert Access',
                  description: 'Doctor & coach guidance within the app ecosystem.',
                  color: 'from-indigo-500 to-purple-600',
                  bgColor: 'from-indigo-50 to-purple-50',
                  borderColor: 'border-indigo-200'
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br ${item.bgColor} rounded-2xl shadow-lg border ${item.borderColor} overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <div className={`bg-gradient-to-r ${item.color} p-4`}>
                    <div className="flex items-center text-white">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-2xl p-6 border border-purple-200 shadow-lg max-w-2xl mx-auto">
                <p className="text-lg text-gray-800 mb-3 font-medium">
                  Technology empowers. Doctors validate. You transform.
                </p>
                <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 font-bold">
                  Your transformation begins here.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Download App Section */}
        <section className="relative w-full py-20 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20" style={{ zIndex: 0 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-0 items-center">
              {/* Image - Above the card for all screen sizes */}
              <div className="flex justify-center">
                <img 
                  src="/assets/Download now final.webp"
                  alt="Eterno App on Mobile"
                  className="w-full h-auto max-w-sm rounded-xl"
                />
              </div>
              
              {/* Text content card - Below the image for all screen sizes */}
              <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl p-6 sm:p-8 lg:p-10 border border-purple-400 shadow-2xl max-w-2xl mx-auto" >
                <div className="text-white text-center">
                  <h2 className="text-h2 text-white mb-4 sm:mb-6">Start Your Health Journey Today</h2>
                  <p className="text-body leading-relaxed mb-4 sm:mb-6">
                    Download now Eterno Health App & a free Expert Consultation
                  </p>
                  <p className="text-body text-white/90 mb-6">
                    Available on Android & IOS for seamless access on the go.
                  </p>
                  
                  {/* App Store Buttons */}
                  <div className="flex gap-4 sm:gap-6 mt-6 sm:mt-8 justify-center">
                    {/* Apple App Store */}
                    <a href="https://apps.apple.com/in/app/eterno/id6759284060" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                      </div>
                    </a>
                    
                    {/* Google Play Store */}
                    <a href="https://play.google.com/store/apps/details?id=com.wellnessz.eterno" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg p-1">
                        <img 
                          src="/assets/playstore.webp"
                          alt="Google Play Store"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                  </div>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </>
  );
}