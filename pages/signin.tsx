import type { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { SigninResponse } from "@api/users/signin";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface SigninFormData {
  nickname?: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

const Signin: NextPage = (props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors: formErrors },
  } = useForm<SigninFormData>();
  const [signin, { data, loading }] = useMutation<
    SigninFormData,
    SigninResponse
  >("/api/users/signin");

  const onValid = (formData: SigninFormData) => {
    if (!formData.agreement) {
      setError("agreement", {
        message: "Please agree to the terms and conditions",
      });
    }
    if (formData.password !== formData.confirmPassword) {
      setError("password", {
        message: "Passwords do not match.",
      });
    }
    if (!loading) {
      signin(formData);
    }
  };

  useEffect(() => {
    if (data && data.ok) {
      console.log("User created successfully");
      router.replace("/login")
    }
  }, [data, router]);

  return (
    <Layout canGoBack>
      <>
        <h1>Signin</h1>

        <div className="flex justify-center items-center h-full">
          <form
            onSubmit={handleSubmit(onValid)}
            className="border-2 border-slate-300 border-opacity-20 bg-slate-400 bg-opacity-20 p-10 rounded-md"
          >
            <div className="mb-6">
              <label
                htmlFor="nickname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Nickname
              </label>
              <input
                type="text"
                id="nickname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="shootingstar"
              />
            </div>
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
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="agreement"
                  type="checkbox"
                  {...register("agreement", { required: true })}
                  className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="agreement"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>
            <div className="mt-5">
              {formErrors?.password && (
                <div className="text-red-500">
                  {formErrors.password?.message}
                </div>
              )}
              {formErrors?.agreement && (
                <div className="text-red-500">
                  {formErrors.agreement?.message}
                </div>
              )}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? "Signing in ..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default Signin;
