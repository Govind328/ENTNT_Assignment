import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PatientView from "../pages/PatientView";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import Patients from "../pages/Patients";
import Incidents from "../pages/Incidents";
import CalendarView from "../pages/CalendarView";

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {user ? (
          user.role === "Admin" ? (
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/incidents" element={<Incidents/>} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/calendar" element={<CalendarView />} />
            </Route>
          ) : (
            <Route path="/" element={<PatientView />} />
          )
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
