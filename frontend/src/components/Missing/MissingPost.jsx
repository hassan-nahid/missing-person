import { useState } from "react";

const MissingPost = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    careOf: "",
    address: "",
    lastSeen: "",
    clothes: "",
    skinColor: "",
    height: "",
    appearance: "",
    education: "",
    documents: null,
    photo: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your form submission logic (e.g., API call)
    setFormData({
      name: "",
      age: "",
      careOf: "",
      address: "",
      lastSeen: "",
      clothes: "",
      skinColor: "",
      height: "",
      appearance: "",
      education: "",
      documents: null,
      photo: null,
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Post Missing Person</h1>
          <p className="text-lg text-gray-600 mt-2">
            Fill out the details below to post information about a missing person.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <input
                type="text"
                name="careOf"
                value={formData.careOf}
                onChange={handleChange}
                placeholder="Care of (Father/Mother Name)"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address or Street"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="lastSeen"
                value={formData.lastSeen}
                onChange={handleChange}
                placeholder="Last Seen Location"
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
              <input
                type="text"
                name="appearance"
                value={formData.appearance}
                onChange={handleChange}
                placeholder="Distinct Features (e.g., scars)"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Educational or Professional Record"
                className="input input-bordered w-full"
              />
              <div>
                <label className="block text-sm mb-2">Documents</label>
                <input
                  type="file"
                  name="documents"
                  onChange={handleChange}
                  className="file-input w-full"
                />
              </div>
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
            <div className="flex justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MissingPost;
