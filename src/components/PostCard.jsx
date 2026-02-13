import React, { useCallback, useState, useRef } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-700
        rounded-2xl overflow-hidden
        shadow-sm hover:shadow-lg
        transition-all duration-300
        hover:-translate-y-1
      ">

        {/* Image */}
        <div className="overflow-hidden aspect-video">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="
            text-lg font-semibold
            text-gray-900 dark:text-white
            group-hover:text-blue-600
            transition-colors duration-300
          ">
            {title}
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Click to read more →
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;