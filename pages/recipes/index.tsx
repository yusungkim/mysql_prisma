import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";

const Recipes: NextPage = () => {
  const { user, loading } = useUser(true);

  return (
    <Layout haveMenu canGoBack>
      {loading ? <div>loading...</div> : <h1>Recipes</h1>}
    </Layout>
  );
};

export default Recipes;
