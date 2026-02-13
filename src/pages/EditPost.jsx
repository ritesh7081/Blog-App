import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((response) => {
        if (response) {
          setPost(response);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return post ? (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-950 py-12">
      <Container>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Post
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Update your content and make changes before publishing.
          </p>
        </div>

        {/* Form Card */}
        <div className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-2xl shadow-sm
          p-6 sm:p-8
        ">
          <PostForm post={post} />
        </div>

      </Container>
    </div>
  ) : null;
}

export default EditPost;