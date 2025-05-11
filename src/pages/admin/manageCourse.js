import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../../services/couseService";
import ConfirmModal from "../../components/ConfirmModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import CourseStatusBadge from "../../components/CourseStatusBadge";

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data || []);
        console.log(data);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const reponse = await deleteCourse(id);
      // setCourses(courses.filter((course) => course.id !== id));
      setCourseToDelete(null);
      <toast className="success"></toast>('Course deleted succusfully.');
    } catch (error) {
      console.error("Failed to delete course:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && course.is_active) ||
      (filter === "draft" && !course.is_active);
    return matchesSearch && matchesFilter;
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Courses || CourseConnect</title>
      </Helmet>
      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!courseToDelete}
        onClose={() => setCourseToDelete(null)}
        onConfirm={() => handleDelete(courseToDelete?.id)}
        title="Confirm Deletion"
        message={
          <>
            Are you sure you want to delete the course{" "}
            <strong>{courseToDelete?.title}</strong>? This will also delete all
            modules in this course with it's associated lessons.
          </>
        }
        confirmText="Delete Course"
        isProcessing={isDeleting}
        danger={true}
      />

      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Course Management
            </h2>
            <p className="mt-1 text-gray-600">
              Manage and organize your learning content
            </p>
          </div>
          <Link
            to="/admin/courses/new"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiPlus className="mr-2" /> Create New Course
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-500" />
              <select
                className="border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {course.imageUrl ? (
                            <div className="flex-shrink-0 h-12 w-12 mr-4 overflow-hidden rounded-lg">
                              <img
                                className="h-full w-full object-cover"
                                src={course.imageUrl}
                                alt={course.title}
                              />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 h-12 w-12 mr-4 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                No Image
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {course.title}
                            </div>

                            <div
                              className="text-sm text-gray-500 line-clamp-1"
                              dangerouslySetInnerHTML={{
                                __html: course.short_description,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <CourseStatusBadge isActive={course.is_active} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(course.updated_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin/courses/${course.id}`}
                            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="View Details"
                          >
                            <FiEye />
                          </Link>
                          <Link
                            to={`/admin/courses/${course.id}/edit`}
                            className="text-indigo-500 hover:text-indigo-700 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </Link>
                          <button
                            onClick={() => setCourseToDelete(course)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
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
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        {courses.length === 0
                          ? "No courses available"
                          : "No courses match your search"}
                      </div>
                      {courses.length === 0 && (
                        <Link
                          to="/admin/courses/new"
                          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                        >
                          <FiPlus className="mr-2" /> Create your first course
                        </Link>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
