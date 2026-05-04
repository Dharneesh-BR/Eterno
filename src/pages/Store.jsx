import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreData } from '../hooks/useStoreData';
import SEO from '../components/SEO';
import { ShoppingCart, Heart } from 'lucide-react';
import { urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { trackCTAClick, trackViewContent, trackAddToCart } from '../utils/metaPixel';

const ProductCard = ({ product }) => {
  // Use banner image from Sanity or fallback
  const backgroundImage = product.bannerImage?.asset?.url || '/assets/Longevity Store.png';
  
  // State for zoom functionality
  const [isZoomed, setIsZoomed] = useState(false);
  
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <>
      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden">
        {/* Mobile: Image Card */}
        <div className="relative rounded-3xl overflow-hidden h-[300px] mb-6 shadow-xl hover:shadow-2xl transition-all duration-500">
          <img
            src={backgroundImage}
            alt={product.title || 'Product Background'}
            className="w-full h-full object-cover object-right scale-125"
            style={{ objectPosition: '85% center' }}
            loading="lazy"
          />
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Optional Product Image on top of background */}
          {product.productImage?.asset?.url && (
            <img
              src={product.productImage.asset.url}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-contain p-8 object-right scale-125"
              style={{ objectPosition: '85% center' }}
              loading="lazy"
            />
          )}
        </div>
        
        {/* Mobile: Content Below Card */}
        <div className="text-white px-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">
              {product.title}
            </h3>
            
            {product.subtitle && (
              <p className="text-base font-bold">
                {product.subtitle}
              </p>
            )}
            
            <div className="text-sm text-white/90 leading-relaxed prose prose-sm prose-invert max-w-none">
              {product.shortDescription && <PortableText value={product.shortDescription} />}
            </div>
            
            <div className="w-full">
              <Link 
                to={`/store/${product.slug?.current}`}
                className="inline-flex items-center bg-white text-black px-8 py-3 rounded-full font-semibold uppercase hover:bg-gray-100 transition-colors duration-300"
                onClick={() => {
                  trackCTAClick('Explore Product', 'Store Product Card');
                  trackViewContent({
                    content_name: product.name,
                    content_category: 'Store Product',
                    content_ids: [product.slug?.current],
                    value: product.discountPrice || product.price,
                    currency: 'INR'
                  });
                }}
              >
                {product.buttonText || 'Explore Product'}
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block group relative rounded-3xl overflow-hidden min-h-[420px] transition-all duration-500 shadow-xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt={product.title || 'Product Background'}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
            loading="lazy"
          />
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/50 to-transparent" />
        </div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between text-white px-8 lg:px-16 pb-10 py-20">
          {/* Title and Subtitle Section */}
          <div className={`w-full md:max-w-[55%] flex flex-col gap-6 items-start text-left ${product.productImage?.asset?.url ? 'pr-24' : ''}`}>
            <h3 className="text-3xl font-bold drop-shadow-xl">
              {product.title}
            </h3>
            
            {product.subtitle && (
              <p className="text-base font-bold">
                {product.subtitle}
              </p>
            )}
          </div>
          
          {/* Optional Product Image */}
          {product.productImage?.asset?.url && (
            <img
              src={product.productImage.asset.url}
              alt={product.title}
              className="absolute right-6 bottom-6 w-56 drop-shadow-2xl"
              loading="lazy"
            />
          )}
          
          {/* Description Section */}
          <div className={`w-full md:max-w-[55%] flex flex-col gap-6 items-start text-left ${
            product.productImage?.asset?.url ? 'pr-24' : ''
          }`}>
            <div className="text-base text-white/90 leading-relaxed prose prose-base prose-invert max-w-none">
              {product.shortDescription && <PortableText value={product.shortDescription} />}
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="w-full md:w-fit">
            <Link 
              to={`/store/${product.slug?.current}`}
              className="inline-flex items-center bg-white text-black px-8 py-3 rounded-full font-semibold uppercase hover:bg-gray-100 transition-colors duration-300"
              onClick={() => {
                trackCTAClick('Explore Product', 'Store Product Card Desktop');
                trackViewContent({
                  content_name: product.name,
                  content_category: 'Store Product',
                  content_ids: [product.slug?.current],
                  value: product.discountPrice || product.price,
                  currency: 'INR'
                });
              }}
            >
              {product.buttonText || 'Explore Product'}
              <svg 
                className="w-4 h-4 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const Store = () => {
  const { data: products, loading, error } = useStoreData();

  return (
    <>
      <SEO 
        title="Store - Eterno"
        description="Explore our curated collection of wellness products at Eterno. From supplements to self-care items, discover products that support your journey to optimal health and wellbeing."
        keywords="wellness products, health supplements, self-care, natural products, holistic health, wellness store, Eterno products"
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hidden sm:block relative w-full py-40 bg-cover bg-right bg-no-repeat" style={{backgroundImage: "url('/assets/Longevity Store.png')"}}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black/50"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center sm:text-left mb-12">
              <h1 className="text-h1 text-white mb-4 leading-tight break-words px-4">
                Longevity Starts Today <br/>
                <span className="text-white text-h2 bg-clip-text bg-transparent">
                Shop now
              </span> 
              </h1>
                            
               
              </div>
            </div>
          
        </section>
        
        {/* Mobile Content Section - Above Banner */}
        <section className="sm:hidden relative w-full py-12 bg-gradient-to-br from-black/50 via-black/30 to-black/50">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-h1 text-purple-300 mb-6 leading-tight break-words">
              <span className="text-white bg-clip-text bg-transparent">
                Longevity<br/>
              </span>
              <span className="text-white bg-clip-text bg-transparent">
                Starts Today <br/>
              </span>
              <span className="text-white text-h2 bg-clip-text bg-transparent">
                Shop now
              </span>
            </h1>
            
            
          </div>
        </section>

        {/* Mobile Banner Section - Below Content */}
        <section className="sm:hidden relative w-full py-40 bg-cover bg-right bg-no-repeat" style={{backgroundImage: "url('/assets/Longevity Kit.png')"}}>
        </section>

        {/* Products Section */}
        <section id="products-section" className="w-full py-20 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="text-red-600 text-lg mb-4">
                Error loading products: {error.message}
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && products && (
            <>
              {products.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-xl text-gray-600 mb-4">No products available</h3>
                  <p className="text-gray-500">
                    Check back soon for new wellness products!
                  </p>
                </div>
              ) : (
                <div className="space-y-12">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Store;
