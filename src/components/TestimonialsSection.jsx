import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../data/testimonials';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative w-full py-4 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-h2 text-white mb-2">What Our Clients Say</h2>
          <p className="text-body text-white/80 max-w-2xl mx-auto mb-2">
            Real stories from real people who transformed their health with Eterno
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative h-[300px] sm:h-[350px] w-full">
          <div className="relative h-full w-full flex items-center justify-center">
            {/* Current Testimonial Card */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300">
                <TestimonialCard
                  name={testimonials[currentIndex].name}
                  age={testimonials[currentIndex].age}
                  rating={testimonials[currentIndex].rating}
                  text={testimonials[currentIndex].text}
                  metricLabel={testimonials[currentIndex].metricLabel}
                  before={testimonials[currentIndex].before}
                  after={testimonials[currentIndex].after}
                  unit={testimonials[currentIndex].unit}
                  image={testimonials[currentIndex].image}
                  rotate={testimonials[currentIndex].rotate}
                />
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300 z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;