import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white text-center mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 mb-6">
              At Svasamveda Life Sciences (OPC) Private Limited ("Svasam", "we", "our", "us"), we are committed to protecting your privacy and ensuring a safe, transparent, and trustworthy digital experience. This Privacy Policy explains how we collect, use, store, share, and safeguard your information when you access our website, mobile application, or any services offered through our Platform (collectively, the "Platform").
            </p>
            <p className="text-gray-700">
              By using our Platform, you acknowledge that you have read and agreed to the practices described in this Privacy Policy, along with our Terms of Use.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">1. Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect information in order to provide our services, improve user experience, and maintain Platform functionality. The types of information we may collect include:
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">A. Information Provided by You</h3>
                <p className="text-gray-700 mb-4">
                  This includes details you voluntarily submit when interacting with the Platform, such as:
                </p>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Name, email address, phone number</li>
                  <li>Account login information</li>
                  <li>Profile information including demographics</li>
                  <li>Messages, feedback, or queries shared through the Platform</li>
                  <li>Documents required for identity verification (for Leaders/Guides, where applicable)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">B. Information Automatically Collected</h3>
                <p className="text-gray-700 mb-4">
                  When you use the Platform, certain data is collected automatically, including:
                </p>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Device details (type, OS, browser)</li>
                  <li>IP address and approximate location</li>
                  <li>Browsing behavior, interaction patterns, and usage analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">C. Information from Third Parties</h3>
                <p className="text-gray-700">
                  If you choose to sign in via Google, Apple, or other linked platforms, we may receive limited profile information as permitted by your settings.
                </p>
              </div>
            </div>
          </div>

          {/* 2. How We Use Your Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-6">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>To create and manage user accounts</li>
              <li>To deliver, personalise, and improve Platform services</li>
              <li>To communicate updates, reminders, and relevant notifications</li>
              <li>To resolve queries and provide customer support</li>
              <li>To monitor system performance and ensure security</li>
              <li>To comply with legal or regulatory requirements</li>
              <li>To enhance User and Leader matching and session experience</li>
            </ul>
            <p className="text-gray-700">
              We do not sell your personal information to third parties.
            </p>
          </div>

          {/* 3. Sharing of Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">3. Sharing of Information</h2>
            <p className="text-gray-700 mb-6">
              We may share your information in the following circumstances:
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">A. With Service Providers</h3>
                <p className="text-gray-700">
                  Trusted third-party vendors that support operations such as payment processing, analytics, hosting, or customer support.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">B. With Leaders/Guides</h3>
                <p className="text-gray-700">
                  Only when required to deliver the sessions or services requested by you.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">C. For Legal Obligations</h3>
                <p className="text-gray-700">
                  If required by law, regulation, or legal process, we may disclose your information to the appropriate authorities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">D. Corporate Transactions</h3>
                <p className="text-gray-700">
                  In case of a merger, acquisition, restructuring, or transfer of assets, your information may be shared with the successor entity.
                </p>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              All partners and vendors are required to follow appropriate privacy and security safeguards.
            </p>
          </div>

          {/* 4. Cookies & Tracking */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">4. Cookies & Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and related tools to:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Enhance Platform performance</li>
              <li>Remember your preferences</li>
              <li>Improve overall user experience</li>
              <li>Analyse usage patterns</li>
            </ul>
            <p className="text-gray-700">
              You may disable cookies in your browser settings, but certain features may not work correctly.
            </p>
          </div>

          {/* 5. Your Rights & Choices */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">5. Your Rights & Choices</h2>
            <p className="text-gray-700 mb-6">
              Depending on applicable laws, you may have the right to:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Access the information we hold about you</li>
              <li>Update or correct your personal details</li>
              <li>Request that your personal data be deleted</li>
              <li>Withdraw consent for non-essential communications</li>
              <li>Request clarification about our data practices</li>
            </ul>
            <p className="text-gray-700">
              For data access, corrections, or deletion requests, please write to us.
            </p>
          </div>

          {/* 6. Data Retention */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">6. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your information for as long as necessary to:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Provide our services</li>
              <li>Meet legal and regulatory requirements</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements and policies</li>
            </ul>
            <p className="text-gray-700">
              Once retention is no longer required, we securely delete or anonymize your data.
            </p>
          </div>

          {/* 7. Data Security */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">7. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We use industry-standard measures to safeguard your personal information. While we take all reasonable precautions, no digital system can guarantee absolute security.
            </p>
            <p className="text-gray-700">
              We encourage Users to maintain the confidentiality of their login credentials.
            </p>
          </div>

          {/* 8. Children's Privacy */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">8. Children's Privacy</h2>
            <p className="text-gray-700">
              Our Platform is not intended for individuals below the legally defined age of a "Minor."
              If you provide information of a Minor, you confirm that you are the lawful parent/guardian and authorized to do so.
            </p>
          </div>

          {/* 9. Updates to This Policy */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">9. Updates to This Policy</h2>
            <p className="text-gray-700">
              We may revise this Privacy Policy periodically to reflect updates to our practices or legal requirements.
              Any significant changes will be posted on the Platform. Continued use of the Platform constitutes acceptance of the revised Policy.
            </p>
          </div>

          {/* 10. Contact & Grievance Officer */}
          <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">10. Contact & Grievance Officer</h2>
            <p className="text-gray-700 mb-4">
              For privacy-related questions, concerns, or requests, please contact:
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Company:</span> Svasamveda Life Sciences (OPC) Private Limited
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> <a href="mailto:connect@svasam.com" className="text-indigo-600 hover:underline">connect@svasam.com</a>
            </p>
            <p className="text-gray-700 mt-4">
              We aim to acknowledge concerns within 24 hours and resolve them within 15 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
