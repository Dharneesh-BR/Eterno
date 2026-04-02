import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '917019557979';
  const message = encodeURIComponent('Hi Svasam Wellness! I would like to know more about your wellness programs.');
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp Logo */}
      <img 
        src="/assets/Whatsapp.webp"
        alt="WhatsApp"
        className="w-6 h-6"
      />
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
        Chat with us on WhatsApp
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div className="border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
