import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function TermsConditions() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white text-center mb-8">Terms and Conditions</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 mb-6">
              Welcome to Eterno (the "Platform"). The Platform is developed and operated by Eterno Life Sciences Pvt Ltd.
              Throughout these Terms of Use ("Terms"), words "Eterno Life Sciences Pvt Ltd", "we", "us", or "our" refer to the company.
              The words "you" or "User(s)" refer to anyone who accesses or uses Platform, including:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li><span className="font-medium">Leaders</span> – individuals who create or share courses, content, live sessions, or 1:1 sessions</li>
              <li><span className="font-medium">Learners</span> – individuals who access the Platform to learn skills or consume content</li>
              <li>Any user accessing the Platform in any capacity</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Use of this Platform is intended only for users located in India and accessing it from India.
            </p>
            <p className="text-gray-700">
              These Terms of Use, along with our <a href="https://eterno.fit/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a> and any additional policies or rules referenced here or displayed on the Platform, together form the "Platform Terms."
            </p>
          </div>
          {/* 1. Intermediary Role */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">1. Intermediary Role</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">1.1 Intermediary Status</h3>
                <p className="text-gray-700">
                  Eterno acts as an online intermediary that enables Leaders to create, upload, and publish content in various formats (audio, video, written, live, etc.). Learners may access Courses, Live Sessions, and Individual Sessions through the Platform.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">1.2 User Responsibilities</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>You acknowledge that Eterno does not control, monitor, or verify any User-generated Content.</li>
                  <li>By using the Platform, you release Eterno from any liability arising from such content.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">1.3 Platform Services</h3>
                <p className="text-gray-700">
                  "Services" or "Platform Services" include all offerings made available on Eterno, including courses, memberships, community features, and any future services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">1.4 Right to Modify or Discontinue Services</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We may modify or discontinue any Service, Content, or feature at any time without notice.</li>
                  <li>Your access may be restricted or terminated if required information is not provided.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">1.5 Service Outcome Disclaimer</h3>
                <p className="text-gray-700">
                  Eterno is solely an intermediary and is not responsible for outcomes of any coaching, mentoring, consulting, or learning experience delivered by a Leader.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Offerings */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">2. Offerings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">2.1 Account Registration</h3>
                <p className="text-gray-700">
                  Creating an account may be required to access certain features. Registration is free, but some Services may be paid.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">2.2 Age Requirement</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Users must be 18 years or older.</li>
                  <li>If a Minor uses the Platform, it must be with parental consent and supervision, and the Parent is deemed to have accepted these Terms.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">2.3 Course Access</h3>
                <p className="text-gray-700 mb-2">
                  After signing up for a Course, Eterno may share:
                </p>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Course materials and updates</li>
                  <li>Zoom/WhatsApp/other third-party links</li>
                  <li>Reminders and notifications</li>
                  <li>Leader responses to user queries</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">2.4 Third-Party Platforms</h3>
                <p className="text-gray-700">
                  Access to certain content may require apps like Zoom, YouTube, or others. You must agree to the terms of those platforms before using them.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">2.5 Leaders</h3>
                <p className="text-gray-700">
                  Leaders using the Platform may be bound by additional agreements with Eterno.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">2.6 Account Security</h3>
                <p className="text-gray-700">
                  You are responsible for keeping your login details confidential and for all activity on your account.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">2.7 Accuracy of Information</h3>
                <p className="text-gray-700">
                  You agree to provide accurate information and update it when required.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">2.8 Right to Reject or Disable Accounts</h3>
                <p className="text-gray-700">
                  Eterno may refuse, suspend, or terminate accounts if needed for legal, security, or policy reasons.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Payments */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">3. Payments</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">3.1 Course Fees</h3>
                <p className="text-gray-700">
                  Paid Courses or Sessions require payment of applicable fees.
                  Payments are processed by third-party payment gateways, and their terms apply.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">3.2 Refunds</h3>
                <p className="text-gray-700">
                  Refunds are available only as specified in our Refund and Cancellation Policy.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">3.3 Purchase Scope</h3>
                <p className="text-gray-700">
                  Payment grants access only to the specific Course or Session purchased.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">3.4 Validity of Individual Sessions</h3>
                <p className="text-gray-700">
                  Individual Sessions must be scheduled and used within 3 months of purchase, after which they expire automatically with no refund.
                </p>
              </div>
            </div>
          </div>

          {/* 4. User Conduct */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">4. User Conduct</h2>
            <p className="text-gray-700 mb-6">
              Users agree to:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Follow all Platform Terms and applicable laws</li>
              <li>Not use the Platform for unlawful purposes</li>
              <li>Not hack, copy, disrupt, or reverse-engineer any part of the Platform</li>
              <li>Not upload harmful code, viruses, malware, or intrusive scripts</li>
              <li>Not scrape, harvest data, or impersonate others</li>
              <li>Not upload illegal, harmful, obscene, abusive, or infringing content</li>
              <li>Not upload content violating privacy, IP rights, or public order</li>
            </ul>
            <p className="text-gray-700">
              Eterno may remove any User-generated Content that violates these Terms.
            </p>
          </div>

          {/* 5. Intellectual Property */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">5. Intellectual Property</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">5.1 Platform IP</h3>
                <p className="text-gray-700">
                  All rights to the Platform—including design, code, visuals, layout, and content—belong exclusively to Eterno Life Sciences Pvt Ltd.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">5.2 Trademarks</h3>
                <p className="text-gray-700">
                  Logos, trademarks, and brand elements are owned by Eterno or its licensors.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">5.3 License to Users</h3>
                <p className="text-gray-700">
                  Users receive a limited, non-transferable, non-commercial license to use the Platform.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">5.4 Ownership of User Content</h3>
                <p className="text-gray-700">
                  Users own their User-generated Content but grant Eterno a non-exclusive, royalty-free, transferable license to use it for platform operations, marketing, and improvements.
                </p>
                <p className="text-gray-700 mt-2">
                  Eterno will not disclose personal data unless anonymized, aggregated, or as permitted by the Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Reservation of Rights */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">6. Reservation of Rights</h2>
            <p className="text-gray-700 mb-4">
              Eterno reserves the right to:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Update, upgrade, or discontinue the Platform</li>
              <li>Reject or terminate accounts</li>
              <li>Remove violating content</li>
              <li>Modify or refuse Services</li>
              <li>Access accounts for safety, legal, or technical reasons</li>
            </ul>
          </div>

          {/* 7. Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">7. Personal Information</h2>
            <p className="text-gray-700">
              Our handling of your personal data is governed by Eterno <a href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>

          {/* 8. Disclaimers */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">8. Disclaimers</h2>
            <p className="text-gray-700 mb-4">
              The Platform is provided "as is" and "as available."
              Eterno disclaims all warranties regarding:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Accuracy of content</li>
              <li>Security or uptime</li>
              <li>User-generated content</li>
              <li>Errors, interruptions, viruses</li>
              <li>Third-party actions or services</li>
            </ul>
            <p className="text-gray-700">
              You are responsible for using your judgment before engaging with any Leader or content.
            </p>
          </div>

          {/* 9. Indemnity */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">9. Indemnity</h2>
            <p className="text-gray-700 mb-4">
              You agree to indemnify and hold harmless Eterno Life Sciences Pvt Ltd and its associates from any claims arising from your:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Use of the Platform</li>
              <li>Violation of these Terms</li>
              <li>Violation of third-party rights</li>
              <li>Uploading of infringing content</li>
              <li>Misconduct or negligence</li>
            </ul>
          </div>

          {/* 10. Limitation of Liability */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">10. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              Eterno will not be liable for any direct, indirect, incidental, or consequential damages arising from:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>User-generated Content</li>
              <li>Unauthorized access</li>
              <li>Technical failures</li>
              <li>Viruses, malware, or harmful code</li>
              <li>Use of third-party links or services</li>
            </ul>
            <p className="text-gray-700">
              Your use of the Platform is at your own risk.
            </p>
          </div>

          {/* 11. Governing Law */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">11. Governing Law</h2>
            <p className="text-gray-700">
              These Terms are governed by Indian law, with exclusive jurisdiction of courts located in Bangalore.
            </p>
          </div>

          {/* 12. Miscellaneous */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">12. Miscellaneous</h2>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Terms may be modified at any time. Continued use constitutes acceptance.</li>
              <li>Force Majeure applies to events beyond our control.</li>
              <li>If any provision is invalid, the remaining Terms remain enforceable.</li>
            </ul>
          </div>

          {/* 13. Grievance Redressal */}
          <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">13. Grievance Redressal</h2>
            <p className="text-gray-700 mb-4">
              Our team aims to acknowledge queries within 24 hours and resolve them within 15 days.
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Grievance Officer:</span>
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Company:</span> Eterno Life Sciences Pvt Ltd
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> <a href="mailto:connect@eterno.fit" className="text-indigo-600 hover:underline">connect@eterno.fit</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
