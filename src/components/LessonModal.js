import { useState, useEffect } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import RichTextEditor from "./RichTextEditor";
import Input from "./Input";
import { getHighestLessonOrder } from "../services/lessonService";

export default function LessonModal({ lesson, onClose, onSubmit, moduleId, lessons = [] }) {
  const [formData, setFormData] = useState({
    id: lesson?.id || null,
    title: lesson?.title || "",
    description: lesson?.description || "",
    content: lesson?.content || "",
    duration: lesson?.duration ? lesson.duration : 30,
    order: lesson?.order || 0,  
    moduleId: moduleId,
    videoUrl: lesson?.videoUrl || "",
  });

  console.log(formData.order)

  const [videoPreview, setVideoPreview] = useState(lesson?.videoUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // useEffect(() => {
  //   if (!lesson) {
  //     // If creating a new lesson, set the order to the next available number
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       order: lessons.length + 1, // This will ensure the order starts from the next available number
  //     }));
  //   }
  // }, [lesson, lessons]);
  // useEffect(() => {
  //   if (!lesson) {
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       order: lessons.length + 1,
  //     }));
  //   }
  // }, [lesson, lessons.length]); // Only depend on these values
  useEffect(() => {
    // Only set order if creating a new lesson AND order isn't already set
    if (!lesson && formData.order === null) {
      setFormData(prev => ({
        ...prev,
        order: lessons.length + 1
      }));
    }
  }, [lesson, lessons.length, formData.order]); // Add formData.order as dependency

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
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formDataToSend = new FormData();
    
  //   // Append all form data except videoUrl if we have a file
  //   Object.keys(formData).forEach((key) => {
  //     if (key !== 'videoUrl' || !videoFile) {
  //       formDataToSend.append(key, formData[key]);
  //     }
  //   });
    
  //   if (videoFile) {
  //     formDataToSend.append("files", videoFile); // Append the original file
  //   }
  
  //   try {
  //     setIsSubmitting(true)
  //     await onSubmit(formDataToSend);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // };
  
  // const [isLoadingOrder, setIsLoadingOrder] = useState(!lesson);

  // Fetch the highest order for new modules
    // Fetch the highest order for new modules or when moduleId changes
   // In LessonModal component
// const [isLoadingOrder, setIsLoadingOrder] = useState(false);

// Fetch the highest order when creating a new lesson
// useEffect(() => {
//   // If editing an existing lesson, don't fetch order
//   if (lesson) {
//     setFormData(prev => ({
//       ...prev,
//       order: lesson.order // Use the existing lesson's order
//     }));
//     return;
//   }

//   const fetchHighestOrder = async () => {
//     try {
//       setIsLoadingOrder(true);
//       const highestOrder = await getHighestLessonOrder(moduleId);
//       setFormData(prev => ({
//         ...prev,
//         order: highestOrder + 1
//       }));
//     } catch (err) {
//       console.error("Failed to fetch highest order:", err);
//       // Fallback to using lessons array length + 1
//       setFormData(prev => ({
//         ...prev,
//         order: lessons.length + 1
//       }));
//     } finally {
//       setIsLoadingOrder(false);
//     }
//   };

//   fetchHighestOrder();
// }, [moduleId, lesson, lessons.length]); // Add all dependencies
  
const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataToSend = new FormData();
  
  // Convert all values to strings and handle null/undefined
  Object.keys(formData).forEach((key) => {
    if (key !== 'videoUrl' || !videoFile) {
      const value = formData[key] === null ? '' : formData[key];
      formDataToSend.append(key, String(value));
    }
  });
  
  if (videoFile) {
    formDataToSend.append("files", videoFile);
  }

  try {
    setIsSubmitting(true);
    await onSubmit(formDataToSend);
  } catch (error) {
    console.error("Error submitting form:", error);
    setError("Failed to save lesson. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900">
            {lesson ? "Edit Lesson" : "Add New Lesson"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lesson Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)*
              </label>
              <input
                type="number"
                name="duration"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Order*
  </label>
  <input
    type="number"
    name="order"
    value={formData.order || ''}  // Fallback to empty string if null
    onChange={handleChange}  // Add this
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
    required
  />
</div>
         

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Video
            </label>
            <div className="mt-1 flex items-center">
              {videoPreview ? (
                <video controls autoPlay muted className="w-full max-h-[300px] object-cover rounded-md mr-4">
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
                  name="file-upload"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content*
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : lesson
                ? "Update Lesson"
                : "Add Lesson"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
