import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelateAI from "../assets/RelateAI.png";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateName(name);
    validateEmail(email);
    validatePassword(password);
  }, [name, email, password]);

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    setNameValid(nameRegex.test(name));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    setPasswordValid(passwordRegex.test(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users/signup", {
        name,
        email,
        password,
      });
      navigate("/signin");
    } catch (error) {
      console.error("Sign-up failed:", error);
      setError(
        error.response?.data?.message || "Sign-up failed. Please try again."
      );
      toast.error(error.response?.data?.message || "Sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/" className="flex flex-shrink-0 items-center">
          <img src={RelateAI} className="mx-auto h-20 w-auto pointer-events-none select-none" />
        </a>

        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
            <p className={`text-sm ${nameValid ? "text-green-500" : "text-gray-500"}`}>
              {nameValid ? "Name is valid" : "Name must contain only letters"}
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
            <p className={`text-sm ${emailValid ? "text-green-500" : "text-gray-500"}`}>
              {emailValid ? "Email is valid" : "Invalid email format"}
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
            <p className={`text-sm ${passwordValid ? "text-green-500" : "text-gray-500"}`}>
              {passwordValid
                ? "Password is valid"
                : "Password must be at least 8 characters long and include a number"}
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? (
                <span className="loader" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-500">
            {/* {error} */}
          </div>
        )}

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{" "}
          <a href="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign in now!
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;