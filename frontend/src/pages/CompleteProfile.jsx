import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config"; // Your Firebase config
import axios from "axios";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
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

  const [user] = useAuthState(auth); // Get user data from Firebase
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set the user's email from Firebase when the user is authenticated
  useState(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
        name: user.displayName // Set the email from Firebase
      }));
    }
  }, [user]);

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

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "missing-person"); // Replace with your upload preset
    formData.append("cloud_name", "dyaofxcyl"); // Replace with your cloud name

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dyaofxcyl/image/upload", formData);
      return response.data.secure_url; // URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload images first
      const documentPhotoURL = formData.documentPhoto
        ? await uploadImageToCloudinary(formData.documentPhoto)
        : "";
      const userPhotoURL = formData.userPhoto
        ? await uploadImageToCloudinary(formData.userPhoto)
        : "";

      // Prepare data to be sent to the backend
      const profileData = {
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        identificationType: formData.identificationType,
        identificationNumber: formData.identificationNumber,
        documentPhoto: documentPhotoURL,
        userPhoto: userPhotoURL,
      };

      // Send the data to your backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/complete-profile`, // Replace with your API URL
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${user?.accessToken}`, // If you are using JWT for authentication
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData), // Sending the profile data as JSON
        }
      );

      // Handle response
      if (!response.ok) {
        throw new Error("Failed to update profile. Please try again.");
      }
      const data = await response.json();
      console.log(data);
      setLoading(false);
      // Optionally, redirect user or show success message
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled // Disable email input field since the email is taken from Firebase
          />
        </div>

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

        {/* Identification Fields */}
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

        {/* Document Photo */}
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
          {loading ? "Submitting..." : "Submit"}
        </button>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
  );
};

export default CompleteProfile;
