import { useState } from "react";
import axios from "axios";
import HomeTitle from "../shared/HomeTitle";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const MissingPostUpdateStatus = () => {
  const [formData, setFormData] = useState({
    foundStatus: true, // Default to true (found)
    caseStatus: "Alive", // Default value
    additionalInfo: "",
    caseType: "",
    otherCaseType: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Fetch post data to pre-fill form on component mount
 
  const { id } = useParams(); // Get the post ID from the URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/missing/missing/status/${id}`,
        formData,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);

      if (response.status === 200) {
        toast.success("Status updated successfully!");
        navigate("/profile");
      } else {
        throw new Error("Failed to update status.");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <HomeTitle text={"Update Missing Post Status"} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Found Status (set to true by default, no dropdown) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Found Status</span>
            </label>
            <span className="input input-bordered">{formData.foundStatus ? "Found" : "Missing"}</span>
          </div>

          {/* Found Alive Status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Found Alive Status</span>
            </label>
            <select
              name="caseStatus"
              value={formData.caseStatus}
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

          {/* Case Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Case Type</span>
            </label>
            <select
              name="caseType"
              value={formData.caseType}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="">Select Case Type</option>
              <option value="Kidnapping">Kidnapping</option>
              <option value="Accident">Accident</option>
              <option value="Runaway">Runaway</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Other Case Type */}
          {formData.caseType === "Other" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Other Case Type</span>
              </label>
              <input
                type="text"
                name="otherCaseType"
                value={formData.otherCaseType}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Enter other case type"
              />
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
        </form>
      </div>
    </div>
  );
};

export default MissingPostUpdateStatus;
