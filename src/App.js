import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
// import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    // <AuthProvider>
      <div className="App">
        <RouterProvider router={routes} />
      </div>
    // </AuthProvider>
  );
}

export default App;
