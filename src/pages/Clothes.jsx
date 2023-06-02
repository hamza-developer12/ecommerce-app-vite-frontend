import React from "react";
import Layout from "../Layout";
import ProductsByCategory from "../components/ProductsByCategory";

const Clothes = () => {
  return (
    <Layout>
      <ProductsByCategory categoryName={"clothes"} />
    </Layout>
  );
};

export default Clothes;
