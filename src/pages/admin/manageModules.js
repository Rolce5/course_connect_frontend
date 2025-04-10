import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiPlus,
  FiArrowLeft,
  FiClock,
  FiCheckCircle,
  FiEdit2,
  FiTrash2,
  FiMove,
  FiVideo,
  FiFileText,
  FiBookOpen,
  FiX,
  FiSave,
} from "react-icons/fi";
import {
  deleteModule,
  getCourseModules,
  updateModuleOrder,
} from "../../services/moduleService";
import {
  createLesson,
  updateLesson,
  deleteLesson,
} from "../../services/lessonService";
import LessonModal from "../../components/LessonModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "../../components/ConfirmModal";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ManageModulesPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getCourseModules(courseId);
        setModules(data);
      } catch (error) {
        console.error("Error fetching modules:", error);
        toast.error("Failed to load modules");
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, [courseId]);

  const handleReorder = (draggedIndex, targetIndex) => {
    const reorderedModules = [...modules];
    const [draggedModule] = reorderedModules.splice(draggedIndex, 1);
    reorderedModules.splice(targetIndex, 0, draggedModule);

    const updatedModules = reorderedModules.map((module, index) => ({
      ...module,
      order: index + 1,
    }));

    setModules(updatedModules);
  };

  const saveNewOrder = async () => {
    setIsSavingOrder(true);
    try {
      const moduleOrderUpdates = modules.map((module) => ({
        id: module.id,
        order: module.order,
      }));

      await updateModuleOrder(courseId, moduleOrderUpdates);
      toast.success("Module order saved successfully");
      setIsReorderMode(false);
    } catch (error) {
      console.error("Error saving module order:", error);
      toast.error("Failed to save module order");
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleAddLesson = async (lessonData) => {
    try {
      const newLesson = await createLesson(lessonData);
      setModules(
        modules.map((module) =>
          module.id === selectedModuleId
            ? { ...module, lessons: [...(module.lessons || []), newLesson] }
            : module
        )
      );
      setShowModal(false);
      toast.success("Lesson added successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to add lesson");
    }
  };

  const handleUpdateLesson = async (updatedLesson) => {
    try {
      const updated = await updateLesson(updatedLesson.id, updatedLesson);
      setModules(
        modules.map((module) => ({
          ...module,
          lessons: module.lessons?.map((l) =>
            l.id === updated.id ? updated : l
          ),
        }))
      );
      setShowModal(false);
      setEditingLesson(null);
      toast.success("Lesson updated successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update lesson");
    }
  };

  // const handleDeleteModule = async () => {
  //   if (!moduleToDelete) return;

  //   setIsDeleting(true);
  //   try {
  //     await deleteModule(moduleToDelete.id);

  //     setModules(modules.filter((m) => m.id !== moduleToDelete.id));
  //     toast.success("Module deleted successfully");
  //     setModuleToDelete(null);
  //   } catch (error) {
  //     console.error("Error deleting module:", error);
  //     toast.error("Failed to delete module");
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };

  // const handleDeleteLesson = async () => {
  //   if (!lessonToDelete) return;

  //   setIsDeleting(true);
  //   try {
  //     await deleteLesson(lessonToDelete.id);

  //     setModules(
  //       modules.map((module) => ({
  //         ...module,
  //         lessons: module.lessons?.filter((l) => l.id !== lessonToDelete.id),
  //       }))
  //     );
  //     toast.success("Lesson deleted successfully");
  //     setLessonToDelete(null);
  //   } catch (error) {
  //     console.error("Error deleting lesson:", error);
  //     toast.error("Failed to delete lesson");
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };
  const handleDeleteModule = async () => {
    if (!moduleToDelete) return;
  
    setIsDeleting(true);
    try {
      await deleteModule(moduleToDelete.id);
  
      setModules(modules.filter((m) => m.id !== moduleToDelete.id));
      toast.success("Module deleted successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setModuleToDelete(null);
    } catch (error) {
      console.error("Error deleting module:", error);
      toast.error("Failed to delete module", {
        position: "top-center"
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleDeleteLesson = async () => {
    if (!lessonToDelete) return;
  
    setIsDeleting(true);
    try {
      await deleteLesson(lessonToDelete.id);
  
      setModules(
        modules.map((module) => ({
          ...module,
          lessons: module.lessons?.filter((l) => l.id !== lessonToDelete.id),
        }))
      );
      toast.success("Lesson deleted successfully", {
        position: "bottom-right", // Different position for lessons
        autoClose: 2500,
        theme: "colored"
      });
      setLessonToDelete(null);
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("Failed to delete lesson", {
        position: "bottom-right",
        theme: "colored"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <button
            onClick={() => navigate(`/admin/courses/${courseId}`)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4 sm:mb-0"
          >
            <FiArrowLeft className="mr-2" /> Back to Course
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Course Modules</h1>
          <p className="text-gray-600 mt-1">
            Organize your course content into modules
          </p>
        </div>

        <div className="flex gap-2">
          {isReorderMode ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsReorderMode(false)}
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <FiX className="mr-2" /> Cancel
              </button>
              <button
                onClick={saveNewOrder}
                disabled={isSavingOrder}
                className={`flex items-center px-3 py-2 rounded-md ${
                  isSavingOrder
                    ? "bg-gray-300 text-gray-700"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isSavingOrder ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" /> Save Order
                  </>
                )}
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsReorderMode(true)}
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <FiMove className="mr-2" /> Reorder
              </button>
              <Link
                to={`/admin/courses/${courseId}/modules/new`}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <FiPlus className="mr-2" /> Add Module
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <FiBookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No modules yet
            </h3>
            <p className="mt-1 text-gray-500">
              Get started by adding your first module
            </p>
            <div className="mt-6">
              <Link
                to={`/admin/courses/${courseId}/modules/new`}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <FiPlus className="mr-2" /> Add Module
              </Link>
            </div>
          </div>
        ) : (
          modules
            .sort((a, b) => a.order - b.order)
            .map((module, index) => (
              <div
                key={module.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all ${
                  isReorderMode ? "cursor-move hover:shadow-md" : ""
                }`}
                draggable={isReorderMode}
                onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add("ring-2", "ring-indigo-200");
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove("ring-2", "ring-indigo-200");
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("ring-2", "ring-indigo-200");
                  const draggedIndex = parseInt(
                    e.dataTransfer.getData("text/plain")
                  );
                  if (draggedIndex !== index) {
                    handleReorder(draggedIndex, index);
                  }
                }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Module Header */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                          {isReorderMode && (
                            <span className="mr-3 text-gray-400">
                              <FiMove />
                            </span>
                          )}
                          {module.title}
                        </h2>
                        {module.description && (
                          <p className="mt-2 text-gray-600">
                            {module.description}
                          </p>
                        )}
                      </div>
                      {!isReorderMode && (
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/courses/${courseId}/modules/${module.id}/edit`
                              )
                            }
                            className="text-gray-500 hover:text-indigo-600 p-1"
                            title="Edit module"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => setModuleToDelete(module)}
                            className="text-gray-500 hover:text-red-600 p-1"
                            title="Delete module"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        <FiClock className="mr-1" /> {module.duration}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        <FiFileText className="mr-1" />{" "}
                        {module.lessons?.length || 0} lessons
                      </span>
                    </div>
                  </div>

                  {/* Lessons Preview */}
                  {!isReorderMode && (
                    <div className="w-full sm:w-1/3 bg-gray-50 p-6 border-t sm:border-t-0 sm:border-l border-gray-200">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Lessons
                      </h3>
                      <div className="space-y-2">
                        {module.lessons?.slice(0, 3).map((lesson) => (
                          <div
                            key={lesson.id}
                            className="group flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 -mx-2 px-2 py-1 rounded"
                          >
                            <div className="flex items-center min-w-0">
                              {lesson.videoUrl ? (
                                <FiVideo className="flex-shrink-0 mr-2 text-indigo-500" />
                              ) : (
                                <FiFileText className="flex-shrink-0 mr-2 text-gray-500" />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => {
                                  setEditingLesson(lesson);
                                  setSelectedModuleId(module.id);
                                  setShowModal(true);
                                }}
                                className="text-gray-500 hover:text-indigo-600"
                                title="Edit lesson"
                              >
                                <FiEdit2 size={14} />
                              </button>
                              <button
                                onClick={() => setLessonToDelete(lesson)}
                                className="text-gray-500 hover:text-red-600"
                                title="Delete lesson"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                        {module.lessons?.length > 3 && (
                          <div className="text-sm text-indigo-600">
                            +{module.lessons.length - 3} more lessons
                          </div>
                        )}
                        {(!module.lessons || module.lessons.length === 0) && (
                          <div className="text-sm text-gray-500 italic">
                            No lessons added
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {!isReorderMode && (
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Last updated:{" "}
                        {new Date(module.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setSelectedModuleId(module.id);
                          setEditingLesson(null);
                          setShowModal(true);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FiPlus className="mr-2" /> Add Lesson
                      </button>
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/courses/${courseId}/modules/${module.id}/lessons`
                          )
                        }
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Manage Lessons
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <LessonModal
          lesson={editingLesson}
          onClose={() => {
            setShowModal(false);
            setEditingLesson(null);
          }}
          onSubmit={editingLesson ? handleUpdateLesson : handleAddLesson}
          moduleId={selectedModuleId}
        />
      )}

      <ConfirmModal
        isOpen={!!moduleToDelete}
        onClose={() => setModuleToDelete(null)}
        onConfirm={handleDeleteModule}
        title="Delete Module"
        message={
          <>
            Are you sure you want to delete the module{" "}
            <strong>{moduleToDelete?.title}</strong>? This will also delete all
            lessons in this module.
          </>
        }
        confirmText="Delete Module"
        isProcessing={isDeleting}
        danger={true}
      />

      <ConfirmModal
        isOpen={!!lessonToDelete}
        onClose={() => setLessonToDelete(null)}
        onConfirm={handleDeleteLesson}
        title="Delete Lesson"
        message={`Are you sure you want to delete the lesson "${lessonToDelete?.title}"?`}
        confirmText="Delete Lesson"
        isProcessing={isDeleting}
        danger={true}
      />
    </div>
  );
}
