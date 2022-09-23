import type { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { LoginResponse } from "@api/users/login";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@components/button";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: NextPage = (props) => {
  const router = useRouter()
  const { handleSubmit, register } = useForm<LoginFormData>();
  const [login, { data, loading, error }] = useMutation<
    LoginFormData,
    LoginResponse
  >("/api/users/login");

  const onValid = (formData: LoginFormData) => {
    if (!loading) {
      login(formData);
    }
  };

  useEffect(() => {
    if (data && data.ok) {
      console.log("User logged in ");
      router.push("/")
    }
  }, [data, router]);

  console.log("data: ", data);
  console.log("error: ", error);

  return (
    <Layout canGoBack>
      <>
        <h2 className="text-3xl font-bold p-5">Login</h2>

        <div className="flex justify-center items-center h-full">
          <form
            onSubmit={handleSubmit(onValid)}
            className="w-1/2 border-2 border-slate-300 border-opacity-20 bg-slate-400 bg-opacity-20 p-10 rounded-md"
          >
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
            <div className="mt-10">
              {data && !data.ok && data.message && (
                <p className="text-red-500 text-center">{data.message}</p>
              )}
              <Button type="submit" loading={loading}><>{loading ? "Submitting ..." : "Login"}</></Button>
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default Login;
