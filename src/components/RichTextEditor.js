import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

const RichTextEditor = ({
  label,
  value,
  name,
  onChange, // This will now be your handleChange function
  height = 300,
  menubar = false,
  required = false,
  maxLength,
  error
}) => {
  // const handleEditorChange = (content) => {
  //   if (maxLength && content.length > maxLength) {
  //     return;
  //   }

  //   // Simulate a regular input change event
  //   onChange({
  //     target: {
  //       name, // The field name
  //       value: content,
  //       type: "richtext",
  //     },
  //   });
  // };

    const handleEditorChange = (content) => {
      // Ensure we don't proceed if content is empty when required
      if (required && !content.trim()) {
        onChange({
          target: {
            name,
            value: "",
            type: "richtext",
          },
        });
        return;
      }

      if (maxLength && content.length > maxLength) {
        // Instead of returning, trim the content to maxLength
        content = content.substring(0, maxLength);
      }

      onChange({
        target: {
          name,
          value: content,
          type: "richtext",
        },
      });
    };

    const charCountColor = maxLength
      ? value.length > maxLength
        ? "text-red-600"
        : value.length > maxLength * 0.9
          ? "text-yellow-600"
          : "text-gray-500"
      : "text-gray-500";


  return (
    <div className="mb-4">
      <label
        className={`block text-sm font-medium ${error ? "text-red-600" : "text-gray-700"} mb-1`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Editor
        tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
        value={value || ""}
        onEditorChange={handleEditorChange}
        init={{
          height,
          menubar,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {maxLength && (
        <p className={`mt-1 text-xs ${charCountColor}`}>
          {value.length}/{maxLength} characters
        </p>
      )}
    </div>
  );
};

RichTextEditor.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  height: PropTypes.number,
  menubar: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
};

export default RichTextEditor;
