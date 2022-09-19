import type { NextPage } from "next";
import Layout from "@components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <h2 className="text-lg">Initial template</h2>
        <ul>
          <li>Login Input UI</li>
          <li>api for register & login</li>
          <li></li>
        </ul>
      </>
    </Layout>
  );
};

export default Home;
