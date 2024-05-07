import { useState } from "react";
import { Link } from "react-router-dom";

import { University } from "../models/datatypes";
import "./UniversityItem.css";

const UniversityListItem = ({
  item,
  onDelete,
}: {
  item: University;
  onDelete: () => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 300); // Same duration as the animation
  };

  return (
    <div
      id={`university_${item.id}`}
      className={`flex items-center justify-between p-4 bg-gray-100 rounded shadow-sm cursor-pointer hover:bg-bright-blue-40 transition-all duration-300 ${
        isDeleting ? "swipe-out" : ""
      }`}
    >
      <Link to={`/details/${item.id}`} className="flex flex-col w-full">
        <h2 className="text-lg font-bold hover:text-blue-500 line-clamp-1">
          {item.name}
        </h2>
        <p className="text-sm text-gray-500">{item.country}</p>
      </Link>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default UniversityListItem;
