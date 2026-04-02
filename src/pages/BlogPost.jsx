import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSanityData } from '../hooks/useSanityData';
import { FaArrowLeft, FaCalendar, FaShare, FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../sanityClient';

// Social sharing component
const SocialShare = ({ title, url, description }) => {
  const [showShareMenu, setShowShareMenu] = React.useState(false);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - ${description}`)}&url=${encodeURIComponent(url)}`,
    instagram: null // Instagram doesn't support direct URL sharing
  };

  const handleShare = (platform) => {
    if (platform === 'instagram') {
      // Copy URL to clipboard for Instagram
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied! You can paste this in your Instagram story or bio.');
      });
      return;
    }

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 transition-colors"
        aria-label="Share article"
      >
        <FaShare className="text-sm" />
      </button>
      
      {showShareMenu && (
        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 min-w-48">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors w-full text-left"
            >
              <FaLinkedin className="mr-3 text-blue-600" />
              <span className="text-gray-700">Share on LinkedIn</span>
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors w-full text-left"
            >
              <FaFacebook className="mr-3 text-blue-600" />
              <span className="text-gray-700">Share on Facebook</span>
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors w-full text-left"
            >
              <FaTwitter className="mr-3 text-blue-400" />
              <span className="text-gray-700">Share on Twitter</span>
            </button>
            <button
              onClick={() => handleShare('instagram')}
              className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors w-full text-left"
            >
              <FaInstagram className="mr-3 text-pink-600" />
              <span className="text-gray-700">Copy for Instagram</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Query to fetch all blog posts for "You Might Also Like" section
const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  categories[]->{
    title
  }
}`;

export default function BlogPost() {
  const { slug } = useParams();
  
  // Query to fetch a single blog post by slug
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    thumbnail,
    body,
    categories[]->{
      title
    }
  }`;

  const { data: post, loading, error } = useSanityData(query, { slug });
  const { data: allPosts } = useSanityData(allBlogPostsQuery);

  // Debug logging
  React.useEffect(() => {
    console.log('BlogPost - slug:', slug);
    console.log('BlogPost - loading:', loading);
    console.log('BlogPost - error:', error);
    console.log('BlogPost - post data:', post);
    if (post) {
      console.log('BlogPost - mainImage:', post.mainImage);
      console.log('BlogPost - thumbnail:', post.thumbnail);
      console.log('BlogPost - mainImage URL:', post.mainImage ? urlFor(post.mainImage).url() : 'No mainImage');
      console.log('BlogPost - thumbnail URL:', post.thumbnail ? urlFor(post.thumbnail).url() : 'No thumbnail');
    }
  }, [slug, loading, error, post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg max-w-4xl mx-auto mt-8">
        <p className="font-bold">Error loading blog post</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:text-blue-800 underline">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-white hover:text-gray-200 mb-8 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to blog
        </Link>

        {/* Blog post header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured image */}
          {post.mainImage || post.thumbnail ? (
            <img 
              src={post.mainImage ? urlFor(post.mainImage).url() : urlFor(post.thumbnail).url()} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Image loaded successfully');
              }}
            />
          ) : (
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-600">Blog post image not available</p>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            )}

            {/* Meta information */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendar className="w-4 h-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
              
              <SocialShare 
                title={post.title}
                url={`${window.location.origin}/blog/${post.slug?.current}`}
                description={post.excerpt || post.shortDescription}
              />
            </div>

            {/* Blog content */}
            <div className="prose prose-lg max-w-none">
              {post.body && (
                <PortableText 
                  value={post.body}
                  components={{
                    block: {
                      normal: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                      h1: ({children}) => <h1 className="text-3xl font-bold mb-4 text-gray-900">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl font-bold mb-3 text-gray-900">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl font-bold mb-2 text-gray-900">{children}</h3>,
                    },
                    list: {
                      bullet: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>,
                      number: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-700">{children}</ol>,
                    },
                    listItem: {
                      bullet: ({children}) => <li className="mb-2">{children}</li>,
                      number: ({children}) => <li className="mb-2">{children}</li>,
                    }
                  }}
                />
              )}
            </div>
          </div>
        </article>

        {/* You Might Also Like Section */}
        {allPosts && allPosts.length > 0 && (
          <div className="mt-16 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-2xl p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">You Might Also Like</h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                Explore more articles and insights to nurture your wellness journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts
                .filter(p => p._id !== post?._id)
                .slice(0, 6)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    to={`/blog/${relatedPost.slug.current}`}
                    className="group block h-full"
                  >
                    <div className="bg-gradient-to-t from-[#E9D5FF]/70 via-[#F7EEF5] to-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full h-full min-h-[360px] flex flex-col border border-purple-100 overflow-hidden">
                      <div className="relative h-56 sm:h-64">
                        {relatedPost.mainImage ? (
                          <img 
                            src={urlFor(relatedPost.mainImage).url()} 
                            alt={relatedPost.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                            <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute left-4 bottom-4 text-white">
                          <div className="text-2xl font-extrabold drop-shadow-sm line-clamp-2">
                            {relatedPost.title}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 p-4 flex flex-col">
                        {relatedPost.categories && relatedPost.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {relatedPost.categories.slice(0, 3).map((category, idx) => (
                              <span
                                key={`${category.title}-${idx}`}
                                className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200"
                              >
                                {category.title}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {relatedPost.excerpt || relatedPost.shortDescription || 'Unlock mindful growth with curated guidance and practical steps you can start today.'}
                        </p>
                        
                        <div className="mt-auto pt-4">
                          <span className="inline-flex items-center justify-center w-full rounded-full border-2 border-purple-400 text-purple-700 font-semibold text-sm py-2 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                            Read more
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            
            {/* Show message when no related posts are found */}
            {allPosts.filter(p => p._id !== post?._id).length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/80 text-lg">No related articles found. Check back soon for more content!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
