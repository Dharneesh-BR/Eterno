import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen w-full bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white text-center mb-8">Shipping Policy</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 mb-6">
              At Eterno, we are committed to ensuring that your order reaches you safely, quickly, and in excellent condition. Every package is handled with care, and we work with trusted delivery partners to provide a smooth and reliable shipping experience.
            </p>
          </div>

          {/* Dispatch & Delivery Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Dispatch & Delivery Timeline</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>All prepaid orders are dispatched on the next working day.</li>
              <li>Standard delivery timeframes:
                <ul className="list-disc ml-6 mt-2">
                  <li>Non-customized products: typically delivered within 5–6 working days from dispatch</li>
                  <li>Customized products: usually delivered within 5–9 working days from dispatch</li>
                </ul>
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              We process and ship orders from Monday to Saturday, excluding public holidays.
            </p>
            <p className="text-gray-700">
              To ensure safe and timely delivery, we ship through reputed courier partners such as Delhivery, Blue Dart, FedEx, and other reliable logistics providers.
              If courier service is unavailable in your location, we may send your order through India Post, depending on feasibility.
            </p>
          </div>

          {/* Domestic Shipping */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Domestic Shipping</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>We ship to all major cities and towns across India.</li>
              <li>Shipping charges vary based on location and product weight.</li>
              <li>Free shipping on orders above ₹1999.</li>
            </ul>
          </div>

          {/* International Shipping */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">International Shipping</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>Currently available for select countries.</li>
              <li>Additional customs and import duties may apply.</li>
              <li>Shipping charges calculated at checkout.</li>
            </ul>
          </div>

          {/* Shipping Times */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Shipping Times</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Processing Time</h3>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li>Orders are processed within 2-3 business days.</li>
                  <li>Custom orders may take longer (5-7 business days).</li>
                  <li>Processing time may vary during peak seasons.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Delivery Time</h3>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li>Standard Delivery: 5-7 business days</li>
                  <li>Express Delivery: 2-3 business days (additional charges apply)</li>
                  <li>Delivery times may vary based on location.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping Charges */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Shipping Charges</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>Shipping within India: Free for all prepaid orders.</li>
              <li>For multiple or heavy items, shipping charges may vary based on weight, size, and destination.</li>
              <li>GST is included in our product prices, and Eterno is fully GST-compliant.</li>
              <li>For international shipping, kindly email us at <a href="mailto:connect@eterno.fit" className="text-indigo-600 hover:underline">connect@eterno.fit</a> for assistance.</li>
            </ul>
          </div>

          {/* Express Delivery */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Express Delivery</h2>
            <p className="text-gray-700 mb-4">
              We offer expedited delivery for prepaid orders in major cities.
              In most cases, express shipments reach customers within 4–5 working days, depending on the serviceability of the delivery location.
            </p>
            <p className="text-gray-700">
              For remote areas, customers may be required to collect the parcel from the nearest courier pickup point.
            </p>
          </div>

          {/* Damaged or Tampered Packages */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Damaged or Tampered Packages</h2>
            <p className="text-gray-700 mb-4">
              If your package arrives in poor condition or appears tampered with, please do not accept the delivery.
              Instead:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>Refuse the package</li>
              <li>Email us immediately at <a href="mailto:connect@eterno.fit" className="text-indigo-600 hover:underline">connect@eterno.fit</a> with your Order ID and photos</li>
            </ul>
            <p className="text-gray-700">
              We will arrange a reverse pickup and send you a replacement at no extra cost, provided the original packaging and tags remain intact.
            </p>
          </div>

          {/* Order Cancellation */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Order Cancellation</h2>
            <p className="text-gray-700 mb-4">
              If you need to cancel an order, please email us at <a href="mailto:connect@eterno.fit" className="text-indigo-600 hover:underline">connect@eterno.fit</a> within 30 minutes of placing it.
            </p>
            <p className="text-gray-700 mb-4">
              Orders that have already been packed or dispatched cannot be cancelled.
              In most situations, once an order is placed, cancellation may not be possible — but you can always reach out, and we will assist you with the best available option.
            </p>
          </div>

          {/* Replacements & Refunds */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Replacements & Refunds</h2>
            <p className="text-gray-700 mb-4">
              At Svasam, we issue refunds only when a replacement cannot be provided.
            </p>
            <p className="text-gray-700 mb-4">
              Once the returned item reaches us, it undergoes a quality check.
              If approved:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>Refunds are processed to the original payment method, or any alternative mutually agreed method.</li>
              <li>Refund timelines depend on your bank or card issuer's policies.</li>
            </ul>
          </div>

          {/* Non-Returnable & Final Sale Policy */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Non-Returnable & Final Sale Policy</h2>
            <p className="text-gray-700 mb-4">
              All sales on Svasam are final, and most items are non-returnable.
              We do not provide refunds or replacements for:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>Products without defects</li>
              <li>Requests based on minor aesthetic differences (colour shades, textures, sound variation, etc.)</li>
              <li>Normal wear or small transit marks that do not affect functionality</li>
            </ul>
            <p className="text-gray-700 mb-4">
              We only replace items that have:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>Manufacturing defects, or</li>
              <li>Damage verified through photos or videos</li>
            </ul>
            <p className="text-gray-700 mb-4">
              To qualify for replacement:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>The product must be unused, in original condition, with all packaging and accessories intact</li>
              <li>You must share clear images/videos of the defect and shipping label</li>
            </ul>
            <p className="text-gray-700">
              If, after inspection, no defect is found, both forward and return shipping charges will be borne by the customer.
            </p>
          </div>

          {/* Need Assistance? */}
          <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Need Assistance?</h2>
            <p className="text-gray-700 mb-6">
              For any delivery-related queries, support, or clarification, please contact us: <a href="mailto:connect@svasam.com" className="text-indigo-600 hover:underline">connect@svasam.com</a>
            </p>
            <p className="text-gray-700">
              We're here to help ensure your shopping experience with Svasam is smooth, safe, and satisfying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
