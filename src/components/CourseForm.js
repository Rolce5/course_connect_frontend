import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { FiUpload, FiDollarSign, FiClock, FiLink } from "react-icons/fi";
import Input from "./Input"; // Import the Input component
import Button from "./Button"; // Import the Button component
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function CourseForm({
  course,
  onSubmit,
  onCancel,
  isSubmitting,
  error: serverError
}) {
  const [formData, setFormData] = useState({
    title: course?.title || "",
    shortDescription: course?.shortDescription || "",
    description: course?.description || "",
    pricing: course?.pricing || null,
    duration: course?.duration || 0,
    totalHours: course?.totalHours || 0,
    category: course?.category || "",
    difficulty: course?.difficulty || "",
    imageUrl: course?.imageUrl || "",
    videoUrl: course?.videoUrl || "",
    isActive: course?.isActive || false,
  });

  const [imagePreview, setImagePreview] = useState(course?.imageUrl || null);
  const [imageFile, setImageFile] = useState(null); // Store the image file

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, imageUrl: reader.result });
        setImageFile(file); // Save the file to be sent later
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new FormData instance
    const formDataToSend = new FormData();

    // Append form data to FormData instance
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Append the image file if present
    if (imageFile) {
      formDataToSend.append("files", imageFile);
    }

    onSubmit(formDataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {course ? "Edit Course" : "Create New Course"}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Fill in the details below to {course ? "update" : "create"} your
          course
        </p>
      </div>

      {serverError && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-3 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-100"
            >
              <FiAlertCircle className="flex-shrink-0" />
              <span className="text-sm">{serverError}</span>
            </motion.div>
          )}

      {/* Basic Information Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Title */}
          <Input
            label="Course Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Advanced React Patterns"
            required
          />

          {/* Duration (in weeks) */}
          <Input
            label="Duration (weeks)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            placeholder="0"
            required
          />

          {/* Total Hours */}
          <Input
            label="Total Hours"
            name="totalHours"
            type="number"
            value={formData.totalHours}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>

        {/* Short Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description*
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
            placeholder="A brief overview of the course"
            required
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Description*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
            placeholder="What will students learn in this course?"
            required
          />
        </div>

        {/* Category & Difficulty */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
              required
            >
              <option value="">Select Category</option>
              <option value="WEB">Web</option>
              <option value="MOBILE">Mobile</option>
              <option value="DATA_SCIENCE">Data Science</option>
              <option value="DESIGN">Design</option>
              <option value="BUSINESS">Business</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
              required
            >
              <option value="">Select Difficulty</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Media Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Media</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Image
            </label>
            <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-32 w-full object-cover rounded-md"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                  >
                    <span>
                      {imagePreview ? "Change image" : "Upload an image"}
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Video URL */}
          <Input
            label="Promo Video URL"
            name="videoUrl"
            type="url"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://example.com/video.mp4"
          />
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Pricing</h3>

        <Input
          label="Course Pricing"
          name="pricing"
          type="number"
          icon={<FiDollarSign />}
          value={formData.pricing || ""}
          onChange={handleChange}
          placeholder="0.00 (leave empty for free course)"
        />
      </div>

      {/* Publish Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <input
            id="publish-course"
            name="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="publish-course"
            className="ml-3 block text-sm font-medium text-gray-700"
          >
            Publish this course
          </label>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {formData.isActive
            ? "This course will be visible to students."
            : "This course will be saved as a draft and not visible to students."}
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-indigo-600 text-white hover:bg-indigo-700"
          disabled={isSubmitting} // Disable during submission
        >
          {isSubmitting
            ? "Submitting..."
            : course
              ? "Update Course"
              : "Create Course"}
        </Button>
      </div>
    </form>
  );
}
