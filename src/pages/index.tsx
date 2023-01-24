import Layout from "@Component/Layout/Layout";
import GlobalStateContext from "@Store/Context";
import { SET_LOADING } from "@Store/constants";
import React, { useContext, useEffect } from "react";
export default function Home() {
  useEffect(() => {
    handleLoading(false);
  }, []);

  const [state, dispatch] = useContext(GlobalStateContext);
  const handleLoading = (isLoading: boolean) => {
    dispatch({
      type: SET_LOADING,
      data: isLoading,
    });
  };
  return (
    <>
      <Layout>
        <div>dasdas</div>
      </Layout>
    </>
  );
}
