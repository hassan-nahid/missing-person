import { Link } from "react-router-dom";
import noPhoto from "../../assets/img/no_photo.png";

const Card = ({ data, status }) => {
  const { name, photo, lastSeen, createdAt, _id, foundAt } = data;
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card bg-gray-50 shadow-md rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={photo || noPhoto}  // If no photo, use a default image
          alt="Post"
          className="w-full h-72 object-cover rounded-t-lg"
        />
        {/* Optional: Add overlay or border effect */}
      </div>
      <div className="p-4">
        <h4 className="text-xl font-semibold text-gray-800 truncate">
          {status}: {name}
        </h4>
        {lastSeen && (
          <p className="text-gray-500 mt-2 truncate">
            <span className="font-semibold">Last seen:</span> {lastSeen}
          </p>
        )}

        {foundAt && (
          <p className="text-gray-500 mt-2 truncate">
            <span className="font-semibold">Found at:</span> {foundAt}
          </p>
        )}
        <p className="text-gray-500 mt-1">
          <span className="font-semibold">Date:</span> {formattedDate}
        </p>
        <Link
          to={status === "Missing" ? `/missing_post_details/${_id}` : `/found_post_details/${_id}`}
          className="btn btn-sm blue-bg hover:blue-bg text-white w-full mt-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
