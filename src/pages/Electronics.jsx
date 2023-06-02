import React from "react";
import Layout from "../Layout";
import ProductsByCategory from "../components/ProductsByCategory";

const Electronics = () => {
  return (
    <Layout>
      <ProductsByCategory categoryName={"electronics"} />
    </Layout>
  );
};

export default Electronics;
