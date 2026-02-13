import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor =
    post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((response) => {
        if (response) setPost(response);
        else navigate("/");
        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    const status = await appwriteService.deletePost(post.$id);

    if (status) {
      await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  // ---------------- LOADING SCREEN ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ---------------- MAIN POST PAGE ----------------
  return post ? (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-950 pb-24">

      {/* HERO SECTION */}
      <div className="relative w-full h-112.5 overflow-hidden">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-full object-cover"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent"></div>

        {/* Title */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Author Buttons */}
        {isAuthor && (
          <div className="absolute top-6 right-6 flex gap-3">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-600 hover:bg-green-700">
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-600 hover:bg-red-700"
              onClick={deletePost}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* ARTICLE CONTENT */}
      <Container>
        <div className="max-w-4xl mx-auto mt-2 mb-2">

          <article
            className="
              prose prose-lg max-w-none
              prose-headings:font-bold
              prose-h2:text-3xl
              prose-h3:text-2xl
              prose-p:text-gray-300
              prose-a:text-blue-400
              prose-a:underline
              prose-a:underline-offset-4
              prose-img:rounded-xl
              prose-img:shadow-xl
              prose-strong:text-white
              prose-blockquote:border-l-blue-500
              prose-code:text-blue-400
              prose-code:bg-gray-800
              prose-code:px-1
              prose-code:py-0.5
              prose-code:rounded
              dark:prose-invert
            "
          >
            {parse(post.content)}
          </article>

        </div>
      </Container>

    </div>
  ) : null;
}