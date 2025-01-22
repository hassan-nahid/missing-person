import { useState } from "react";
import axios from "axios";
import HomeTitle from "../shared/HomeTitle";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const FoundPostUpdateStatus = () => {
  const [formData, setFormData] = useState({
    foundStatus: true,
    foundAliveStatus: "Alive", // Default value
    additionalInfo: "",
    handoverDetails: {
      relativeName: "",
      relationship: "",
      contactInfo: "",
      handoverDate: "",
      remarks: "",
    },
  });

  const { id } = useParams(); // Get the post ID from the URL

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update nested object for handoverDetails
    if (name.startsWith("handoverDetails.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        handoverDetails: {
          ...prev.handoverDetails,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/found/found/status/${id}`, formData,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
  
      if (response.status === 200) {
        toast.success("Status updated successfully!"); // Success toast
        navigate("/profile"); 
      } else {
        throw new Error("Failed to update status.");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong. Please try again."); // Error toast
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <HomeTitle text={"Update Found Status"} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Found Alive Status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Found Alive Status</span>
            </label>
            <select
              name="foundAliveStatus"
              value={formData.foundAliveStatus}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
            </select>
          </div>

          {/* Additional Info */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Additional Information</span>
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="textarea textarea-bordered"
              placeholder="Add any additional details here..."
            ></textarea>
          </div>

          {/* Handover Details */}
          {formData.foundAliveStatus === "Alive" && (
            <div className="form-control space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Handover Details
              </h2>

              <div className="space-y-2">
                <div>
                  <label className="label">
                    <span className="label-text">Relative Name</span>
                  </label>
                  <input
                    type="text"
                    name="handoverDetails.relativeName"
                    value={formData.handoverDetails.relativeName}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter relative's name"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Relationship</span>
                  </label>
                  <input
                    type="text"
                    name="handoverDetails.relationship"
                    value={formData.handoverDetails.relationship}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter relationship (e.g., Father, Mother)"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Contact Info</span>
                  </label>
                  <input
                    type="text"
                    name="handoverDetails.contactInfo"
                    value={formData.handoverDetails.contactInfo}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter contact information"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Handover Date</span>
                  </label>
                  <input
                    type="date"
                    name="handoverDetails.handoverDate"
                    value={formData.handoverDetails.handoverDate}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Remarks</span>
                  </label>
                  <textarea
                    name="handoverDetails.remarks"
                    value={formData.handoverDetails.remarks}
                    onChange={handleChange}
                    className="textarea textarea-bordered"
                    placeholder="Add remarks about the handover..."
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="form-control">
            <button
              type="submit"
              className="btn btn-primary w-full blue-bg hover:blue-bg text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          </div>

          {/* Error Message */}
        </form>
      </div>
    </div>
  );
};

export default FoundPostUpdateStatus;
