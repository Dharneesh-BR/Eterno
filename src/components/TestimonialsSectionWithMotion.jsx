import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../data/testimonials';

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotate: 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section 
      className="py-24 bg-gradient-to-br from-gray-50 to-gray-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.div 
          className="text-center mb-16"
          variants={cardVariants}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            People just like you, taking back control
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-4 text-lg">
            People across India are lowering their sugar levels, losing weight, and feeling better with expert-led care
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              custom={index}
            >
              <TestimonialCard
                name={testimonial.name}
                age={testimonial.age}
                rating={testimonial.rating}
                text={testimonial.text}
                metricLabel={testimonial.metricLabel}
                before={testimonial.before}
                after={testimonial.after}
                unit={testimonial.unit}
                image={testimonial.image}
                rotate={testimonial.rotate}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
