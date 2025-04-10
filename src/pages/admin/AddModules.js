import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { createCourseModule } from "../../services/moduleService";
import ModuleForm from "../../components/ModuleForm";

export default function NewModulePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (moduleData) => {
    setIsSubmitting(true);
    try {
      await createCourseModule(moduleData);
      navigate(`/admin/courses/${courseId}/modules`);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "Failed to create module");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Create Module</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Module
          </h1>
          <p className="mt-2 text-gray-600">
            Add a new module to organize your course content.
          </p>
        </div>

        <ModuleForm
          courseId={courseId}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => navigate(`/admin/courses/${courseId}/modules`)}
          error={error}
        />
      </div>
    </div>
  );
}
