import { useState, useEffect } from "react";
import { getCourseWithLessons } from "../services/couseService";

export const useCourseData = (courseId) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const course = await getCourseWithLessons(courseId);
        setCourseData(course);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchData();
    }

    return () => {
      // Cleanup if needed
    };
  }, [courseId]);

  return { courseData, loading, error };
};
