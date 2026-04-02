import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductBySlug, useStoreData } from '../hooks/useStoreData';
import SEO from '../components/SEO';
import { ShoppingCart, Heart, ArrowLeft, Plus, Minus, ChevronDown } from 'lucide-react';
import { urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { useCart } from '../contexts/CartContext';
import { trackCTAClick, trackViewContent, trackAddToCart, trackPurchase } from '../utils/metaPixel';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, loading, error } = useProductBySlug(slug);
  const { data: allProducts } = useStoreData();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = async () => {
    if (!product || isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.discountPrice || product.price,
        originalPrice: product.price,
        quantity: quantity,
        slug: product.slug?.current,
        image: product.productGallery?.[0] ? urlFor(product.productGallery[0]).url() : null,
      };
      
      await addToCart(cartItem);
      
      // Track Add to Cart event
      trackAddToCart({
        content_name: product.name,
        content_category: 'Store Product',
        content_ids: [product.slug?.current],
        value: (product.discountPrice || product.price) * quantity,
        currency: 'INR',
        quantity: quantity
      });
      
      // Reset quantity after successful addition
      setQuantity(1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = () => {
    // TODO: Implement wishlist functionality
    console.log('Adding to wishlist:', product);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Product</h2>
          <p className="text-gray-600 mb-6">{error?.message || 'Failed to load product details'}</p>
          <Link 
            to="/store"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center space-x-2 mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/store"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
        </div>
      </div>
    );
  }

  const images = Array.isArray(product.productGallery) ? product.productGallery.filter(img => img && img.asset) : [];
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  // Get first image URL safely
  const mainImageUrl = images.length > 0 && images[0] ? urlFor(images[0]).url() : null;

  return (
    <>
      <SEO 
        title={product.title}
        description={product.shortDescription}
        keywords={`wellness product, ${product.title}, health supplement, natural product`}
        image={mainImageUrl}
      />
      
      <div className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <nav>
            <Link 
              to="/store"
              className="text-white/90 hover:text-white inline-flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </Link>
          </nav>
        </div>

        {/* Product Details Section */}
        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                {images[selectedImageIndex] && images[selectedImageIndex].asset && (
                  <img
                    src={urlFor(images[selectedImageIndex]).url()}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index 
                          ? 'border-blue-600 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {image && image.asset && (
                        <img
                          src={urlFor(image).url()}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {product.title}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                {hasDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-green-400">
                      ₹{product.discountPrice}
                    </span>
                    <span className="text-xl text-gray-300 line-through">
                      ₹{product.price}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-white">
                    ₹{product.price}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <div className="text-white/90 leading-relaxed prose prose-base prose-invert max-w-none">
                  {product.shortDescription && <PortableText value={product.shortDescription} />}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium text-white">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !product}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Long Description */}
              {product.longDescription && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Product Details</h3>
                  <div className="prose prose-gray max-w-none">
                    {Array.isArray(product.longDescription) ? (
                      product.longDescription.map((block, index) => {
                        if (block._type === 'block') {
                          const Tag = block.style || 'p';
                          const TagClass = block.style === 'h1' ? 'text-2xl font-bold mb-4' : 
                                        block.style === 'h2' ? 'text-xl font-semibold mb-3' :
                                        block.style === 'h3' ? 'text-lg font-semibold mb-2' : 
                                        'text-white/90 leading-relaxed mb-4';
                          
                          return (
                            <Tag key={index} className={TagClass}>
                              {block.children?.map((child, childIndex) => {
                                if (child._type === 'span') {
                                  return <span key={childIndex}>{child.text}</span>;
                                } else if (child._type === 'strong') {
                                  return <strong key={childIndex}>{child.text}</strong>;
                                } else if (child._type === 'em') {
                                  return <em key={childIndex}>{child.text}</em>;
                                } else {
                                  return <span key={childIndex}>{child.text}</span>;
                                }
                              })}
                            </Tag>
                          );
                        } else {
                          return <p key={index} className="text-white/90 leading-relaxed mb-4">{block.children?.map((child, childIndex) => child.text).join('')}</p>;
                        }
                      })
                    ) : (
                      <p className="text-white/90 leading-relaxed mb-4">{product.longDescription}</p>
                    )}
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {product.faq && product.faq.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    {product.faq.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        >
                          <h4 className="font-medium text-white pr-4">{faq.question}</h4>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-300 transition-transform duration-200 flex-shrink-0 ${
                              expandedFaq === index ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedFaq === index && (
                          <div className="px-4 py-3 border-t border-gray-200">
                            <p className="text-white/90 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* You Must Also Like Section */}
            {allProducts && allProducts.length > 1 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6">You Must Also Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProducts
                    .filter(p => p._id !== product?._id) // Exclude current product
                    .slice(0, 3) // Show only 3 related products
                    .map((relatedProduct) => {
                      const firstImage = Array.isArray(relatedProduct.productGallery) ? relatedProduct.productGallery[0] : null;
                      const imageUrl = firstImage && firstImage.asset ? urlFor(firstImage).url() : null;
                      const hasDiscount = relatedProduct.discountPrice && relatedProduct.discountPrice < relatedProduct.price;
                      
                      return (
                        <div key={relatedProduct._id} className="bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300 rounded-2xl p-4 border border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                          <div className="relative mb-4 flex-shrink-0">
                            {imageUrl ? (
                              <img 
                                src={imageUrl} 
                                alt={relatedProduct.title}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                              </div>
                            )}
                            {hasDiscount && (
                              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                                Sale
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{relatedProduct.title}</h4>
                          <div className="text-gray-700 text-sm mb-3 line-clamp-2 flex-grow prose prose-sm prose-invert max-w-none">
                            {relatedProduct.shortDescription && <PortableText value={relatedProduct.shortDescription} />}
                          </div>
                          <div className="flex items-center justify-between mb-3 flex-shrink-0">
                            {hasDiscount ? (
                              <>
                                <span className="text-lg font-bold text-green-600">₹{relatedProduct.discountPrice}</span>
                                <span className="text-sm text-gray-500 line-through">₹{relatedProduct.price}</span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-gray-800">₹{relatedProduct.price}</span>
                            )}
                          </div>
                          <Link 
                            to={`/store/${relatedProduct.slug?.current}`}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block flex-shrink-0"
                          >
                            View Details
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
