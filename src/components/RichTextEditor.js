import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = ({
  label,
  value,
  onChange,
  height = 300,
  menubar = false,
}) => {
  return (
    <div>
      <label
        className="block text-lg font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <Editor
        tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js" // Path to self-hosted TinyMCE
        value={value}
        onEditorChange={onChange}
        init={{
          height: height,
          menubar: menubar,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
        }}
      />
    </div>
  );
};

export default RichTextEditor;
