import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

interface LayoutProps {
  canGoBack?: boolean;
  haveMenu?: boolean;
  readonly children: ReactElement;
}

const Layout = ({
  canGoBack = false,
  children,
  haveMenu = false,
}: LayoutProps) => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className="w-screen h-screen bg-theme-black text-theme-beige flex justify-center py-5">
      {canGoBack ? (
        <button onClick={onClick} className="absolute left-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
      ) : null}
      <div className="max-w-screen-2xl w-full md:w-768 bg-black bg-opacity-90">
        {haveMenu ? (
          <div className="flex gap-5 justify-end p-5  bg-theme-orange font-bold">
            <Link href="/login">Login</Link>
            <Link href="/signin">Signin</Link>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default Layout;
