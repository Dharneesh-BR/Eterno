import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResearchBySlug, useResearchData } from '../hooks/useResearchData';
import SEO from '../components/SEO';
import { FiArrowLeft, FiCalendar, FiTag, FiExternalLink } from 'react-icons/fi';
import { urlFor } from '../sanityClient';

const ResearchDetail = () => {
  const { slug } = useParams();
  const { data: article, loading, error } = useResearchBySlug(slug);
  const { data: allResearch } = useResearchData();

  const renderBlockContent = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
      if (block._type !== 'block') return null;

      const style = block.style || 'normal';
      const Tag = style === 'normal' ? 'p' : style;

      // Render text with marks
      const renderChildren = (children) => {
        return children.map((child, childIndex) => {
          if (!child.text) return null;

          let text = child.text;
          
          // Apply marks
          if (child.marks) {
            child.marks.forEach(mark => {
              switch (mark) {
                case 'strong':
                  text = <strong key={childIndex}>{text}</strong>;
                  break;
                case 'em':
                  text = <em key={childIndex}>{text}</em>;
                  break;
                case 'code':
                  text = <code key={childIndex} className="bg-gray-800 px-1 py-0.5 rounded text-sm">{text}</code>;
                  break;
                case 'underline':
                  text = <u key={childIndex}>{text}</u>;
                  break;
                case 'strike-through':
                  text = <s key={childIndex}>{text}</s>;
                  break;
                default:
                  // Handle annotations like links
                  if (typeof mark === 'object' && mark._type === 'link') {
                    text = (
                      <a 
                        key={childIndex}
                        href={mark.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        {text}
                      </a>
                    );
                  }
                  break;
              }
            });
          }

          return <React.Fragment key={childIndex}>{text}</React.Fragment>;
        });
      };

      return (
        <Tag key={index} className={`mb-4 ${style === 'blockquote' ? 'border-l-4 border-purple-500 pl-4 italic text-gray-300' : 'text-gray-200'}`}>
          {renderChildren(block.children)}
        </Tag>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Research Article Not Found</h2>
          <p className="text-gray-300 mb-6">The research article you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/research"
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors inline-flex items-center space-x-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Research</span>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = article.mainImage ? urlFor(article.mainImage).url() : null;
  const publishedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <>
      <SEO 
        title={article.title}
        description={article.shortDescription || article.excerpt}
        keywords={`research, ${article.title}, longevity science, health research`}
        image={imageUrl}
        type="article"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
        {/* Hero Section */}
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
            />
          )}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 h-full flex items-center justify-center">
            {/* Breadcrumb */}
            <nav className="absolute top-8 left-4 sm:left-6 lg:left-8">
              <Link 
                to="/research"
                className="text-white/90 hover:text-white inline-flex items-center space-x-2 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Research</span>
              </Link>
            </nav>
            
            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-100">
                  {article.title}
                </span>
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>{publishedDate}</span>
                </div>
                {article.link && (
                  <a 
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:text-purple-300 transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span>External Link</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full"
                  >
                    <FiTag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-invert max-w-none">
              {renderBlockContent(article.body)}
            </div>

            {/* External Link CTA */}
            {article.link && (
              <div className="mt-12 p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Read Full Publication</h3>
                    <p className="text-gray-300">Access the complete research publication through the external link.</p>
                  </div>
                  <a 
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>View Publication</span>
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* You Must Also Like Section */}
            {allResearch && allResearch.length > 1 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6">You Must Also Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allResearch
                    .filter(r => r._id !== article?._id) // Exclude current article
                    .slice(0, 3) // Show only 3 related articles
                    .map((relatedArticle) => {
                      const imageUrl = relatedArticle.mainImage ? urlFor(relatedArticle.mainImage).url() : null;
                      const publishDate = relatedArticle.publishDate ? new Date(relatedArticle.publishDate).getFullYear() : '2024';
                      
                      return (
                        <div key={relatedArticle._id} className="bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300 rounded-2xl p-4 border border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                          <div className="mb-4 flex-shrink-0">
                            {imageUrl ? (
                              <img 
                                src={imageUrl} 
                                alt={relatedArticle.title}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                              </div>
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{relatedArticle.title}</h4>
                          <p className="text-gray-700 text-sm mb-3 line-clamp-2 flex-grow">{relatedArticle.shortDescription || 'Research article with important findings and insights'}</p>
                          <div className="flex items-center justify-between mb-3 flex-shrink-0">
                            <span className="text-xs text-gray-500">Published: {publishDate}</span>
                            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                              {relatedArticle.category || 'Research'}
                            </span>
                          </div>
                          <Link 
                            to={`/research/${relatedArticle.slug?.current}`}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block flex-shrink-0"
                          >
                            Read More
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-12 text-center">
              <Link 
                to="/research"
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Back to Research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchDetail;
