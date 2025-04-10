import CourseForm from '../../components/CourseForm';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCourse } from '../../services/couseService';
import { Helmet } from 'react-helmet';



export default function NewCoursePage() {
    const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);



  const handleSubmit = async (courseData) => {
    setIsSubmitting(true);
    try {
      const response = await createCourse(courseData);
      const courseId = response.id;  // Assuming the response contains the new course's id
      navigate(`/admin/courses/${courseId}`);
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
       <Helmet>
        <title> Course </title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
        <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
        <p className="mt-2 text-gray-600">
          Start by setting up your course details. You'll add modules and lessons next.
        </p>
      </div>
          <button 
            onClick={() => navigate('/admin/courses')}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
        <CourseForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => navigate('/admin/courses')}
          error={error}
        />
      </div>
    </div>
  );
}