import React from "react";
import Layout from "../Layout";
import ProductsByCategory from "../components/ProductsByCategory";

const Jewellery = () => {
  return (
    <Layout>
      <ProductsByCategory categoryName={"jewellery"} />
    </Layout>
  );
};

export default Jewellery;
