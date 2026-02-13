import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="
        rounded-2xl overflow-hidden
        border border-gray-300 dark:border-gray-700
        shadow-sm
        focus-within:ring-2 focus-within:ring-blue-500
        transition-all duration-300
      ">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="c4ariq5x8xb3tbupavefzxcu6kkjr839tx084prd17x73otv"
              initialValue={defaultValue}
              init={{
                height: 500,
                menubar: false,
                branding: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code fullscreen",
                content_style: `
                  body {
                    font-family: Inter, sans-serif;
                    font-size: 16px;
                    line-height: 1.7;
                    padding: 16px;
                    background-color: ${document.documentElement.classList.contains("dark") ? "#111827" : "#ffffff"};
                    color: ${document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827"};
                  }
                `,
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}