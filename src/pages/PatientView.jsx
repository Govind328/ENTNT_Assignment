import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/storage";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PatientView = () => {
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();
    const { logout } = useAuth();

  useEffect(() => {
    const session = getFromLocalStorage("sessionUser");
    console.log(session)
    const allIncidents = getFromLocalStorage("incidents") || [];
    const allPatients = getFromLocalStorage("patients") || [];

    if (!session || session.role !== "Patient") return;

    const currentPatient = allPatients.find((p) => p.id === session.patientId);
    setPatient(currentPatient);

    const myAppointments = allIncidents
      .filter((i) => i.patientId === session.patientId)
      .sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );

    setPatientAppointments(myAppointments);
    console.log(currentPatient);
    console.log(allIncidents);
    console.log("my", myAppointments)
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {patient?.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-lg font-semibold">Your Appointments</h2>
      {patientAppointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {patientAppointments.map((appt) => (
            <div key={appt.id} className="bg-white p-4 rounded shadow border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{appt.title}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(appt.appointmentDate), "PPpp")}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    appt.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {appt.status}
                </span>
              </div>
              {appt.treatment && (
                <p className="mt-2">
                  <strong>Treatment:</strong> {appt.treatment}
                </p>
              )}
              {appt.cost !== undefined && (
                <p>
                  <strong>Cost:</strong> ₹{appt.cost}
                </p>
              )}
              {appt.comments && (
                <p>
                  <strong>Comments:</strong> {appt.comments}
                </p>
              )}
              {appt.files?.length > 0 && (
                <div className="mt-2">
                  <strong>Attachments:</strong>
                  <ul className="list-disc list-inside text-sm">
                    {appt.files.map((f, idx) => (
                      <li key={idx}>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {f.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientView;
