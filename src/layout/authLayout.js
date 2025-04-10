import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation(); // Get the current location

  // Check if the current route is "login" or "register"
  const isRegisterPage = location.pathname.includes("register");
  const isLoginPage = location.pathname.includes("login");

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:block relative w-1/2 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
        <img
          src="https://images.unsplash.com/photo-1521747116042-5a810fda9664"
          alt="Online Learning"
          className="w-full h-full object-cover"
        />
        {/* Conditionally render the text based on the route */}
        {isRegisterPage && (
          <div className="absolute bottom-0 left-0 p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Join Our Learning Community
            </h2>
            <p className="text-lg opacity-90">
              Start your journey with thousands of students worldwide
            </p>
          </div>
        )}
        {isLoginPage && (
          <div className="absolute bottom-0 left-0 p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg opacity-90">
              Continue your learning journey with us
            </p>
          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
