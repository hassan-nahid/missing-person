import { useState } from "react";
import { useUser } from "../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FoundPost = () => {
  const { userData } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    foundAt: "",
    clothes: "",
    skinColor: "",
    height: "",
    photo: null,
    description: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const cloudinaryData = new FormData();
    cloudinaryData.append("file", file);
    cloudinaryData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    cloudinaryData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        cloudinaryData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoURL = "";

      // Upload photo to Cloudinary if provided
      if (formData.photo) {
        photoURL = await uploadImageToCloudinary(formData.photo);
      }

      // Prepare data for the API request
      const postData = {
        ...formData,
        photo: photoURL,
        email: userData.email, // Include user's email
      };

      // Send data to the backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/found`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Post submitted successfully!");
        navigate("/found");
        setFormData({
          name: "",
          age: "",
          gender: "",
          foundAt: "",
          clothes: "",
          skinColor: "",
          height: "",
          photo: null,
          description: "",
        });
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold green-text">Post Found Person</h1>
          <p className="text-lg text-gray-600 mt-2">
            Fill out the details below to post information about a found person.
          </p>
        </div>

        <div className="bg-gray-50 shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="input input-bordered w-full"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="foundAt"
                value={formData.foundAt}
                onChange={handleChange}
                placeholder="Found Location"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="clothes"
                value={formData.clothes}
                onChange={handleChange}
                placeholder="Clothes Worn"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="skinColor"
                value={formData.skinColor}
                onChange={handleChange}
                placeholder="Skin Color"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height"
                className="input input-bordered w-full"
              />
              <div>
                <label className="block text-sm mb-2">Photo</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="file-input w-full"
                />
              </div>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional Description"
              className="textarea textarea-bordered w-full mt-4"
              rows="4"
            ></textarea>

            <button
              type="submit"
              className="btn blue-bg hover:blue-bg text-white w-full mt-4"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoundPost;
