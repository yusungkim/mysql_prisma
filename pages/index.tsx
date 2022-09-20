import type { NextPage } from "next";
import Layout from "@components/layout";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout haveMenu>
      <>
        <h2 className="text-3xl font-bold p-5">Initial template</h2>
        <ul className="text-lg px-10">
          <li>Signin page UI</li>
          <li>Login page UI</li>
          <li>API: register</li>
          <li>API: login</li>
          <li>API: me (verify)</li>
          <li>Register form</li>
          <li>Login form</li>
          <li>Login & Session</li>
          <li>useUser</li>
        </ul>
      </>
    </Layout>
  );
};

export default Home;
