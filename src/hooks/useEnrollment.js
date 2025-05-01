import { useState, useEffect, useCallback } from "react";
import {
  getUserEnrollmentForCourse,
  updateEnrollmentProgress,
} from "../services/enrollmentService";

export const useEnrollment = (courseId) => {
  const [enrollment, setEnrollment] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchEnrollment = useCallback(async () => {
    try {
      setLoading(true);
      const enrollmentData = await getUserEnrollmentForCourse(courseId);
      setEnrollment(enrollmentData);
      setProgress(enrollmentData?.progress || 0);
    } catch (error) {
      console.error("Error loading enrollment:", error);
    } finally {
      setLoading(false);
    }
  }, [courseId]);


  // const updateProgress = useCallback(
  //   async (lessonId, markComplete = false) => {
  //     if (!enrollment) return;

  //     try {
  //       const updated = await updateEnrollmentProgress({
  //         enrollmentId: enrollment.id,
  //         lastLessonId: lessonId,
  //         progress: markComplete ? 100 : progress,
  //         courseId: courseId,
  //       });
  //       setEnrollment(updated);
  //       setProgress(updated.progress);
  //     } catch (error) {
  //       console.error("Update failed:", error);
  //     }
  //   },
  //   [enrollment, progress, courseId]
  // );
  const updateProgress = useCallback(
    async (lessonId) => {
      if (!enrollment) return;

      try {
        const updated = await updateEnrollmentProgress({
          courseId,
          lastLessonId: lessonId,
        });
        setEnrollment(updated);
      } catch (error) {
        console.error("Update failed:", error);
        throw error;
      }
    },
    [enrollment, courseId]
  );

  useEffect(() => {
    if (courseId) {
      fetchEnrollment();
    }
  }, [courseId, fetchEnrollment]);

  return { enrollment, progress, updateProgress, loading, fetchEnrollment };
};
