import { useState, useEffect } from "react";
import { FiClock, FiEdit2, FiPlus } from "react-icons/fi";
import Input from "./Input";
import Button from "./Button";
import { getHighestModuleOrder } from "../services/moduleService";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function ModuleForm({
  module, // Only for editing existing modules
  courseId, // Required for creating new modules
  onSubmit,
  onCancel,
  isSubmitting,
  error: serverError, // Received from parent
}) {
  const isEditMode = !!module;

  const [formData, setFormData] = useState({
    title: module?.title || "",
    description: module?.description || "",
    duration: module?.duration || "",
    order: module?.order || 1,
    courseId: module?.courseId || courseId || "",
  });

  const [isLoadingOrder, setIsLoadingOrder] = useState(!isEditMode);

  // Fetch the highest order for new modules
  useEffect(() => {
    if (isEditMode) return;

    const fetchHighestOrder = async () => {
      try {
        const highestOrder = await getHighestModuleOrder(formData.courseId);
        setFormData((prev) => ({
          ...prev,
          order: highestOrder + 1,
        }));
      } catch (err) {
        console.error("Failed to fetch module order:", err);
      } finally {
        setIsLoadingOrder(false);
      }
    };

    fetchHighestOrder();
  }, [formData.courseId, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="space-y-2">

        <div className="flex items-center gap-3">
          {isEditMode ? (
            <FiEdit2 className="h-6 w-6 text-indigo-600" />
          ) : (
            <FiPlus className="h-6 w-6 text-indigo-600" />
          )}


        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Module Details
          </h3>
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

          <div className="space-y-5">
            {/* Title */}
            <Input
              label="Module Title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Advanced React Patterns"
              required
              className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                placeholder="What will students learn in this module?"
              />
            </div>

            {/* Duration & Order */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Duration */}
              <Input
                label="Duration"
                name="duration"
                type="text"
                icon={<FiClock className="text-gray-400" />}
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 3 weeks, 2 hours"
              />

              {/* Order */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Display Order
                </label>
                {isLoadingOrder ? (
                  <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                ) : (
                  <input
                    type="number"
                    name="order"
                    min="1"
                    value={formData.order}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                    disabled={!isEditMode}
                    required
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
         
          <Button
            isLoading={isSubmitting}
            type="submit"
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={isSubmitting || isLoadingOrder}
          >
            {isSubmitting
              ? "Submitting..."
              : isEditMode
                ? "Update Module"
                : "Create Module"}
          </Button>
        </div>
      </div>
    </form>
  );
}
