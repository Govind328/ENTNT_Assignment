import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PatientForm from "../components/PatientForm";

const PATIENT_KEY = "patients";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(PATIENT_KEY)) || [];
    setPatients(data);
  }, []);

  const savePatients = (newList) => {
    localStorage.setItem(PATIENT_KEY, JSON.stringify(newList));
    setPatients(newList);
  };

  const handleAdd = (patient) => {
    const newPatient = { ...patient, id: uuidv4() };
    const updated = [...patients, newPatient];
    savePatients(updated);
  };

  const handleEdit = (updatedPatient) => {
    const updated = patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p));
    savePatients(updated);
    setEditingPatient(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      const updated = patients.filter((p) => p.id !== id);
      savePatients(updated);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Management</h1>

      <PatientForm onSubmit={editingPatient ? handleEdit : handleAdd} defaultValues={editingPatient} />

      <table className="w-full mt-6 border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">DOB</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Health Info</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">{patient.dob}</td>
              <td className="border p-2">{patient.contact}</td>
              <td className="border p-2">{patient.healthInfo}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-yellow-500 px-3 py-1 text-white rounded"
                  onClick={() => setEditingPatient(patient)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 px-3 py-1 text-white rounded"
                  onClick={() => handleDelete(patient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {patients.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
