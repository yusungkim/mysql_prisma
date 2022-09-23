import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";
import { ReactElement } from "react";

interface ButtonProps {
  loading: boolean;
  onClick?: () => void;
  readonly children: ReactElement;
  classes?: string;
  [key: string]: any;
}

const Button = ({
  loading,
  onClick,
  children,
  classes = "",
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cls(
        " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        classes
      )}
      onClick={onClick}
    >
      <div className="flex justify-center items-center relative">
        <div>{children}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={cls(
            "w-6 h-6 -left-10 absolute animate-spin",
            loading ? "" : "hidden"
          )}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    </button>
  );
};

export default Button;
