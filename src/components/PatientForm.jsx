import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PatientForm = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const submit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 bg-white p-4 rounded shadow-md">
      <div>
        <label className="block font-medium">Full Name</label>
        <input {...register("name", { required: true })} className="input" />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
      </div>
      <div>
        <label className="block font-medium">Date of Birth</label>
        <input type="date" {...register("dob", { required: true })} className="input" />
        {errors.dob && <p className="text-red-500 text-sm">DOB is required</p>}
      </div>
      <div>
        <label className="block font-medium">Contact</label>
        <input {...register("contact", { required: true })} className="input" />
        {errors.contact && <p className="text-red-500 text-sm">Contact is required</p>}
      </div>
      <div>
        <label className="block font-medium">Health Info</label>
        <textarea {...register("healthInfo")} className="input" />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {defaultValues ? "Update Patient" : "Add Patient"}
      </button>
    </form>
  );
};

export default PatientForm;
