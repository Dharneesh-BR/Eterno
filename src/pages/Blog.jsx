import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { useSanityData } from '../hooks/useSanityData';
import { urlFor } from '../sanityClient';
import { FaCalendar, FaUser, FaArrowRight, FaSearch, FaTag } from 'react-icons/fa';
import { trackCTAClick, trackViewContent } from '../utils/metaPixel';

// Helper function to get image URL with fallback
const getImageUrl = (image, fallback = '/assets/Diabetes banner.jpg') => {
  if (!image || !image.asset) return fallback;
  try {
    return urlFor(image).width(400).height(300).url();
  } catch (error) {
    console.warn('Error generating image URL:', error);
    return fallback;
  }
};

// Blog banner image
const blogBannerImage = '/assets/Blog.webp';
const MindImg = '/assets/Mind.png';
const SoulImg = '/assets/soul.png';
const BodyImg = '/assets/Body.png';

// Chevron icons for carousel controls
const ChevronLeft = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

function Blog() {
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Fetch blog posts from Sanity
  const { loading, error, data: posts } = useSanityData(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      shortDescription,
      publishedAt,
      mainImage,
      thumbnail,
      tags,
      body
    }
  `);

  // Fallback data if Sanity data is not available
  const fallbackPosts = [
    {
      _id: '1',
      title: "Understanding Diabetes: A Comprehensive Guide",
      slug: { current: "understanding-diabetes" },
      shortDescription: "Learn about the different types of diabetes, symptoms, and management strategies for better health.",
      publishedAt: "2024-01-15T00:00:00Z",
      mainImage: { asset: { url: "/assets/Diabetes banner.jpg" } },
      tags: ["Diabetes", "Health", "Education"]
    },
    {
      _id: '2',
      title: "The Role of Nutrition in Diabetes Management",
      slug: { current: "nutrition-diabetes-management" },
      shortDescription: "Discover how proper nutrition can help manage diabetes and improve overall well-being.",
      publishedAt: "2024-01-10T00:00:00Z",
      mainImage: { asset: { url: "/assets/Banner_2.jpg" } },
      tags: ["Nutrition", "Diabetes", "Lifestyle"]
    },
    {
      _id: '3',
      title: "Exercise Tips for Diabetes Patients",
      slug: { current: "exercise-diabetes-tips" },
      shortDescription: "Safe and effective exercise routines specifically designed for individuals with diabetes.",
      publishedAt: "2024-01-05T00:00:00Z",
      mainImage: { asset: { url: "/assets/Community banner.jpg" } },
      tags: ["Exercise", "Fitness", "Diabetes"]
    }
  ];

  const { t } = useTranslation();
  const blogPosts = posts && posts.length > 0 ? posts : fallbackPosts;

  // Extract unique tags for filtering
  const categories = ['all', ...new Set(blogPosts.flatMap(post => 
    post.tags || []
  ))];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' ||
      post.tags?.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative min-h-screen w-full">
      {/* Fixed Blog Banner */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Blog Banner Image */}
        <div className="relative w-full h-full">
          <img
            src={blogBannerImage}
            alt="Blog Banner"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
            onError={(e) => {
              console.error('Blog banner image failed to load:', blogBannerImage);
            }}
          />
          {/* Dark overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/20 to-black/20" />
        </div>

        {/* Blog Banner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
            Journals for Self-Realisation
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mb-8 md:mb-12 drop-shadow-lg animate-fade-in-delay">
            Reflections and insights to guide you gently inward.
          </p>
        </div>
      </section>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Content */}
          <div className="py-8 sm:py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('blog.title', 'Latest Articles')}</h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
                {t('blog.description', 'Insights and reflections on health, wellness, and self-realization')}
              </p>
            </div>
            
            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-12 py-4 rounded-full bg-white/90 backdrop-blur-md text-gray-800 placeholder-gray-500 border border-purple-400/50 focus:outline-none focus:border-purple-500 focus:bg-white/95 transition-all"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
              </div>

              
            </div>

            {/* Blog Posts Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-400">Error loading blog posts. Please try again later.</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300 text-lg">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredPosts.map((post) => (
                  <article 
                    key={post._id} 
                    className="bg-white/95 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white border border-gray-200 shadow-lg"
                  >
                    {/* Post Image */}
                    <div className="relative h-56 sm:h-48 overflow-hidden">
                      <img 
                        src={getImageUrl(post.mainImage)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/Diabetes banner.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span 
                              key={index}
                              className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Post Content */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <FaCalendar className="mr-2" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.shortDescription}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Link 
                          to={`/blog/${post.slug?.current || post._id}`}
                          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                          onClick={() => {
                            trackCTAClick('Read More', 'Blog Post Card');
                            trackViewContent({
                              content_name: post.title,
                              content_category: 'Blog Post',
                              content_ids: [post.slug?.current || post._id]
                            });
                          }}
                        >
                          Read More
                          <FaArrowRight className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More Button (for future pagination) */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors text-sm sm:text-base">
                  Load More Articles
                </button>
              </div>
            )}
          </div>

          
        </div>
      </div>
    </main>
  );
}

export default Blog;