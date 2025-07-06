import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const IncidentForm = ({ onSubmit, defaultValues, patients }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = await Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({ name: file.name, url: reader.result });
          };
          reader.readAsDataURL(file);
        });
      })
    );
    setValue("files", filePreviews);
  };

  const submit = (data) => {
    if (!data.id) {
      data.id = uuidv4();
    }
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 bg-white p-4 rounded shadow-md mt-4">
      <div>
        <label className="block font-medium">Patient</label>
        <select {...register("patientId", { required: true })} className="input">
          <option value="">Select patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {errors.patientId && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Title</label>
          <input {...register("title", { required: true })} className="input" />
        </div>
        <div>
          <label className="block font-medium">Appointment Date</label>
          <input type="datetime-local" {...register("appointmentDate", { required: true })} className="input" />
        </div>
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea {...register("description")} className="input" />
      </div>

      <div>
        <label className="block font-medium">Comments</label>
        <textarea {...register("comments")} className="input" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Cost</label>
          <input type="number" {...register("cost")} className="input" />
        </div>
        <div>
          <label className="block font-medium">Treatment</label>
          <input {...register("treatment")} className="input" />
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <select {...register("status")} className="input">
            <option value="">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Follow-up">Follow-up</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium">Next Appointment</label>
        <input type="datetime-local" {...register("nextDate")} className="input" />
      </div>

      <div>
        <label className="block font-medium">File Uploads</label>
        <input type="file" multiple onChange={handleFileChange} />
        <p className="text-xs text-gray-500">Upload PDFs, images etc.</p>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {defaultValues ? "Update Incident" : "Add Incident"}
      </button>
    </form>
  );
};

export default IncidentForm;
