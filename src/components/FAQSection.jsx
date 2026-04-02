import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQItem = ({ question, children, isOpen, onClick }) => (
  <div className="mb-6 last:mb-0">
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/40 hover:bg-white">
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
        <div className="text-body text-gray-600 leading-relaxed">{children}</div>
      </div>
    </div>
  </div>
);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is Eterno?',
      answer: 'Eterno is a doctor-led, AI-powered longevity and metabolic health platform. We reverse lifestyle diseases by improving insulin resistance, energy, weight balance, and slow down biological age using personalized, science-backed plans.'
    },
    {
      question: 'Do I get a one-on-one doctor consultation?',
      answer: 'Yes. Every program includes a dedicated one-on-one consultation with our in-house doctor to understand your medical history, lab reports, lifestyle, and goals before creating your personalized plan.'
    },
    {
      question: 'Do you offer Genetic Testing?',
      answer: 'Yes. We offer advanced Genomic testing to understand how your body responds to food, exercise, inflammation, and metabolism. This helps us personalize your plan more accurately.'
    },
    {
      question: 'What is Metabolic Testing?',
      answer: 'Metabolic testing analyzes markers like blood sugar, insulin resistance, inflammation, lipid profile, and other health indicators. It helps us identify the root cause of weight gain, fatigue, or diabetes risk.'
    },
    {
      question: 'Is this only for people with diabetes or Lifestyle Diseases?',
      answer: 'No. Eterno as a platform is for anyone who wants to:\n• Reverse insulin resistance\n• Prevent diabetes\n• Improve metabolic health\n• Slow biological aging\n• Increase energy and performance'
    },
    {
      question: 'What makes Eterno different?',
      answer: 'We don\'t give generic consultations.\nWe combine:\n• Doctor supervision\n• Lab & genetic insights\n• AI-powered personalization\n• Root-cause metabolic correction\n• Holistic Mind-Body Transformation\nIt\'s precision health — not trial and error.'
    },
    {
      question: 'Do I need to stop my current medication?',
      answer: 'No. We do not advise stopping medication without medical supervision. Our doctors monitor your progress and coordinate safely to reduce or completely stop medications.'
    },
    {
      question: 'Is the program holistic?',
      answer: 'Yes. We address:\n• Nutrition\n• Sleep\n• Stress\n• Gut health\n• Movement\n• Hormonal balance\nLongevity is about the whole system — not just blood sugar numbers.'
    },
    {
      question: 'How long does the program take?',
      answer: 'Most metabolic transformations take 3–6 months. However, improvements in energy and glucose stability are often seen within the first few weeks.'
    },
    {
      question: 'How do I get started?',
      answer: 'Simply sign up on eterno.fit and schedule your doctor consultation. Your personalized longevity journey starts from there.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 border border-purple-400">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-h2 text-white mb-4 sm:mb-6">Frequently Asked Questions</h2>
            <div className="max-w-2xl mx-auto px-2 sm:px-4">
              <h3 className="text-h3 text-white/70 leading-relaxed mb-3 sm:mb-4">
                Find answers to common questions on starting Journey towards Longevity 
              </h3>
            </div>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              >
                <p className="text-body leading-relaxed">{faq.answer}</p>
              </FAQItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
