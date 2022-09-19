import { ReactElement } from "react";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => (
  <div className="w-screen h-screen bg-slate-800 flex">{children}</div>
);

export default Layout;
