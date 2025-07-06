import { useEffect, useState } from "react";
import IncidentForm from "../components/IncidentForm";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";

const INCIDENT_KEY = "incidents";
const PATIENT_KEY = "patients";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editingIncident, setEditingIncident] = useState(null);

  useEffect(() => {
    const savedIncidents = getFromLocalStorage(INCIDENT_KEY);
    const savedPatients = getFromLocalStorage(PATIENT_KEY);
    setIncidents(savedIncidents || []);
    setPatients(savedPatients || []);
  }, []);

  const saveIncidents = (updated) => {
    setIncidents(updated);
    saveToLocalStorage(INCIDENT_KEY, updated);
  };

  const handleAdd = (data) => {
    saveIncidents([...incidents, data]);
  };

  const handleEdit = (updated) => {
    const result = incidents.map((i) => (i.id === updated.id ? updated : i));
    saveIncidents(result);
    setEditingIncident(null);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this incident?")) {
      const filtered = incidents.filter((i) => i.id !== id);
      saveIncidents(filtered);
    }
  };

  const getPatientName = (id) => patients.find((p) => p.id === id)?.name || "Unknown";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Incident Management</h1>

      <IncidentForm
        patients={patients}
        onSubmit={editingIncident ? handleEdit : handleAdd}
        defaultValues={editingIncident}
      />

      <table className="w-full mt-6 border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Patient</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Files</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td className="border p-2">{getPatientName(incident.patientId)}</td>
              <td className="border p-2">{incident.title}</td>
              <td className="border p-2">{new Date(incident.appointmentDate).toLocaleString()}</td>
              <td className="border p-2">{incident.status || "Pending"}</td>
              <td className="border p-2">
                {incident.files?.map((file, idx) => (
                  <a
                    key={idx}
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline block"
                  >
                    {file.name}
                  </a>
                ))}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingIncident(incident)}
                  className="bg-yellow-400 px-2 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(incident.id)}
                  className="bg-red-600 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {incidents.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
                No incidents yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Incidents;
