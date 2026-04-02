const BannerImg = '/assets/Main page Banner.jpg';

export default function Hero() {
  return (
    <section className="w-full bg-background min-h-screen md:min-h-0 md:py-16 px-0 md:px-4 flex items-center md:block">
      <div className="max-w-7xl mx-auto">
        {/* Hero Banner with Background Image */}
        <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64 md:h-80 lg:h-96 mb-6 sm:mb-8 md:mb-12 shadow-2xl">
          {/* Background Image */}
          <img 
            src={BannerImg}
            alt="Eterno Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-purple-700/70 to-indigo-800/80" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-h1 text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-lg">
              Discover Your Path
            </h1>
            <p className="text-body text-white/95 max-w-3xl mb-4 sm:mb-6 md:mb-8 drop-shadow-md">
              Explore our holistic wellness categories designed to guide you on your journey to inner peace and transformation
            </p>
            <a 
              href="#categories" 
              className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white text-purple-700 rounded-lg shadow-lg hover:bg-gray-100 transition text-button"
            >
              Explore Categories
            </a>
          </div>
        </div>

        {/* Additional Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-center px-4 md:px-0">
          {/* Text Content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-h2 text-main mb-2 sm:mb-3 md:mb-4">
              Discover Inner Peace with Svasam
            </h2>
            <p className="text-body text-text mb-3 sm:mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto md:mx-0">
              Connect with trusted guides to transform & uplift your life on Svasam. Meditation, breathwork, and spiritual guidance Svasam.
            </p>
            <a 
              href="#sessions" 
              className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-3 bg-main text-white rounded-lg shadow-lg hover:bg-accent transition text-button"
            >
              Book A Session
            </a>
          </div>
          
          {/* Image Content */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-80 bg-gradient-to-br from-accent/30 via-main/20 to-accent/30 rounded-2xl shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white text-h3 mb-1 sm:mb-2">Featured Programs</h3>
                <p className="text-white/80 text-small text-center">Discover our transformative spiritual journeys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
