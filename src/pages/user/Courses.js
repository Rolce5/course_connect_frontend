import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { checkPaymentStatus } from "../../services/paymentService";
// import { useLocation } from "react-router-dom";
// import { URLSearchParams } from 'url';

const CoursesPage = () => {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(window.location.search);
  // const transactionId = queryParams.get("transactionId") // Get the transactionId from the URL query parameter;
    // Get the previous page's URL from referrer
    const previousUrl = document.referrer;

    const extractTransactionId = (url) => {
      // Ensure the previous URL is valid
      if (!url) return null;
  
      try {
        // Check if the referrer is a valid URL
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const pathSegments = pathname.split('/');
        return pathSegments[pathSegments.length - 1]; // Last segment is the transactionId
      } catch (error) {
        console.error("Invalid URL:", error);
        return null; // Return null if the URL is invalid
      }
    };
  
    const transactionId = extractTransactionId(previousUrl);
  

  console.log(transactionId)
  useEffect(() => {
    console.log(transactionId); // Log it again inside useEffect

    if (transactionId) {
      const fetchTransactionStatus = async () => {
        try {
          const response = await checkPaymentStatus(transactionId);
          console.log(response)
          // You can do something with 'data' here, like updating the state
        } catch (error) {
          console.error(error);
        }
      };
      fetchTransactionStatus(); // This is where you call the function
    }
  }, [transactionId]);
  
    // Static courses data
    const [courses, setCourses] = useState([
      {
        id: 1,
        title: "Advanced React Course",
        description: "Master React with hooks, context, and advanced patterns",
        category: "web",
        difficulty: "intermediate",
        rating: 4.8,
        reviews: 1245,
        enrolled: 5678,
        duration: 10,
        instructor: "John Doe",
        imageUrl: "https://via.placeholder.com/400x250?text=React",
        pricing: 49.99,
        originalPrice: 89.99,
        createdAt: "2023-05-15T00:00:00Z",
        isNew: true
      },
      {
        id: 2,
        title: "JavaScript Fundamentals",
        description: "Learn JavaScript from scratch with hands-on projects",
        category: "web",
        difficulty: "beginner",
        rating: 4.5,
        reviews: 987,
        enrolled: 4321,
        duration: 8,
        instructor: "Jane Smith",
        imageUrl: "https://via.placeholder.com/400x250?text=JavaScript",
        pricing: 29.99,
        originalPrice: 59.99,
        createdAt: "2023-07-20T00:00:00Z",
        isNew: false
      },
      {
        id: 3,
        title: "Node.js for Beginners",
        description: "Build server-side applications with Node.js and Express",
        category: "web",
        difficulty: "beginner",
        rating: 4.7,
        reviews: 876,
        enrolled: 3456,
        duration: 12,
        instructor: "Alice Johnson",
        imageUrl: "https://via.placeholder.com/400x250?text=Node.js",
        pricing: 39.99,
        createdAt: "2023-09-10T00:00:00Z",
        isNew: true
      },
      {
        id: 4,
        title: "Python Programming",
        description: "Complete Python course for absolute beginners",
        category: "data",
        difficulty: "beginner",
        rating: 4.9,
        reviews: 2345,
        enrolled: 7890,
        duration: 15,
        instructor: "Bob Brown",
        imageUrl: "https://via.placeholder.com/400x250?text=Python",
        pricing: 34.99,
        originalPrice: 69.99,
        createdAt: "2023-03-05T00:00:00Z",
        isNew: false
      },
      {
        id: 5,
        title: "Advanced Data Science",
        description: "Machine learning and data analysis with Python",
        category: "data",
        difficulty: "advanced",
        rating: 4.6,
        reviews: 543,
        enrolled: 2109,
        duration: 20,
        instructor: "Charlie Davis",
        imageUrl: "https://via.placeholder.com/400x250?text=Data+Science",
        pricing: 59.99,
        createdAt: "2023-10-15T00:00:00Z",
        isNew: true
      },
      {
        id: 6,
        title: "Flutter Mobile Development",
        description: "Build cross-platform mobile apps with Flutter",
        category: "mobile",
        difficulty: "intermediate",
        rating: 4.7,
        reviews: 765,
        enrolled: 3210,
        duration: 14,
        instructor: "Eva Wilson",
        imageUrl: "https://via.placeholder.com/400x250?text=Flutter",
        pricing: 44.99,
        originalPrice: 79.99,
        createdAt: "2023-08-22T00:00:00Z",
        isNew: false
      }
    ]);
  
    // Mock enrollments data
    const [enrollments, setEnrollments] = useState([{ courseId: 1 }, { courseId: 4 }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [enrollErrors, setEnrollErrors] = useState({});
    const [enrolling, setEnrolling] = useState(false);
  
    // Filtering/sorting state
    const [filters, setFilters] = useState({
      category: 'all',
      difficulty: 'all',
      sortBy: 'popular'
    });
    
    // Search functionality
    const [searchQuery, setSearchQuery] = useState('');
  
    // Check if user is enrolled in a course
    const isEnrolled = (courseId) => {
      return enrollments.some(enrollment => enrollment.courseId === courseId);
    };
  
    // Mock enroll function
    const handleEnrollClick = async (courseId) => {
      if (isEnrolled(courseId)) return;
      
      setEnrolling(true);
      setEnrollErrors(prev => ({ ...prev, [courseId]: "" }));
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful enrollment
        setEnrollments(prev => [...prev, { courseId }]);
      } catch (err) {
        setEnrollErrors(prev => ({
          ...prev,
          [courseId]: "Error enrolling in the course"
        }));
      } finally {
        setEnrolling(false);
      }
    };
  
    // Filter courses based on filters and search
    const filteredCourses = useMemo(() => {
      return courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filters.category === 'all' || course.category === filters.category;
        const matchesDifficulty = filters.difficulty === 'all' || course.difficulty === filters.difficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
      }).sort((a, b) => {
        if (filters.sortBy === 'popular') return b.enrolled - a.enrolled;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
    }, [courses, filters, searchQuery]);
  
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        {/* Enhanced Header with Search */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Browse Courses</h1>
          <p className="text-gray-600 mt-2">
            Find the perfect course to advance your skills
          </p>
          
          <div className="mt-6 max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </header>
  
        {/* Filters Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="p-2 border rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="data">Data Science</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select 
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                className="p-2 border rounded-md"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              {/* <select 
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                className="p-2 border rounded-md"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select> */}
            </div>
          </div>
        </div>
  
        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id}
              course={course}
              isEnrolled={isEnrolled(course.id)}
              onEnroll={handleEnrollClick}
              enrolling={enrolling}
              enrollError={enrollErrors[course.id]}
            />
          ))} */}
        </div>
      </div>
    );
  };

  export default CoursesPage;
  
