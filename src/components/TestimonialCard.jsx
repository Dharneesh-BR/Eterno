import React from 'react';

const TestimonialCard = ({ 
  name, 
  age, 
  rating, 
  text, 
  metricLabel, 
  before, 
  after, 
  unit, 
  image, 
  rotate 
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6">
      {/* Top Section */}
      <div className="flex items-center mb-4">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-20 h-20 rounded-2xl object-cover mr-4"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={image ? '' : 'w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center mr-4'}>
          <span className="text-white text-2xl font-bold">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 normal-case" style={{ textTransform: 'none' }}>
            {name} ({age})
          </h3>
          <div className="flex items-center">
            {[...Array(rating)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                ⭐
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <p className="text-gray-600 mt-4 leading-relaxed">
        {text}
      </p>

      {/* Bottom Metric Box */}
      <div className="bg-gray-100 rounded-xl p-4 mt-6">
        <div className="text-center mb-3">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            {metricLabel}
          </h4>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-b from-red-500 to-pink-300 bg-clip-text text-transparent">
              {before}
            </div>
            <div className="text-sm text-gray-500">{unit}</div>
          </div>
          
          <div className="flex items-center px-4">
            <svg 
              className="w-6 h-6 text-gray-400" 
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
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-b from-green-600 to-green-300 bg-clip-text text-transparent">
              {after}
            </div>
            <div className="text-sm text-gray-500">{unit}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
