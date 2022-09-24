import type { NextPage } from "next";
import Layout from "@components/layout";
import Link from "next/link";

const Home: NextPage = (props) => {
  return (
    <Layout haveMenu>
      <>
        <h1>Initial template</h1>
        <ul className="text-lg px-10">
          <li>
            <input type="checkbox" defaultChecked /> Signin page UI
          </li>
          <li>
            <input type="checkbox" defaultChecked /> Login page UI
          </li>
          <li>
            <input type="checkbox" defaultChecked /> API: signin
          </li>
          <li>
            <input type="checkbox" defaultChecked /> API: login
          </li>
          <li>
            <input type="checkbox" defaultChecked /> API: me (verify)
          </li>
          <li>
            <input type="checkbox" defaultChecked /> Register form
          </li>
          <li>
            <input type="checkbox" defaultChecked /> Login form
          </li>
          <li>
            <input type="checkbox" defaultChecked /> Login & Session
          </li>
          <li>
            <input type="checkbox" defaultChecked /> Logout
          </li>
          <li>
            <input type="checkbox" defaultChecked /> useUser
          </li>
        </ul>

        <div>
          <div className="border-b-2 border-solid m-2 p-2 border-slate-500"></div>
          <h3 className="text-2xl font-bold p-4">Private pages</h3>
          <ul className="px-10">
            <li>
              <Link href="/recipes">Recipes</Link>
            </li>
          </ul>
        </div>
      </>
    </Layout>
  );
};

export default Home;
