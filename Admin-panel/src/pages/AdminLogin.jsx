import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("https://api.sdtour.online/admin/login", {
        email,
        password
      });

      // ✅ Save token
      localStorage.setItem("adminToken", res.data.token);

      // ✅ Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid admin email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#f4612b] mb-6">
          Admin Login
        </h1>

        {/* Error */}
        {error && (
          <p className="mb-4 text-center text-red-500 text-sm">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full pl-10 pr-3 py-2
                border rounded-lg
                focus:outline-none focus:ring-2
                focus:ring-[#f4612b]
              "
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full pl-10 pr-3 py-2
                border rounded-lg
                focus:outline-none focus:ring-2
                focus:ring-[#f4612b]
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#f4612b] text-white py-2 rounded-lg
              font-semibold
              hover:opacity-90
              transition duration-200
              disabled:opacity-60
            "
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          © 2025 Tours Admin Panel
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
