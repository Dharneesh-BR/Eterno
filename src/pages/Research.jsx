import { Link } from 'react-router-dom';
import { FiArrowLeft, FiActivity, FiMonitor, FiHeart, FiZap, FiGlobe, FiTarget, FiTrendingUp, FiShield, FiAward, FiCheckCircle, FiBook, FiDatabase, FiCpu, FiExternalLink } from 'react-icons/fi';
import SEO from '../components/SEO';
import { useResearchData } from '../hooks/useResearchData';
import { urlFor } from '../sanityClient';
import { trackCTAClick, trackViewContent } from '../utils/metaPixel';

export default function Research() {
  const { data: researchArticles, loading, error } = useResearchData();

  const ResearchCard = ({ article }) => {
    const imageUrl = article.thumbnail ? urlFor(article.thumbnail).url() : null;
    const publishedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : '';

    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 h-full min-h-[500px] md:min-h-[550px]">
        {imageUrl && (
          <div className="mb-6">
            <img 
              src={imageUrl} 
              alt={article.title}
              className="w-full h-56 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-purple-300 text-sm">{publishedDate}</span>
            {article.link && (
              <a 
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white transition-colors"
                aria-label="External link"
              >
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-4 leading-relaxed">
            {article.title}
          </h3>
          
          <p className="text-gray-300 text-sm mb-4 leading-relaxed" style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 4, 
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '6rem'
          }}>
            {article.shortDescription || article.excerpt}
          </p>
          
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <Link 
            to={`/research/${article.slug?.current}`}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            onClick={() => {
              trackCTAClick('Read More', 'Research Article Card');
              trackViewContent({
                content_name: article.title,
                content_category: 'Research Article',
                content_ids: [article.slug?.current]
              });
            }}
          >
            Read More
            <FiArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO 
        title="Research & Scientific Foundation - Eterno"
        description="Eterno's research-driven approach to longevity integrating biological aging, metabolic optimization, brain health, and precision health technologies."
        keywords="eterno research, longevity science, biological aging, metabolic health, brain health, AI precision medicine, preventive healthcare"
        image="/images/eterno-research.jpg"
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Eterno Research & Scientific Foundation',
          description: 'Evidence-based longevity research and scientific methodology at Eterno.',
          url: 'https://eterno.fit/research',
          mainEntity: {
            '@type': 'Organization',
            name: 'Eterno',
            description: 'Research-Driven Longevity Platform'
          }
        }}
      />

      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src="/assets/research page.webp"
          alt="Research Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-indigo-900/20" />
        
        {/* Banner Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Built on Research. Driven by Results.
            </h1>
            <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto">
              Evidence-based longevity science applied to human transformation
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
            {/* Scientific Foundation */}
            <div className="text-center mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Our Scientific Foundation
                </h2>
                <p className="text-lg text-gray-200 mb-12 leading-relaxed">
                  Eterno integrates research across the following domains:
                </p>
              </div>
            </div>

            {/* Research Domains */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-3">🧬</span>
                  <h3 className="text-xl font-bold text-white">Longevity & Biological Aging</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Studies on biological age, cellular repair, epigenetics, telomere dynamics, and age-related decline.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-3">📊</span>
                  <h3 className="text-xl font-bold text-white">Metabolic Optimization</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Research on metabolic flexibility, insulin sensitivity, mitochondrial function, and energy regulation.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-3">🧠</span>
                  <h3 className="text-xl font-bold text-white">Brain Health & Cognitive Performance</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Neuroplasticity, stress regulation, emotional resilience, and cognitive longevity.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-3">🌿</span>
                  <h3 className="text-xl font-bold text-white">Lifestyle & Systems Biology</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Sleep science, circadian rhythm alignment, movement physiology, and recovery science.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-3">🧘</span>
                  <h3 className="text-xl font-bold text-white">Mind-Body & Breath Sciences</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Research on nervous system regulation, vagal tone, meditation, and breathwork physiology.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-3">🤖</span>
                  <h3 className="text-xl font-bold text-white">AI & Precision Health</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Emerging studies on data-driven personalization, predictive modeling, and preventive healthcare systems.
                </p>
              </div>
            </div>

            {/* Clinical & Applied Insights */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mr-4">
                  <FiDatabase className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">Clinical & Applied Insights</h2>
              </div>
              
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                Our protocols are informed by peer-reviewed research, longitudinal data analysis, and interdisciplinary collaboration across:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <FiShield className="text-purple-400 mr-3 text-xl" />
                    <h4 className="text-lg font-bold text-white">Preventive Medicine</h4>
                  </div>
                  <p className="text-gray-300">Early detection and intervention strategies</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <FiActivity className="text-green-400 mr-3 text-xl" />
                    <h4 className="text-lg font-bold text-white">Functional & Lifestyle Medicine</h4>
                  </div>
                  <p className="text-gray-300">Root cause analysis and lifestyle interventions</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <FiGlobe className="text-blue-400 mr-3 text-xl" />
                    <h4 className="text-lg font-bold text-white">Systems Biology</h4>
                  </div>
                  <p className="text-gray-300">Holistic organism-level approaches</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <FiMonitor className="text-indigo-400 mr-3 text-xl" />
                    <h4 className="text-lg font-bold text-white">Behavioral Science</h4>
                  </div>
                  <p className="text-gray-300">Psychology and habit formation research</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <FiHeart className="text-red-400 mr-3 text-xl" />
                    <h4 className="text-lg font-bold text-white">Integrative Health Models</h4>
                  </div>
                  <p className="text-gray-300">Combined conventional and holistic approaches</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30">
                <p className="text-lg text-white text-center leading-relaxed">
                  We evaluate emerging science rigorously before integrating it into our framework.
                </p>
              </div>
            </div>

            {/* Scientific Integrity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4">
                  <FiAward className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Commitment to Scientific Integrity</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <FiCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Evidence before implementation</p>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Data before claims</p>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Continuous review and iteration</p>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Transparency in research sources</p>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-200">Alignment with global scientific standards</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl border border-purple-500/30">
                <p className="text-xl text-white font-semibold text-center leading-relaxed">
                  Eterno does not follow fads.
                </p>
                <p className="text-2xl md:text-3xl font-bold text-purple-300 text-center mt-4">
                  We follow validated science — responsibly applied.
                </p>
              </div>
            </div>

            {/* Research Process */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-4">
                  <FiCpu className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Research Process</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl p-6 border border-white/10">
                    <FiBook className="text-blue-400 text-2xl mb-3" />
                    <h4 className="text-lg font-bold text-white">Literature Review</h4>
                  </div>
                  <p className="text-gray-300 mt-2">Systematic analysis of peer-reviewed studies</p>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-white/10">
                    <FiDatabase className="text-green-400 text-2xl mb-3" />
                    <h4 className="text-lg font-bold text-white">Data Analysis</h4>
                  </div>
                  <p className="text-gray-300 mt-2">Longitudinal studies and pattern recognition</p>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-xl p-6 border border-white/10">
                    <FiActivity className="text-purple-400 text-2xl mb-3" />
                    <h4 className="text-lg font-bold text-white">Clinical Validation</h4>
                  </div>
                  <p className="text-gray-300 mt-2">Real-world testing and outcomes</p>
                </div>
              </div>
            </div>

            {/* Research Articles Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-4">
                  <FiBook className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">Latest Research Articles</h2>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-20">
                  <div className="text-red-400 text-lg mb-4">
                    Error loading research articles: {error.message}
                  </div>
                  <button 
                    onClick={() => window.location.reload()}
                    className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Research Articles Grid */}
              {!loading && !error && researchArticles && (
                <>
                  {researchArticles.length === 0 ? (
                    <div className="text-center py-20">
                      <h3 className="text-xl text-gray-300 mb-4">No research articles available</h3>
                      <p className="text-gray-400">
                        Check back soon for our latest research findings!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {researchArticles.map((article) => (
                        <ResearchCard key={article._id} article={article} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Interested in Our Research?
                </h2>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Explore our scientific methodology and evidence-based approach to longevity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/community" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                    Join Our Community
                  </Link>
                  <Link to="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all">
                    Contact Research Team
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
