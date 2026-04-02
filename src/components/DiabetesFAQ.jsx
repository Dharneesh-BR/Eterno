import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQItem = ({ question, children, isOpen, onClick }) => (
  <div className="mb-6 last:mb-0">
    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-purple-300">
      <button
        className="w-full flex justify-between items-center text-left transition-colors group"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-h3 font-semibold text-gray-800 group-hover:text-purple-600">{question}</span>
        {isOpen ? (
          <FiChevronUp className="text-purple-600 text-xl flex-shrink-0 ml-4" />
        ) : (
          <FiChevronDown className="text-gray-500 text-xl group-hover:text-purple-600 flex-shrink-0 ml-4" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <div className="text-body text-gray-600 leading-relaxed whitespace-pre-line">{children}</div>
      </div>
    </div>
  </div>
);

const DiabetesFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What will I learn in this 2-hour live workshop?',
      answer: `In this power-packed session, you will learn Step by Step Holistic Method to Reverse Type 2 Diabetes Naturally, including:

• The real root causes of Type 2 Diabetes
• How insulin resistance actually develops
• A clear step-by-step roadmap to metabolic correction

This is not generic advice — it's science-based clarity.`
    },
    {
      question: 'Will you explain the real cause of Type 2 Diabetes?',
      answer: `Yes. We break the myth that diabetes is just a "sugar problem." You'll understand:

• Why insulin resistance is the true driver
• How inflammation and metabolic dysfunction begin years before diagnosis
• Why most treatments only suppress numbers — not fix the root cause`
    },
    {
      question: 'How do DNA and gut microbiome affect diabetes?',
      answer: `You'll discover how:

• Your DNA influences how your body handles carbs, fat, and inflammation
• Your gut microbiome impacts insulin sensitivity and glucose control
• Personalising your plan using these insights accelerates reversal

"Imagine reversing diabetes with a plan built on your DNA and your gut bacteria — not guesswork."`
    },
    {
      question: 'Will I learn how to lower blood sugar naturally?',
      answer: `Yes. You'll learn practical strategies to:

• Lower blood sugar safely and sustainably
• Improve insulin sensitivity naturally
• Reduce spikes without extreme dieting

The focus is on long-term metabolic repair — not short-term sugar control.`
    },
    {
      question: 'Are diabetes medicines discussed in this workshop?',
      answer: `Yes. We explain:

• How most medicines manage symptoms but don't fix insulin resistance
• The long-term metabolic impact of dependency
• How medical supervision is essential when improving naturally

This session brings awareness — not fear — with science-backed insights.`
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-h2 text-purple-800 mb-4 sm:mb-6">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto px-2 sm:px-4">
            <h3 className="text-h3 text-gray-700 leading-relaxed mb-3 sm:mb-4">
              Find answers to common questions about our diabetes workshop
            </h3>
          </div>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              isOpen={activeIndex === index}
              onClick={() => toggleFAQ(index)}
            >
              {faq.answer}
            </FAQItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiabetesFAQ;





