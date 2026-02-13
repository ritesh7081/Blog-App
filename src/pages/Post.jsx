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

  const isAuthor = post && userData
    ? post.userId === userData.$id
    : false;

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

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return post ? (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-950 pb-16">

      {/* HERO IMAGE */}
      <div className="relative w-full h-100 overflow-hidden">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl">
            {post.title}
          </h1>
        </div>

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

      {/* CONTENT */}
      <Container>
        <div className="max-w-3xl mx-auto mt-12 prose prose-lg dark:prose-invert">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}