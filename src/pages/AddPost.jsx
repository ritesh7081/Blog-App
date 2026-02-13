import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-950 py-12 rounded-xl">

      <Container>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Post
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Write and publish your content to share with the world.
          </p>
        </div>

        {/* Form Card */}
        <div className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-2xl shadow-sm
          p-6 sm:p-8
        ">
          <PostForm />
        </div>

      </Container>
    </div>
  );
}

export default AddPost;