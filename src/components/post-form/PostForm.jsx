import React, { useCallback, useState, useRef } from "react";
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
    post ? appwriteService.getFilePreview(post.featuredImage) : null,
  );
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // --------------------
  // Submit Handler
  // --------------------
  const submit = async (data) => {
    setLoading(true);

    try {
      if (post) {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const dbPost = await appwriteService.createPost({
            ...data,
            featuredImage: file.$id,
            userId: userData.$id,
          });

          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // --------------------
  // Slug Generator
  // --------------------
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
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

  // --------------------
  // Image Preview
  // --------------------
  const handleImagePreview = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
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
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                })
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
            <div
              onClick={() => document.getElementById("file-upload").click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                setValue("image", e.dataTransfer.files);
                handleImagePreview(file);
              }}
              className="border-2 border-dashed border-gray-300 dark:border-gray-60 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag & drop image here or click to upload
              </p>

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", { required: !post })}
                onChange={(e) => handleImagePreview(e.target.files[0])}
              />
            </div>

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

            {/* Submit */}
            <Button type="submit" loading={loading} className="w-full">
              {post ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
