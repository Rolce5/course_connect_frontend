export const getLastActiveDate = (student) => {
  try {
    const dates = [];

    // Check enrollments
    if (student?.enrollments?.length) {
      student.enrollments.forEach((e) => {
        const date = new Date(e?.updatedAt);
        if (!isNaN(date.getTime())) dates.push(date);
      });
    }

    // Check student's own update time
    if (student?.updatedAt) {
      const date = new Date(student.updatedAt);
      if (!isNaN(date.getTime())) dates.push(date);
    }

    return dates.length === 0
      ? "Never"
      : new Date(Math.max(...dates.map((d) => d.getTime())))
          .toISOString()
          .split("T")[0];
  } catch {
    return "Invalid date";
  }
};
