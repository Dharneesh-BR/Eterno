import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUsers, FiTarget, FiActivity, FiHeart, FiZap, FiGlobe, FiTrendingUp, FiShield, FiAward, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';

export default function Partner() {
  return (
    <>
      <SEO 
        title="Partner With Eterno - Transform 1 Million Lives"
        description="Join Eterno's mission to transform 1 million lives through intelligent longevity, preventive health, and conscious living. Partner with us to build the future of healthcare."
        keywords="eterno partnership, healthcare collaboration, longevity movement, preventive health, medical practitioners, holistic health"
        image="/assets/partner banner.webp"
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Partner With Eterno',
          description: 'Join Eterno Partnership Program and transform healthcare through collaboration.',
          url: 'https://eterno.fit/partner',
          mainEntity: {
            '@type': 'Organization',
            name: 'Eterno',
            description: 'Transforming Future of Human Longevity'
          }
        }}
      />

      {/* Hero Banner Section */}
      <div className="relative w-full py-40 overflow-hidden">
        <img 
          src="/assets/partner banner.webp"
          alt="Eterno Partnership Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-indigo-900/30 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Join the Movement to Transform 1 Million Lives
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-2">
              The future of health will not be built by one discipline.
            </p>
            <p className="text-lg md:text-xl text-white/90">
              It will be built by collaboration.
            </p>
          </div>
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

          <div className="space-y-16">
            {/* Mission Statement */}
            <div className="text-center mb-16">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
                  <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                    Eterno is on a mission to transform <span className="text-purple-300 font-bold">1 million lives</span> through intelligent longevity, preventive health, and conscious living.
                  </p>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    We are building a global ecosystem of forward-thinking health practitioners who believe that care should be proactive, personalized, and deeply human.
                  </p>
                  <p className="text-xl text-white font-semibold mt-8 text-center">
                    This is not just a partnership.
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-purple-300 text-center">
                    It is an invitation to shape the future of healthcare.
                  </p>
                </div>
              </div>
            </div>

            {/* Why This Movement Matters */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mr-4">
                  <FiTarget className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">Why This Movement Matters</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10">
                  <p className="text-lg text-white leading-relaxed">
                    Healthcare today is reactive.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10">
                  <p className="text-lg text-white leading-relaxed">
                    Longevity demands prevention.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10">
                  <p className="text-lg text-white leading-relaxed">
                    Human well-being requires integration.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl p-6 border border-purple-500/30">
                <p className="text-lg text-gray-200 leading-relaxed mb-4">
                  We believe the next evolution of health will:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-200">Detect risks before disease manifests</p>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-200">Personalize care using intelligent data</p>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-200">Integrate mind, metabolism, lifestyle, and emotional well-being</p>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-200">Empower individuals to take ownership of their biology</p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-white font-semibold text-center mt-8">
                To reach 1 million people, we need aligned experts who share this vision.
              </p>
            </div>

            {/* Who We Invite */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-4">
                  <FiUsers className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">Who We Invite</h2>
              </div>
              
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                We are partnering with:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🩺</span>
                    <h3 className="text-xl font-bold text-white">Doctors and Preventive Health Physicians</h3>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🥗</span>
                    <h3 className="text-xl font-bold text-white">Nutritionists and Functional Medicine Experts</h3>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🧠</span>
                    <h3 className="text-xl font-bold text-white">Psychologists and Mental Health Professionals</h3>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🏃</span>
                    <h3 className="text-xl font-bold text-white">Lifestyle and Longevity Coaches</h3>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🧘</span>
                    <h3 className="text-xl font-bold text-white">Yoga and Breathwork Practitioners</h3>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🤸</span>
                    <h3 className="text-xl font-bold text-white">Mind-Body Therapists</h3>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🌿</span>
                    <h3 className="text-xl font-bold text-white">Integrative and Holistic Health Experts</h3>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30">
                <p className="text-lg text-white font-semibold text-center leading-relaxed">
                  If you believe health is interconnected — you belong here.
                </p>
              </div>
            </div>

            {/* What Partnership Looks Like */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4">
                  <FiAward className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">What Partnership With Eterno Looks Like</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🌍</span>
                    <h3 className="text-xl font-bold text-white">Collective Impact</h3>
                  </div>
                  <p className="text-gray-300">Be part of a mission-driven network transforming lives at scale.</p>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🧬</span>
                    <h3 className="text-xl font-bold text-white">Integrated Framework</h3>
                  </div>
                  <p className="text-gray-300">Work within a structured longevity model powered by science, AI, and systems biology.</p>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">📊</span>
                    <h3 className="text-xl font-bold text-white">Intelligent Support</h3>
                  </div>
                  <p className="text-gray-300">Access data-driven tools that enhance precision and personalization in your practice.</p>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🤝</span>
                    <h3 className="text-xl font-bold text-white">Collaborative Ecosystem</h3>
                  </div>
                  <p className="text-gray-300">Move beyond isolated practice into an integrated care model.</p>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🚀</span>
                    <h3 className="text-xl font-bold text-white">Growth & Visibility</h3>
                  </div>
                  <p className="text-gray-300">Expand your impact through a global longevity platform.</p>
                </div>
              </div>
            </div>

            {/* Our Shared Vision */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-4">
                  <FiGlobe className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Shared Vision</h2>
              </div>
              
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                We envision a world where:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/10">
                  <p className="text-lg text-white leading-relaxed">
                    Preventive health replaces reactive medicine.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/10">
                  <p className="text-lg text-white leading-relaxed">
                    Longevity becomes intentional.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/10">
                  <p className="text-lg text-white leading-relaxed">
                    And practitioners collaborate instead of operating in silos.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
                <p className="text-lg text-gray-200 leading-relaxed mb-4">
                  Together, we can:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-200">Transform metabolic health.</p>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-200">Elevate mental resilience.</p>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-200">Enhance vitality at every age.</p>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-200">And redefine how humanity ages.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* This Is Bigger Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  This Is Bigger Than a Platform
                </h2>
                <p className="text-xl text-purple-300 font-semibold">It is a movement.</p>
              </div>
              <div className="text-center">
                <p className="text-xl text-purple-300 font-semibold">A shift from treatment to transformation.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30">
                <p className="text-2xl text-white font-semibold text-center leading-relaxed">
                  If you are ready to contribute your expertise toward transforming 1 million lives —
                </p>
                <p className="text-3xl md:text-4xl font-bold text-purple-300 text-center mt-4">
                  Partner With Eterno.
                </p>
                <p className="text-xl text-white text-center mt-4">
                  Let's Build the Longevity Revolution — Together.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Shape the Future of Healthcare?
                  </h2>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Join our mission to transform 1 million lives through collaborative, intelligent, and preventive healthcare.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                    Partner With Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
