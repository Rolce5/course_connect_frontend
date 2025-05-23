import { useState, useEffect } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import RichTextEditor from "./RichTextEditor";
import Input from "./Input";
import { getHighestLessonOrder } from "../services/lessonService";
import Button from "./Button";

export default function LessonModal({
  lesson,
  onClose,
  onSubmit,
  moduleId,
  lessons = [],
}) {
  const [formData, setFormData] = useState({
    lessonId: lesson?.id || null,
    title: lesson?.title || "",
    description: lesson?.description || "",
    content: lesson?.content || "",
    duration: lesson?.duration ? lesson.duration : 30,
    order: lesson?.order || 0,
    moduleId: moduleId,
    videoUrl: lesson?.videoUrl || "",
  });

  const [videoPreview, setVideoPreview] = useState(lesson?.videoUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!lesson) {
      // Only for new lessons, not edits
      const fetchHighestOrder = async () => {
        try {
          const highestOrder = await getHighestLessonOrder(moduleId);
          console.log("Highest order: ",highestOrder);
          setFormData((prev) => ({
            ...prev,
            order: highestOrder + 1, // Set to highest order + 1
          }));
        } catch (error) {
          console.error("Failed to fetch highest order:", error);
          // Fallback to order 1 if fetch fails
          setFormData((prev) => ({ ...prev, order: 1 }));
        }
      };
      fetchHighestOrder();
    }
  }, [moduleId, lesson]); // Only run when moduleId or lesson changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result); // Only for preview
      };
      reader.readAsDataURL(file);
      setVideoFile(file); // Keep the original file for upload
      setFormData({ ...formData, videoUrl: "" }); // Clear URL if file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      // Common fields for both create and update
      const fields = ["title", "description", "content", "duration", "order"];

      fields.forEach((field) => {
        formDataToSend.append(field, formData[field] || "");
      });

      // Only include moduleId when creating (not updating)
      if (!lesson) {
        // If lesson doesn't exist (creating new)
        formDataToSend.append("moduleId", formData.moduleId);
      }

      // Handle video
      if (videoFile) {
        formDataToSend.append("files", videoFile);
        formDataToSend.append("videoUrl", "");
      } else {
        formDataToSend.append("videoUrl", formData.videoUrl || "");
      }

      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      await onSubmit(formDataToSend);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message || "Failed to save lesson. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 p-4 position-sticky">
          <h3 className="text-lg font-medium text-gray-900">
            {lesson ? "Edit Lesson" : "Add New Lesson"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="text-red-400">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
          <div>
            <Input
              label="Lesson Title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder=""
              required
              className="block !border-gray-300 !rounded-md shadow-sm !p-2"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              placeholder=""
              required
              className="block !border-gray-300 !rounded-md shadow-sm !p-2"
            />
            {/* <Input
              label="Order"
              name="order"
              type="number"
              value={formData.order || ""}
              onChange={handleChange}
              placeholder=""
              required
              className="block !border-gray-300 !rounded-md shadow-sm !p-2"
            /> */}
            <Input
              label="Order"
              name="order"
              type="number"
              value={formData.order || ""}
              onChange={handleChange}
              placeholder=""
              required
              className="block !border-gray-300 !rounded-md shadow-sm !p-2"
              // readOnly={!lesson} // Make read-only for new lessons
              disabled={!lesson}
            />
          </div>

          <div>
            <RichTextEditor
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              menubar={true}
              height={250}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Video
            </label>
            <div className="mt-1 flex items-center">
              {videoPreview ? (
                <video
                  controls
                  autoPlay
                  muted
                  className="w-full max-h-[300px] object-cover rounded-md mr-4"
                >
                  <source src={videoPreview} type="video/mp4" />
                </video>
              ) : (
                <p className="text-sm text-gray-500">No video selected</p>
              )}
              <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FiUpload className="inline mr-2" />
                {videoPreview ? "Change Video" : "Upload Video"}
                <input
                  type="file"
                  name="video"
                  className="sr-only"
                  onChange={handleVideoChange}
                  accept="video/*"
                />
              </label>
            </div>
            {/* OR URL Input (fallback) */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">- OR -</p>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="Alternative: External video URL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm"
              />
            </div>
          </div>

          <div>
            <RichTextEditor
              label="Content"
              name="content" // Must match your formData key
              value={formData.content}
              onChange={handleChange} // Your existing handleChange function
              required
              menubar={true}
              height={250}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 !py-2 !w-auto border border-gray-300 !rounded-md text-sm text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 !py-2 !w-auto bg-indigo-600 border border-gray-300 !rounded-md text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : lesson
                  ? "Update Lesson"
                  : "Add Lesson"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
