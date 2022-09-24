import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Recipes: NextPage = () => {
  const router = useRouter()
  const { user, loading } = useUser(true);

  console.log("router.locale: ", router.locale)
  return (
    <Layout haveMenu canGoBack>
      {loading ? <div>loading...</div> : <h1>Recipes</h1>}
    </Layout>
  );
};

export default Recipes;
