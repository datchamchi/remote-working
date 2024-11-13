import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

import { API_LOGIN } from "../api/url";
import { LoginSuccessMessage, ResponseError } from "../types/response.type";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string[]>([]);
  const navigate = useNavigate();

  function handleSubmit() {
    setMessage([]);
    axios
      .post(
        `${import.meta.env.VITE_URL_BACKEND}${API_LOGIN}`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      )
      .then((res) => {
        toast.success("Login successfully");
        const { accessToken, user } = res.data as LoginSuccessMessage;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          navigate("/your-tasks");
        }, 2000);
      })
      .catch((err: unknown) => {
        if (err instanceof AxiosError) {
          const response = err.response;
          if (response) {
            const { message } = response.data as ResponseError;
            if (Array.isArray(message)) setMessage(message);
            else {
              setMessage((arr) => [...arr, message]);
            }
          }
        }
      });
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {message.map((mess) => (
            <div className="text-sm text-red-600" key={mess}>
              {mess}
            </div>
          ))}
          <div>
            <button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </div>

        <p className="mt-10 space-x-4 text-center text-sm text-gray-500">
          <span>Not a member?</span>
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:underline"
          >
            Sign up now
          </Link>
        </p>
      </div>

      <form
        action={`${import.meta.env.VITE_URL_BACKEND}/api/auth/google`}
        method="GET"
        className="mt-10 flex justify-center"
      >
        <div className="flex flex-col items-center gap-4 font-semibold text-slate-600">
          <span>Or</span>
          <button
            type="submit"
            className="flex gap-2 rounded-lg border border-slate-200 px-4 py-2 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300"
          >
            <img
              className="h-6 w-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Continue with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
