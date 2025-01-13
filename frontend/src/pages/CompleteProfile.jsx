import { useState } from "react";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    phone: "",
    address: {
      division: "",
      district: "",
      upazila: "",
      street: "",
    },
    identificationType: "",
    identificationNumber: "",
    documentPhoto: null,
    userPhoto: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 blue-text">Complete Your Profile</h2>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="input input-bordered w-full"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Address Fields */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Address Details</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Division</label>
          <input
            type="text"
            name="address.division"
            className="input input-bordered w-full"
            value={formData.address.division}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">District</label>
          <input
            type="text"
            name="address.district"
            className="input input-bordered w-full"
            value={formData.address.district}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upazila</label>
          <input
            type="text"
            name="address.upazila"
            className="input input-bordered w-full"
            value={formData.address.upazila}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Street/Address</label>
          <input
            type="text"
            name="address.street"
            className="input input-bordered w-full"
            value={formData.address.street}
            onChange={handleInputChange}
          />
        </div>

        {/* Identification Details */}
        <h3 className="text-lg font-semibold mt-6 mb-2">
          Identification Details
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Identification Type
          </label>
          <select
            name="identificationType"
            className="select select-bordered w-full"
            value={formData.identificationType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="nid">National ID</option>
            <option value="passport">Passport</option>
            <option value="birth_certificate">Birth Certificate</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Identification Number
          </label>
          <input
            type="text"
            name="identificationNumber"
            className="input input-bordered w-full"
            value={formData.identificationNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload Document Photo
          </label>
          <input
            type="file"
            name="documentPhoto"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* User Photo */}
        <h3 className="text-lg font-semibold mt-6 mb-2">User Photo</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload Your Photo
          </label>
          <input
            type="file"
            name="userPhoto"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn blue-bg hover:blue-bg text-white w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
