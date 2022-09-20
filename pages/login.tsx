import type { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";

interface LoginFormData {
  nickname?: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

const Login: NextPage = () => {
  const { handleSubmit, register } = useForm<LoginFormData>();

  const onValid = (formData: LoginFormData) => {
    console.log(formData);
  };

  return (
    <Layout canGoBack>
      <>
        <h2 className="text-3xl font-bold p-5">Login</h2>

        <div className="flex justify-center items-center h-full">
          <form onSubmit={handleSubmit(onValid)} className="w-1/2 border-2 border-slate-300 border-opacity-20 bg-slate-400 bg-opacity-20 p-10 rounded-md">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true, minLength: 5 })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="password"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default Login;
