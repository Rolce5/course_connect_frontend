export default function CourseStatusBadge({ isActive }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      }`}
    >
      {isActive ? "Published" : "Draft"}
    </span>
  );
}
