import { useTranslation } from '../i18n';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function CancellationPolicy() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white text-center mb-8">Refund & Cancellation Policy</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 mb-6">
              At Svasam, we are committed to offering a smooth and meaningful experience by connecting you with trusted guides across diverse modalities and practices. Our intention is to create a sacred digital space where you can grow, heal, and find fulfillment through virtual workshops, curated content, and personalized sessions with experienced practitioners.
            </p>
            <p className="text-gray-700">
              We understand that unexpected situations may occur. This Refund & Cancellation Policy explains the conditions under which a User may cancel a session or request a refund. Please note that certain terms may vary between different Offerings and Platform Services. Payment options may also differ accordingly.
            </p>
            <p className="text-gray-700 mt-4">
              We take violations of our Terms of Use seriously. Svasam is under no obligation to process refunds for any User who breaches these Terms or any other Platform policies, even if the refund request falls within the standard refund window.
            </p>
          </div>

          {/* 1. Cancellation & Rescheduling */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">1. Cancellation & Rescheduling</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">A. Cancellation</h3>
                
                <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">Cancellation by the User</h4>
                <p className="mb-4">
                  For Individual and Live Group Sessions:
                  Users may cancel their booked sessions by notifying Svasam at least 24 hours before the session start time. Eligible cancellations will receive a full refund, processed as per Section 2.
                </p>
                <p className="mb-4">
                  To request a cancellation, Users must email: <a href="mailto:connect@svasam.com" className="text-indigo-600 hover:underline">connect@svasam.com</a> with their booking details.
                </p>
                <p className="mb-6">
                  Failure to provide the 24-hour notice will make the User ineligible for an automatic refund. Any such refunds may be granted only at the sole discretion of Svasam.
                </p>
                <p className="mb-6">
                  If a User does not attend a scheduled Individual or Live Session without prior cancellation or rescheduling, it will be considered a "No-Show", and no refund will be issued.
                </p>

                <h4 className="text-lg font-medium text-gray-900 mt-6 mb-2">Cancellation by Svasam</h4>
                <p className="mb-6">
                  If a session is cancelled by Svasam due to unforeseen circumstances, the User will receive a full refund to the original payment method. Affected Users will be notified at the earliest possible time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">B. Rescheduling Policy</h3>
                <p className="mb-4">
                  Users may request to reschedule an Individual Session only once, provided the request is submitted at least 24 hours before the scheduled time.
                </p>
                <p className="mb-4">
                  All rescheduling requests depend on the availability of the Guide/Leader. Svasam does not guarantee that a reschedule will always be accommodated.
                </p>
                <p className="mb-6">
                  If rescheduling is not possible, Users may request a refund within 48 hours of being informed that the reschedule attempt failed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">C. Technical Issues</h3>
                <p className="mb-4">
                  If a session is affected by technical issues, Users must report the problem immediately through:
                </p>
                <p className="mb-6">
                  Email: <a href="mailto:connect@svasam.com" className="text-indigo-600 hover:underline">connect@svasam.com</a>
                </p>
                <p className="mb-6">
                  Svasam will review each case individually and may, at its discretion, offer a refund or a rescheduled session.
                </p>
                <p className="mb-2 italic text-gray-600">
                  Please note: If a session has zero attendees, no recording will be generated or shared.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Refund Process */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">2. Refund Process</h2>
            <p className="text-gray-700">
              All approved refunds will be processed within 5–7 working days and credited to the original mode of payment.
            </p>
            <p className="text-gray-700 mt-2">
              Refunds apply only to payments made directly through the Platform using the integrated payment gateway.
            </p>
          </div>

          {/* 3. Payments to Third Parties */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">3. Payments to Third Parties</h2>
            <p className="text-gray-700 mb-4">
              Users acknowledge that Svasam acts as a facilitator, connecting Users with Guides, and does not control or guarantee the outcomes of any Offerings such as Courses or Sessions.
            </p>
            <p className="text-gray-700 mb-4">
              Payments made to third-party service providers—whether through the Platform or otherwise—are non-refundable. Svasam assumes no responsibility for such transactions.
            </p>
            <p className="text-gray-700">
              Users are advised to review the cancellation and refund policies of any third-party provider before making payments.
            </p>
          </div>

          {/* 4. Company Discretion */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">4. Company Discretion</h2>
            <p className="text-gray-700 mb-4">
              All cancellation, refund, and rescheduling requests are handled at the sole discretion of Svasam. The Company reserves full authority to approve or reject refund requests based on the circumstances.
            </p>
            <p className="text-gray-700">
              In the event of any disputes, the decision of Svasam shall be final and binding.
            </p>
          </div>

          {/* Acknowledgment */}
          <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-8">
            <p className="text-gray-800 mb-4">
              By booking any Offering—including Courses, Individual Sessions, or Live Group Sessions—Users confirm that they have read, understood, and agreed to this Refund & Cancellation Policy, along with Svasam's Terms of Use and Privacy Policy.
            </p>
            <p className="text-gray-700">
              For any further queries, please contact: <a href="mailto:connect@svasam.com" className="text-indigo-600 hover:underline">connect@svasam.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
