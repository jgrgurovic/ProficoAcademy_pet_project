"use client";

import Api from "@/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// This can now be done with server actions:
// https://codevoweb.com/learn-nextjs-server-actions-and-mutations-with-examples/

// For the sake of HTTP requests demonstration, we will do a traditional fetch -> response approach

const changeEventHandlerFactory =
  (setter: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState<"success" | "error">();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/profile");
    }
  }, [router]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const tokenPayload = await Api.getInstance.login({
        email,
        password,
      });

      const token = tokenPayload.token;

      localStorage.setItem("token", token);
      setLoginStatus("success");

      // Redirect the user to the dashboard
      // We can't use the router here since we are on the client side
      // We will use the window object to redirect the user
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoginStatus("error");
    }
  };

  return (
<section className="backdrop-blur-md ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-opacity-80 backdrop-blur-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  style={{outline: "none" }}
                  className="bg-gray-50 border border-gray-300 text-gray-900  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={changeEventHandlerFactory(setEmail)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={changeEventHandlerFactory(setPassword)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  style={{outline: "none" }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                disabled={loginStatus === "success"}
                type="submit"
                className="w-full text-white bg-mainRed hover:scale-105 focus:outline-none ont-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {loginStatus === "success"
                  ? "Success! Redirecting..."
                  : "Sign in"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do not have an account yet?
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;