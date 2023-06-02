import React from "react";
import Layout from "../Layout";
import ProductsByCategory from "../components/ProductsByCategory";

const Home = () => {
  const categories = ["clothes", "jewellery", "electronics"];
  return (
    <Layout>
      <div>
        {categories.map((category, index) => {
          return <ProductsByCategory categoryName={category} key={index} />;
        })}
      </div>
    </Layout>
  );
};

export default Home;
