import { Link } from 'react-router-dom';
import { FiArrowLeft, FiTarget, FiActivity, FiHeart, FiShield, FiTrendingUp, FiZap, FiAward, FiUsers, FiCheckCircle, FiMonitor } from 'react-icons/fi';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO 
        title="About Eterno - Redefining Human Longevity"
        description="Eterno is pioneering the future of human longevity through AI-powered diabetes reversal, advanced diagnostics, and personalized health protocols. Discover our mission to transform metabolic health."
        keywords="eterno, human longevity, diabetes reversal, metabolic health, precision medicine, AI healthcare, biological aging, chronic disease prevention"
        image="/images/eterno-longevity.jpg"
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Eterno',
          description: 'Eterno is redefining the future of human longevity through AI-powered health solutions and personalized medicine.',
          url: 'https://eterno.fit/about',
          mainEntity: {
            '@type': 'Organization',
            name: 'Eterno',
            description: 'Redefining the Future of Human Longevity',
            url: 'https://eterno.fit',
            foundingDate: '2024',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'India'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+91-XXXXXXXXXX',
              contactType: 'customer service',
              availableLanguage: ['English']
            }
          }
        }}
      />
      {/* Hero Banner Section */}
      <div className="relative w-full py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-indigo-900/20" />
        <img 
          src="/assets/About_us.webp"
          alt="About Eterno Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-h1 text-white mb-3">
            Redefining the Future
          </h1>
          <h2 className="text-h3 font-light text-indigo-200">
            of Human Longevity
          </h2>
        </div>
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-800/20 to-indigo-900/20" />
      </div>

      <div className="min-h-screen w-full py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-80 lg:h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
                  
        <div className="space-y-16">
          {/* Introduction */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-4">
                <FiMonitor className="text-white text-xl" />
              </div>
              <h2 className="text-h2 font-bold text-white">The Eterno Story</h2>
            </div>
            <div className="space-y-4 text-gray-200">
              <p className="text-body leading-relaxed">
                Eterno is the culmination of a deep, long-standing exploration into diabetes reversal and human health for longevity.
              </p>
              <p className="text-body leading-relaxed">
                What began as a quest to understand metabolic dysfunction evolved into a multidisciplinary journey across modern medicine, Ayurveda, Yoga, breath and mind sciences, energy-based healing, and meditative practices — each offering unique insight into how the human body heals, adapts, and regenerates.
              </p>
              <p className="text-body leading-relaxed">
                These learnings have been carefully distilled into foundational protocols that power Eterno's diabetes reversal approach — integrating science, lifestyle, and consciousness into a single, coherent system.
              </p>
            </div>
          </div>

          {/* Transformation */}
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4">
                <FiActivity className="text-white text-xl" />
              </div>
              <h2 className="text-h2 font-bold text-white">Whole-System Transformation</h2>
            </div>
            <p className="text-lg text-gray-200 leading-relaxed">
              Through this program, individuals across the world experience more than improved blood sugar control. They undergo a whole-system transformation — in metabolic health, mental clarity, emotional balance, and overall vitality.
            </p>
            
            {/* Transformation Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4">
                <FiActivity className="text-white text-xl" />
              </div>
              <h2 className="text-h2 font-bold text-white">Metabolic Health</h2>
              <p className="text-gray-300 text-sm sm:text-base">Optimized blood sugar and insulin sensitivity</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 text-center">
                <FiMonitor className="text-3xl text-blue-400 mx-auto mb-3" />
              </div>
              <h2 className="text-h2 font-bold text-white">Mental Clarity</h2>
              <p className="text-gray-300 text-sm sm:text-base">Enhanced cognitive function and focus</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 text-center">
                <FiZap className="text-3xl text-yellow-400 mx-auto mb-3" />
                <h3 className="text-h3 font-bold text-white mb-2">Overall Vitality</h3>
                <p className="text-gray-300 text-sm sm:text-base">Increased energy and life force</p>
              </div>
            </div>
          </div>

          {/* Our Esteemed Founders Section */}
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-white mb-4">Team Behind eterno</h2>
            <p className="text-body text-gray-300 max-w-2xl mx-auto">Meet the visionaries behind Eterno, dedicated to redefining human longevity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Founder 1: Dharneesh B R */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative w-40 h-40 mb-6">
                <img 
                  src="/assets/Dharneesh BR.webp"
                  alt="Dharneesh B R"
                  className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                />
              </div>
              <h3 className="text-h3 font-bold text-white mb-2">Mr Dharneesh B R</h3>
              <p className="text-purple-300 text-small mb-4">Co-Founder & Chief Executive Officer</p>
              <div className="text-gray-300 text-sm space-y-2">
                <p>IIM Lucknow</p>
                <p>Health Tech Entrepreneur</p>
                <p>Ex-Samsung | Philips | Uniliver | GSK</p>
              </div>
            </div>

            {/* Founder 2: Abhishek */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative w-40 h-40 mb-6">
                <img 
                  src="/assets/Dr Abhishek L Hiremath.webp"
                  alt="Abhishek"
                  className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                />
              </div>
              <h3 className="text-h3 font-bold text-white mb-2">Dr Abhishek L Hiremath</h3>
              <p className="text-purple-300 text-small mb-4">Co-Founder & Chief Medical Officer</p>
              <div className="text-gray-300 text-sm space-y-2">
                <p>MBBS, Diabetologist</p>
                <p>Diabetes & Holistic Health Specialist</p>
                <p>Mind-Body Wellness Coach</p>
              </div>
            </div>

            {/* Team Member 3: Manasa */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative w-40 h-40 mb-6">
                <img 
                  src="/assets/Manasa.webp"
                  alt="Manasa"
                  className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                />
              </div>
              <h3 className="text-h3 font-bold text-white mb-2">Manasa</h3>
              <p className="text-purple-300 text-small mb-4">Chief Wellness Officer</p>
              <div className="text-gray-300 text-sm space-y-2">
                <p>Health & Wellness Transformation</p>
                <p>Sound Healing Therapist</p>
                <p>Neuro Linguistic Programming</p>
                <p>Yoga & Meditation Expert</p>
              </div>
            </div>

            {/* Team Member 4: Dr Usha Kulkarni */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative w-40 h-40 mb-6">
                <img 
                  src="/assets/Dr Usha Kulkarni.webp"
                  alt="Dr Usha Kulkarni"
                  className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Dr Usha Kulkarni</h3>
              <p className="text-purple-300 text-md mb-4">Nutrition Advisor & Mentor</p>
              <div className="text-gray-300 text-sm space-y-2">
                <p>PhD in Human Nutrition</p>
                <p>Ohio State University, USA</p>
                <p>25+ Years of Experience</p>
                <p>Health Transformation in India, East African Countries, USA & Nepal</p>
              </div>
            </div>

            {/* Team Member 5: Jagruti Moorthy */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative w-40 h-40 mb-6">
                <img 
                  src="/assets/Jagruti Moorthy.webp"
                  alt="Jagruti Moorthy"
                  className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Jagruti Moorthy</h3>
              <p className="text-purple-300 text-md mb-4">Wellness Coach</p>
              <div className="text-gray-300 text-sm space-y-2">
                <p>15+ Years of Experience</p>
                <p>Wellness & Life Transformation</p>
              </div>
            </div>

            {/* Team Member 6: Adithya N Kashyap */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative w-40 h-40 mb-6">
                <img 
                  src="/assets/Adithya.webp"
                  alt="Adithya N Kashyap"
                  className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Adithya N Kashyap</h3>
              <p className="text-purple-300 text-md mb-4">Software Engineer</p>
              <div className="text-gray-300 text-sm space-y-2">
                <p>Technology Architect</p>
                <p>3+ Years of Wellness Practitioner</p>
              </div>
            </div>
          </div>

          {/* Third Row - Centered */}
          <div className="flex justify-center mt-10">
            {/* Team Member 7: Likith D */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm">
              <div className="relative w-40 h-40 mb-6">
                <img 
                  src="/assets/Likith D.webp"
                  alt="Likith D"
                  className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Likith D</h3>
              <p className="text-purple-300 text-md mb-4">Marketing Manager</p>
              <div className="text-gray-300 text-sm space-y-2">
                <p>AI & Digital Marketing</p>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-4">
                <FiTarget className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Philosophy</h2>
            </div>
            <h3 className="text-2xl font-semibold text-indigo-300 mb-8">Our Core Beliefs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <FiShield className="text-2xl text-indigo-300 mr-3" />
                  <h4 className="text-xl font-semibold text-white">Data-Driven</h4>
                </div>
                <p className="text-gray-300">
                  Decisions guided by insights, not assumptions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <FiAward className="text-2xl text-purple-300 mr-3" />
                  <h4 className="text-xl font-semibold text-white">Evidence-Based</h4>
                </div>
                <p className="text-gray-300">
                  Science over trends. Research over noise.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/10 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <FiUsers className="text-2xl text-green-300 mr-3" />
                  <h4 className="text-xl font-semibold text-white">Holistic by Design</h4>
                </div>
                <p className="text-gray-300">
                  Body, mind, metabolism, and lifestyle are interconnected — health cannot be fragmented.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-white/10 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <FiHeart className="text-2xl text-yellow-300 mr-3" />
                  <h4 className="text-xl font-semibold text-white">Human-Centric</h4>
                </div>
                <p className="text-gray-300">
                  Technology in service of human well-being — never the other way around.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-xl border border-white/20">
              <div className="flex items-center">
                <FiZap className="text-2xl text-yellow-400 mr-3" />
                <p className="text-white font-medium text-lg">
                  We use AI to accelerate the speed at which science benefits you.
                </p>
              </div>
            </div>
          </div>

          {/* Building the Longevity Revolution */}
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mr-4">
                <FiTrendingUp className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">Building the Longevity Revolution</h2>
            </div>
            <div className="space-y-4 text-gray-200">
              <p className="text-lg leading-relaxed">
                Eterno is a next-generation health and longevity company dedicated to redefining how the world approaches aging and chronic disease.
              </p>
              <p className="text-lg leading-relaxed">
                We bridge the gap between cutting-edge scientific innovation and deeply personalized well-being. By harnessing artificial intelligence, advanced diagnostics, and systems biology, we move beyond symptom management to uncover the true root causes of:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-red-500/20 rounded-xl p-4 text-center border border-red-500/30">
                <FiShield className="text-2xl text-red-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Chronic Disease</h4>
              </div>
              <div className="bg-orange-500/20 rounded-xl p-4 text-center border border-orange-500/30">
                <FiTarget className="text-2xl text-orange-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Cancer Risk</h4>
              </div>
              <div className="bg-yellow-500/20 rounded-xl p-4 text-center border border-yellow-500/30">
                <FiActivity className="text-2xl text-yellow-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Metabolic Dysfunction</h4>
              </div>
              <div className="bg-pink-500/20 rounded-xl p-4 text-center border border-pink-500/30">
                <FiHeart className="text-2xl text-pink-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Biological Aging</h4>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4">
                <FiTarget className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-4">
                <FiCheckCircle className="text-green-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-2">Detect Health Risks Early</h4>
                  <p className="text-gray-300">Identify potential health issues before they manifest as disease</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FiCheckCircle className="text-blue-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-2">Enable Proactive Prevention</h4>
                  <p className="text-gray-300">Early diagnosis and intervention to prevent chronic conditions</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FiCheckCircle className="text-purple-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-2">Personalized Interventions</h4>
                  <p className="text-gray-300">Data-driven intelligence tailored to your unique biology</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FiCheckCircle className="text-orange-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-2">Reverse Biological Decline</h4>
                  <p className="text-gray-300">Turn back the clock on aging and restore vitality</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-xl p-6 border border-white/20">
              <p className="text-white text-lg font-medium text-center">
                We believe longevity is not about adding years to life — but adding life to years.
              </p>
            </div>
          </div>

          {/* The Longevity Revolution */}
          <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mr-4">
                  <FiZap className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">The Longevity Revolution Has Begun</h2>
              </div>
              
              <p className="text-lg text-gray-200 leading-relaxed mb-8">
                At Eterno, precision health, epigenetics, and AI-powered personalization empower individuals to take control of their biological age, optimize vitality, and live longer — stronger.
              </p>
              
              <div className="text-center">
                <p className="text-white font-bold text-2xl mb-4">
                  The longevity revolution has begun.
                </p>
                <p className="text-indigo-300 font-semibold text-xl">
                  And we are building it.
                </p>
              </div>
            </div>
          </div>

          {/* The Future of Health */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mr-4">
                <FiMonitor className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">The Future of Health Is Here</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-white/10">
                <p className="text-white text-lg font-medium mb-2">
                  Longevity is not about living longer in decline.
                </p>
                <p className="text-cyan-200 text-lg">
                  It is about living better, sharper, and stronger — at every age.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-3">
                  <FiMonitor className="text-2xl text-purple-300 mr-3" />
                  <p className="text-white font-semibold text-lg">
                    Your biology is intelligent.
                  </p>
                </div>
                <p className="text-gray-300">
                  With the right data, guidance, and integrated systems — it can heal, adapt, and thrive.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/10">
                <p className="text-white font-semibold text-lg mb-2">
                  This is not reactive healthcare.
                </p>
                <p className="text-green-300 font-bold text-xl">
                  This is proactive biological mastery.
                </p>
              </div>
            </div>
          </div>
        {/* Why Eterno Section */}
        <section className="relative w-full py-20 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Eterno</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Discover what makes us the trusted choice for your holistic wellness journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI-Powered Personalization</h3>
                <p className="text-white/80 leading-relaxed">
                  Every protocol adapts to your unique data, ensuring personalized wellness approaches that evolve with your health journey.
                </p>
              </div>

              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Evidence-Based Science</h3>
                <p className="text-white/80 leading-relaxed">
                  All our protocols are backed by rigorous clinical research and validated through scientific studies for proven results.
                </p>
              </div>

              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Root-Cause Focused</h3>
                <p className="text-white/80 leading-relaxed">
                  We address the underlying causes of health issues rather than just suppressing symptoms for lasting wellness.
                </p>
              </div>

              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Preventive & Reversal-Oriented</h3>
                <p className="text-white/80 leading-relaxed">
                  Designed for long-term health, our approaches focus on preventing disease and reversing existing conditions naturally.
                </p>
              </div>

              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Longevity-First Thinking</h3>
                <p className="text-white/80 leading-relaxed">
                  We optimize both lifespan and healthspan, helping you live longer while maintaining optimal health and vitality.
                </p>
              </div>
            </div>

            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 md:p-12 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Health?</h3>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands who have already discovered the Eterno difference and started their journey to lasting wellness.
                </p>
                <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                  Start Your Journey Today
                </button>
              </div>
            </div>
          </div>
        </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                  <FiHeart className="text-white text-3xl" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Begin Your Longevity Journey with Eterno</h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Take control of your biological age and optimize your vitality today.
              </p>
              <Link 
                to="/" 
                className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Get Started Now
              </Link>
            </div>
          </div>

        </div>
      
    </>
  );
}
