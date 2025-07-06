import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-blue-800 text-white p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-6">ENTNT Admin</h2>
        <nav className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/patients")}
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
          >
            Patients
          </button>
          <button
            onClick={() => navigate("/incidents")}
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
          >
            Incidents
          </button>
          <button
            onClick={() => navigate("/calendar")}
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
          >
            Calendar
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
