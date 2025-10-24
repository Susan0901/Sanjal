import { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import api from "../../lib/axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { type, name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });
      toast.error("All fields are required");
      setLoading(false);
      return; // Stop execution
    }

    try {
      const response = await api.post("/auth/login", formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        // You can redirect user or update context/state here
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to login. Try again!"
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
      console.log("Before",formData)
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });
      console.log("After",formData)
    }
  };

  return (
    <section className="login-container p-4">
      <div className="lg:flex lg:items-center lg:w-[900px] w-[400px] space-y-6 gap-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-5xl font-bold">Sanjal</h1>
          <p className="text-gray-600 font-semibold">
            Sanjal is a social media platform that helps to connect people all
            around the world!
          </p>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleLoginFormSubmit} className="space-y-4">
            <InputField
              type="email"
              id="email"
              name="email"
              value={formData.email} // fixed
              placeholder="Enter email address"
              onChange={handleInputChange}
              className="w-full"
            />
            <InputField
              type="password"
              id="password"
              name="password"
              value={formData.password} // fixed
              placeholder="Enter password"
              onChange={handleInputChange}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-start gap-2">
                <InputField
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <Link to="">Forgotten Password?</Link>
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="text-center w-full">
            <Link to="">Create new account?</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
