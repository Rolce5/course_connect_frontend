import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, updateCourse } from "../../services/couseService";
import CourseForm from "../../components/CourseForm";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function EditCoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(courseId); // Fetch course data using the ID from the URL
        setCourse(response); //
      } catch (error) {
        console.error("Error:", error);
        navigate("/admin/courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (updatedData) => {
    setIsSubmitting(true);
    try {
      const response = await updateCourse(courseId, updatedData);
      console.log(response);
      navigate(`/admin/courses/${courseId}`);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!course) return <div>Course not found</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Course</h1>
          <button
            onClick={() => navigate(`/admin/courses/${courseId}`)}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
        <CourseForm
          course={course}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => navigate("/admin/courses")}
          error={error}
        />
      </div>
    </div>
  );
}
