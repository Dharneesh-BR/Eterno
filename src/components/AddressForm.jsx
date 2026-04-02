import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AddressForm = ({ onSave, initialData = {} }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setForm({
        fullName: initialData.fullName || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        pincode: initialData.pincode || "",
        landmark: initialData.landmark || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Please log in to save your address");
      }

      const addressData = {
        ...form,
        updatedAt: serverTimestamp()
      };

      // Save to Firestore
      await setDoc(
        doc(db, "users", user.uid, "addresses", "default"),
        addressData,
        { merge: true } // This will update existing or create new
      );

      // Notify parent component
      if (onSave) {
        onSave(addressData);
      }

    } catch (error) {
      console.error("Error saving address:", error);
      setError(error.message || "Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Shipping Address</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={saveAddress} className="space-y-4">
        <div>
          <input
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={form.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
          <p className="text-xs text-gray-500 mt-1">10-digit mobile number</p>
        </div>

        <div>
          <textarea
            name="address"
            placeholder="House / Street / Area"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="2"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              name="city"
              placeholder="City"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              name="state"
              placeholder="State"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={form.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              name="pincode"
              type="text"
              placeholder="Pincode"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={form.pincode}
              onChange={handleChange}
              pattern="[0-9]{6}"
              required
            />
            <p className="text-xs text-gray-500 mt-1">6-digit pincode</p>
          </div>
          <div>
            <input
              name="landmark"
              placeholder="Landmark (optional)"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={form.landmark}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">e.g., Near Central Park</p>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-xl font-medium text-white ${
            loading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
          } transition-colors`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            'Save Address'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
