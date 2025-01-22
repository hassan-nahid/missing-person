import { Link } from "react-router-dom";
import noPhoto from "../../assets/img/no_photo.png";

const ProfileCard = ({ data, status, handleDelete }) => {
    const { name, photo, lastSeen, createdAt, _id, foundAt,foundStatus } = data;

    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="card bg-gray-50 shadow-md rounded-lg overflow-hidden">
            <div className="relative">
                <img
                    src={photo || noPhoto}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-t-lg"
                />
            </div>
            <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800">
                    {status}: {name}
                </h4>
                {lastSeen && (
                    <p className="text-gray-500 mt-2">
                        <span className="font-semibold">Last seen:</span> {lastSeen}
                    </p>
                )}
                {foundAt && (
                    <p className="text-gray-500 mt-2">
                        <span className="font-semibold">Found at:</span> {foundAt}
                    </p>
                )}
                <p className="text-gray-500 mt-1">
                    <span className="font-semibold">Date:</span> {formattedDate}
                </p>
                <div className="flex gap-1 flex-wrap">
                    <Link
                        to={
                            status === "Missing"
                                ? `/missing_post_details/${_id}`
                                : `/found_post_details/${_id}`
                        }
                        className="btn btn-sm blue-bg hover:blue-bg text-white mt-4 py-2 rounded "
                        
                        
                    >
                        View Details
                    </Link>

                    <Link disabled={foundStatus} to={status === "Missing" ? `/missing_post_update_status/${_id}` : `/found_post_update_status/${_id}`} className="btn btn-sm bg-yellow-500 hover:bg-yellow-500 text-white mt-4 py-2 rounded">
                        Update Status
                    </Link>


                    <button
                        onClick={() => handleDelete(_id, status)}
                        className="btn btn-sm bg-red-400 hover:bg-red-400 text-white mt-4 py-2 rounded"
                        disabled={foundStatus}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
