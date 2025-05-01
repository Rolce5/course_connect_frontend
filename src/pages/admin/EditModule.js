import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getModuleById, updateModule } from '../../services/moduleService'; // Added updateModule import
import ModuleForm from '../../components/ModuleForm';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EditModulePage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [module, setModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const module = await getModuleById(moduleId);
        console.log(module)
        setModule(module);
      } catch (error) {
        console.error('Error:', error);
        navigate(`/admin/courses/${courseId}/modules`, { replace: true });
      } finally {
        setIsLoading(false)
      }
    };

    fetchModule();
  }, [moduleId, courseId, navigate]);

  const handleSubmit = async (moduleData) => {
    setIsSubmitting(true);
    try {
      await updateModule(moduleId, moduleData); // Now using the imported function
      navigate(`/admin/courses/${courseId}/modules`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update module');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!module) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Helmet>
        <title>Edit Module</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Module</h1>
          <p className="mt-2 text-gray-600">
            Update the module details below.
          </p>
        </div>
        <ModuleForm
          module={module} // Changed from existingModule to module
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => navigate(`/admin/courses/${courseId}/modules`)}
        />
      </div>
    </div>
  );
} 