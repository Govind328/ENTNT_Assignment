// const Dashboard = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//       <p className="mt-2">Welcome, Doctor! This is your dashboard.</p>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/storage";
import { format } from "date-fns";

const Dashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [topPatients, setTopPatients] = useState([]);

  useEffect(() => {
    const incidents = getFromLocalStorage("incidents") || [];
    const patients = getFromLocalStorage("patients") || [];

    // Total Revenue
    const total = incidents
      .filter((i) => i.status === "Completed")
      .reduce((acc, curr) => acc + (curr.cost || 0), 0);
    setRevenue(total);

    // Upcoming Appointments
    const now = new Date();
    const upcoming = incidents
      .filter((i) => new Date(i.appointmentDate) > now)
      .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
      .slice(0, 10);
    setAppointments(upcoming);

    // Completed / Pending Count
    setCompleted(incidents.filter((i) => i.status === "Completed").length);
    setPending(incidents.filter((i) => i.status === "Pending").length);

    // Top Patients by visit count
    const patientMap = {};
    for (let i of incidents) {
      patientMap[i.patientId] = (patientMap[i.patientId] || 0) + 1;
    }

    const top = Object.entries(patientMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id, count]) => {
        const p = patients.find((pt) => pt.id === id);
        return {
          name: p?.name || "Unknown",
          count,
        };
      });

    setTopPatients(top);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2">Welcome, Doctor! This is your dashboard.</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl text-green-600 font-bold">₹{revenue}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Completed Treatments</h2>
          <p className="text-2xl text-blue-600 font-bold">{completed}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Pending Appointments</h2>
          <p className="text-2xl text-yellow-500 font-bold">{pending}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Top Patient Visits</h2>
          <ul className="text-sm mt-2">
            {topPatients.map((p, idx) => (
              <li key={idx}>
                {p.name} ({p.count})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next 10 Appointments */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-3">Upcoming Appointments</h2>
        <ul className="space-y-2">
          {appointments.map((a) => (
            <li key={a.id} className="border-b pb-1">
              <span className="font-medium">{a.title}</span> —{" "}
              {format(new Date(a.appointmentDate), "PPpp")}
            </li>
          ))}
          {appointments.length === 0 && <p className="text-gray-500">No upcoming appointments.</p>}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

