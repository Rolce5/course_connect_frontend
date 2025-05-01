import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LessonModal from '../../components/LessonModal';
import { createLesson, deleteLesson, updateLesson, getModuleLessons } from '../../services/lessonService';
import { getModuleById } from '../../services/moduleService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmModal from '../../components/ConfirmModal'; // Import the ConfirmModal

export default function CourseLessonsPage() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [module, setModule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
  const [lessonToDelete, setLessonToDelete] = useState(null); // Track which lesson to delete

  useEffect(() => {
    if (!moduleId) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null); 
        
        const [moduleData, lessonsData] = await Promise.all([
          getModuleById(moduleId),
          getModuleLessons(moduleId)
        ]);
        setLessons(lessonsData);
        setModule(moduleData);
        console.log(moduleData)
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Failed to load data');
        navigate('/admin/courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [moduleId, navigate]);

  const handleAddLesson = async (lessonData) => {
    try {
      const newLesson = await createLesson(lessonData);
      setLessons([...lessons, newLesson]);
      setShowModal(false);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to add lesson');
    }
  };

  const handleUpdateLesson = async (updatedLesson) => {
    try {
      const updated = await updateLesson(updatedLesson.id, updatedLesson);
      setLessons(lessons.map(l => l.id === updated.id ? updated : l));
      setShowModal(false);
      setEditingLesson(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to update lesson');
    }
  };

  const handleDeleteConfirmation = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    setLessonToDelete(lesson);
    setShowDeleteModal(true);
  };

  const handleDeleteLesson = async () => {
    if (!lessonToDelete) return;
    
    try {
      await deleteLesson(lessonToDelete.id);
      setLessons(lessons.filter(l => l.id !== lessonToDelete.id));
      setShowDeleteModal(false);
      setLessonToDelete(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to delete lesson');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!module) return <div className="p-4">Module not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Lessons for {module.title}
            </h1>
            <p className="mt-1 text-gray-600">{module.description}</p>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/admin/courses/${module.courseId}/modules`}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Module
            </Link>
            <button
              onClick={() => {
                setEditingLesson(null);
                setShowModal(true);
              }}
              className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 flex items-center"
            >
              <FiPlus className="mr-2" /> Add Lesson
            </button>
          </div>
        </div>

        {/* Lessons Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lessons.length > 0 ? (
                  [...lessons]
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => (
                      <tr key={lesson.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {lesson.title}
                          </div>
                          <div
                            className="text-sm text-gray-500 truncate max-w-xs "
                            dangerouslySetInnerHTML={{
                              __html: lesson.description,
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lesson.duration} mins
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lesson.order}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-3 justify-end">
                            <button
                              onClick={() =>
                                navigate(`${lesson.id}`, { state: { lesson } })
                              }
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                              title="View"
                            >
                              <FiEye />
                            </button>
                            <button
                              onClick={() => {
                                setEditingLesson(lesson);
                                setShowModal(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                              title="Edit"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteConfirmation(lesson.id)
                              }
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No lessons found. Create your first lesson to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lesson Modal */}
        {showModal && (
          <LessonModal
            lesson={editingLesson}
            onClose={() => {
              setShowModal(false);
              setEditingLesson(null);
            }}
            onSubmit={editingLesson ? handleUpdateLesson : handleAddLesson}
            moduleId={moduleId}
          />
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setLessonToDelete(null);
          }}
          onConfirm={handleDeleteLesson}
          title="Delete Lesson"
          message={`Are you sure you want to delete the lesson "${lessonToDelete?.title}"? This action cannot be undone.`}
          confirmText="Delete Lesson"
          cancelText="Cancel"
          danger={true}
        />
      </div>
    </div>
  );
}