import { useTranslation } from '../i18n';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { trackCTAClick, trackLead } from '../utils/metaPixel';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // EmailJS configuration
      const serviceId = 'service_ouvge5f'; // Replace with your EmailJS service ID
      const templateId = 'template_8xflp9m'; // Replace with your EmailJS template ID
      const userId = 'bcnO04d0XUUy8dm7E'; // Replace with your EmailJS public key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: 'svasamveda@gmail.com'
      };

      const result = await emailjs.send(serviceId, templateId, templateParams, userId);
      
      if (result.status === 200) {
        // Track contact form submission with Meta Pixel
        trackLead({
          content_name: 'Contact Form Submission',
          content_category: 'Contact',
          user_data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          }
        });
        
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'general',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen w-full">
      {/* Banner Section */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src="/assets/Contact.webp"
          alt="Contact Us Banner"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/20"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">Contact Us</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl sm:max-w-4xl drop-shadow-lg">Get in Touch</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-800 mb-4 sm:mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded text-sm sm:text-base">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded text-sm sm:text-base">
                  Sorry, there was an error sending your message. Please try again later.
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                >
                  <option value="general">General Inquiry</option>
                  <option value="balance">Balance Weight</option>
                  <option value="gut">Gut Intelligence</option>
                  <option value="research">Research</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-700 text-white py-3 px-4 sm:py-4 sm:px-6 rounded-lg hover:bg-purple-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-base"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-indigo-800 mb-8">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Contact Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Email: connect@svasam.com</p>
                  <p className="text-gray-600">Phone: +91 70195 57979</p>
                  <a 
                    href="https://wa.me/917019557979?text=Hi%20Svasam%20Wellness!%20I%20would%20like%20to%20know%20more%20about%20your%20wellness%20programs."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.048-.673.076-.197.124-.38.345-.449.637-.069.291-.099.617-.099.967 0 .345.03.693.099 1.037.069.344.03.693-.099 1.037-.069.292-.252.513-.449.637-.202.124-.4.174-.673.076-.272-.099-1.733-.818-2.03-.967-.297-.149-.568-.223-.818-.223-.25 0-.521.074-.818.223-.297.149-1.733.818-2.03.967-.272.099-.471.048-.673-.076-.197-.124-.38-.345-.449-.637-.069-.291-.099-.617-.099-.967 0-.345.03-.693.099-1.037.069-.344.03-.693.099-1.037.069-.292.252-.513.449-.637.202-.124.4-.174.673-.076z"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <p className="text-gray-600">Customer Support: Mon-Sat, 10 AM - 7 PM</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Monday - Friday: 10:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <section className="my-16 max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-12">Frequently Asked Questions</h1>
            <div className="space-y-4">
              <details className="bg-white rounded-xl shadow p-4">
                <summary className="font-semibold text-indigo-700 cursor-pointer">How do I schedule a wellness session?</summary>
                <p className="mt-2 text-gray-700">You can schedule a session by contacting our customer support team or using our online booking system. Simply provide your preferred date and time, and we'll help you find the right wellness practitioner for your needs.</p>
              </details>
              <details className="bg-white rounded-xl shadow p-4">
                <summary className="font-semibold text-indigo-700 cursor-pointer">What payment methods do you accept?</summary>
                <p className="mt-2 text-gray-700">We accept various payment methods including credit/debit cards, UPI, net banking, and cash on delivery for our wellness programs and store products.</p>
              </details>
              <details className="bg-white rounded-xl shadow p-4">
                <summary className="font-semibold text-indigo-700 cursor-pointer">Can I cancel my appointment?</summary>
                <p className="mt-2 text-gray-700">Yes, you can cancel your appointment up to 24 hours before the scheduled time. Please contact our customer support team for assistance.</p>
              </details>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
