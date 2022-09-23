import type { NextPage } from "next";
import Layout from "@components/layout";

const Home: NextPage = (props) => {
  return (
    <Layout haveMenu>
      <>
        <h2 className="text-3xl font-bold p-5">Initial template</h2>
        <ul className="text-lg px-10">
          <li><input type="checkbox" defaultChecked /> Signin page UI</li>
          <li><input type="checkbox" defaultChecked /> Login page UI</li>
          <li><input type="checkbox" defaultChecked /> API: signin</li>
          <li><input type="checkbox" defaultChecked /> API: login</li>
          <li><input type="checkbox" defaultChecked /> API: me (verify)</li>
          <li><input type="checkbox" defaultChecked /> Register form</li>
          <li><input type="checkbox" defaultChecked /> Login form</li>
          <li><input type="checkbox" defaultChecked /> Login & Session</li>
          <li><input type="checkbox" defaultChecked /> Logout</li>
          <li><input type="checkbox" /> useUser</li>
        </ul>
      </>
    </Layout>
  );
};

export default Home;
