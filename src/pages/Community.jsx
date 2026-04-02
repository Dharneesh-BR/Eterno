import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUsers, FiMonitor, FiActivity, FiHeart, FiZap, FiGlobe, FiTarget, FiTrendingUp, FiShield, FiAward, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';

export default function Community() {
  return (
    <>
      <SEO 
        title="Join the Longevity Movement - Eterno Community"
        description="Join Eterno's global community of individuals committed to living longer, sharper, stronger, and happier. Experience science-backed longevity protocols and AI-powered personalization."
        keywords="eterno community, longevity movement, holistic health, metabolic wellness, ai personalized health, conscious living"
        image="/images/eterno-community.jpg"
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Join the Longevity Movement',
          description: 'Join Eterno Community and transform your health journey with science-backed longevity protocols.',
          url: 'https://eterno.fit/community',
          mainEntity: {
            '@type': 'Organization',
            name: 'Eterno',
            description: 'Redefining the Future of Human Longevity'
          }
        }}
      />

      {/* Hero Banner Section */}
      <div className="relative w-full py-40 overflow-hidden">
        <img 
          src="/assets/Community.webp"
          alt="Eterno Community Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-indigo-900/20" />
        
        {/* Banner Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Join the Longevity Movement
            </h1>
            <h2 className="text-h3 font-light text-indigo-200">
              of Human Longevity
            </h2>
          </div>
        </div>
        
      

      <div className="min-h-screen w-full py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <Link to="/" className="flex items-center text-indigo-300 hover:text-white mb-8 transition-colors duration-300 group">
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" /> Back to Home
          </Link>

          <div className="space-y-16">
            {/* Introduction */}
            <div className="text-center mb-16">
              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-white mb-6 leading-relaxed">
                  You are not here by accident.
                </p>
                <p className="text-lg md:text-xl text-indigo-200 mb-8 leading-relaxed">
                  You are here because you believe health can be <span className="text-purple-300 font-semibold">proactive</span>. <span className="text-purple-300 font-semibold">Intelligent</span>. <span className="text-purple-300 font-semibold">Intentional</span>.
                </p>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
                  <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                    Eterno is more than a program.
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-white mb-6">
                    It is a global community of individuals committed to living longer, sharper, stronger — and happier.
                  </p>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    This is where science meets conscious living.
                  </p>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    This is where longevity becomes a lifestyle.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Join Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mr-4">
                  <FiUsers className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">Why Join Eterno Community?</h2>
              </div>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Because meaningful transformation doesn't happen in isolation.
              </p>

              <p className="text-lg text-white mb-8 font-semibold">
                Inside our community, you gain access to:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">🧬</span>
                    <h3 className="text-xl font-bold text-white">Longevity Intelligence</h3>
                  </div>
                  <p className="text-gray-300">Actionable insights on optimizing metabolism, energy, recovery, and biological age.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">🧠</span>
                    <h3 className="text-xl font-bold text-white">Guided Evolution</h3>
                  </div>
                  <p className="text-gray-300">Structured protocols integrating science, lifestyle design, and consciousness practices.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">📊</span>
                    <h3 className="text-xl font-bold text-white">Personalized Growth</h3>
                  </div>
                  <p className="text-gray-300">AI-supported insights and data-driven guidance tailored to your unique biology.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">🌿</span>
                    <h3 className="text-xl font-bold text-white">Holistic Alignment</h3>
                  </div>
                  <p className="text-gray-300">Body, mind, breath, energy, and daily rhythms — optimized as one interconnected system.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300 md:col-span-2">
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">🌍</span>
                    <h3 className="text-xl font-bold text-white">A Global Collective</h3>
                  </div>
                  <p className="text-gray-300">Forward-thinking individuals building a future of vitality, performance, and joy.</p>
                </div>
              </div>
            </div>

            {/* Who Is This For Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-4">
                  <FiTarget className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">Who Is This For?</h2>
              </div>
              
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                This is for those who:
              </p>

              <div className="space-y-4">
                <div className="flex items-start bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-4 border-l-4 border-purple-500">
                  <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Want to live long — but more importantly, live well</p>
                </div>
                <div className="flex items-start bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-4 border-l-4 border-purple-500">
                  <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Value clarity, energy, and mental sharpness</p>
                </div>
                <div className="flex items-start bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-4 border-l-4 border-purple-500">
                  <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Believe happiness is rooted in physical and emotional balance</p>
                </div>
                <div className="flex items-start bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-4 border-l-4 border-purple-500">
                  <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Seek vitality, not just survival</p>
                </div>
                <div className="flex items-start bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-4 border-l-4 border-purple-500">
                  <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Are committed to designing a life of strength, resilience, and purpose</p>
                </div>
                <div className="flex items-start bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-4 border-l-4 border-purple-500">
                  <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">See longevity as a conscious choice — not a genetic accident</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30">
                <p className="text-lg text-white font-semibold text-center leading-relaxed">
                  If you believe the second half of life should be stronger than the first — you belong here.
                </p>
              </div>
            </div>

            {/* What You Will Experience Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4">
                  <FiZap className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">What You Will Experience</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                  This is not about fixing problems.
                </p>
                <p className="text-xl font-semibold text-white mb-8">
                  It is about unlocking potential.
                </p>

                <p className="text-lg text-gray-200 mb-6">
                  Inside Eterno, you will experience:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FiActivity className="text-green-400 mr-3 text-xl" />
                    <p className="text-gray-200">Sustained energy and natural vitality</p>
                  </div>
                  <div className="flex items-center">
                    <FiMonitor className="text-blue-400 mr-3 text-xl" />
                    <p className="text-gray-200">Greater mental clarity and focus</p>
                  </div>
                  <div className="flex items-center">
                    <FiHeart className="text-red-400 mr-3 text-xl" />
                    <p className="text-gray-200">Emotional steadiness and inner balance</p>
                  </div>
                  <div className="flex items-center">
                    <FiShield className="text-purple-400 mr-3 text-xl" />
                    <p className="text-gray-200">Deeper connection with your body's intelligence</p>
                  </div>
                  <div className="flex items-center">
                    <FiTrendingUp className="text-yellow-400 mr-3 text-xl" />
                    <p className="text-gray-200">Stronger recovery and resilience</p>
                  </div>
                  <div className="flex items-center">
                    <FiAward className="text-indigo-400 mr-3 text-xl" />
                    <p className="text-gray-200">A refined daily rhythm aligned with longevity</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-white/20">
                <p className="text-lg text-gray-200 leading-relaxed mb-4">
                  It is a shift from reactive living to intentional living.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed mb-4">
                  From stress-driven habits to structured vitality.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed">
                  From aging unconsciously to aging powerfully.
                </p>
                <p className="text-xl font-semibold text-white mt-4 text-center">
                  A new way of life — designed for strength, joy, and longevity.
                </p>
              </div>
            </div>

            {/* The Eterno Way Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-4">
                  <FiGlobe className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">The Eterno Way</h2>
              </div>
              
              <p className="text-lg text-gray-200 mb-8">
                We integrate:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                  <p className="text-purple-300 font-semibold">Modern science</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                  <p className="text-purple-300 font-semibold">AI-powered personalization</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                  <p className="text-purple-300 font-semibold">Systems biology</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                  <p className="text-purple-300 font-semibold">Lifestyle design</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                  <p className="text-purple-300 font-semibold">Ancient wisdom traditions</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                  <p className="text-purple-300 font-semibold">Breath and mind sciences</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl p-6 border border-white/20">
                <p className="text-lg text-gray-200 leading-relaxed mb-4">
                  Into one cohesive framework for lifelong vitality.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed mb-4">
                  Technology accelerates insight.
                </p>
                <p className="text-xl font-semibold text-white text-center">
                  But human transformation remains at the center.
                </p>
              </div>
            </div>

            {/* Future Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-4">
                  <FiTrendingUp className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">The Future Is Intentional</h2>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-lg text-gray-200 leading-relaxed">
                  Longevity is not about extending years alone.
                </p>
                <p className="text-xl font-semibold text-white leading-relaxed">
                  It is about expanding vitality, clarity, and joy — at every age.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10">
                  <p className="text-lg text-gray-200 leading-relaxed">
                    Your biology is intelligent.
                  </p>
                  <p className="text-lg text-white leading-relaxed mt-2">
                    With the right structure and guidance, it can adapt, optimize, and thrive.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10">
                  <p className="text-lg text-gray-200 leading-relaxed">
                    The journey begins with understanding.
                  </p>
                  <p className="text-lg text-white leading-relaxed mt-2">
                    The transformation happens through consistent, intentional action.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Begin Your Longevity Journey
                </h2>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Join Eterno Community Today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                    Join Community
                  </button>
                  <Link to="/categories" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all">
                    Explore Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
