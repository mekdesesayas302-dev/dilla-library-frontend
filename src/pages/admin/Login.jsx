import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("admin", "true");
      navigate("/admin/contacts");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow rounded">
        <h2 className="mb-4 font-bold">Admin Login</h2>

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-700 text-white px-4 py-2 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;