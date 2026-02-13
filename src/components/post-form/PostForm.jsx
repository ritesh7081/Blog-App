import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [preview, setPreview] = useState(
    post ? appwriteService.getFilePreview(post.featuredImage) : null
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ----------------------------------
  // SUBMIT FUNCTION (FIXED)
  // ----------------------------------
  const submit = async (data) => {
    setLoading(true);

    try {
      // 🚨 Must be logged in
      if (!userData || !userData.$id) {
        alert("You must be logged in to publish a post.");
        setLoading(false);
        return;
      }

      let fileId = post?.featuredImage || null;

      // Upload new image if selected
      if (selectedFile) {
        const uploadedFile = await appwriteService.uploadFile(selectedFile);

        if (!uploadedFile) {
          alert("Image upload failed.");
          setLoading(false);
          return;
        }

        fileId = uploadedFile.$id;

        // Delete old image if editing
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      // Require image for new post
      if (!post && !fileId) {
        alert("Please upload an image.");
        setLoading(false);
        return;
      }

      // UPDATE
      if (post) {
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: fileId,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
      // CREATE
      else {
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }

    setLoading(false);
  };

  // ----------------------------------
  // SLUG AUTO GENERATOR
  // ----------------------------------
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // ----------------------------------
  // IMAGE PREVIEW
  // ----------------------------------
  const handleImagePreview = (file) => {
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            <Input
              label="Title"
              placeholder="Enter post title"
              {...register("title", { required: true })}
            />

            <Input
              label="Slug"
              placeholder="Auto-generated slug"
              {...register("slug", { required: true })}
              onInput={(e) =>
                setValue(
                  "slug",
                  slugTransform(e.currentTarget.value),
                  { shouldValidate: true }
                )
              }
            />

            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Upload Box */}
            <label
              className="
                block border-2 border-dashed border-gray-300 dark:border-gray-600
                rounded-xl p-6 text-center cursor-pointer
                hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800
                transition-all duration-300
              "
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                handleImagePreview(file);
              }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag & drop image here or click to upload
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImagePreview(e.target.files[0])}
              />
            </label>

            {/* Preview */}
            {preview && (
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            <Select
              options={["active", "inactive"]}
              label="Status"
              {...register("status", { required: true })}
            />

            <Button type="submit" className="w-full">
              {loading
                ? "Processing..."
                : post
                ? "Update Post"
                : "Publish Post"}
            </Button>

          </div>
        </div>
      </form>
    </div>
  );
}