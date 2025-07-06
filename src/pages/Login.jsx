import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const result = login(data.email, data.password);
    if (result.success) {
      navigate("/");
    } else {
      alert(result.message);
    }
  };

//   const onSubmit = (e) => {
//   e.preventDefault();

//   // Assume you're checking against hardcoded users:
//   const users = JSON.parse(localStorage.getItem("users") || "[]");
//   const user = users.find(
//     (u) => u.email === email && u.password === password
//   );

//   if (user) {
//     // Save session
//     localStorage.setItem("session", JSON.stringify(user));

//     // 👇 Redirect based on role
//     if (user.role === "Admin") {
//       navigate("/admin/dashboard");
//     } else if (user.role === "Patient") {
//       navigate("/patient/dashboard");
//     }
//   } else {
//     alert("Invalid credentials");
//   }
// };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">ENTNT Dental Center Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              {...register("password")}
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;