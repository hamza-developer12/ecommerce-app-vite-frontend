import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/features/cartSlice";
axios.defaults.withCredentials = true;
const ProductsByCategory = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/categories/category/${props.categoryName}`)
      .then((response) => {
        setLoading(false);
        setData(response.data);
      });
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        Loading......
      </div>
    );
  }
  return (
    <div className="my-4 ">
      <h1 className="text-center p-2 font-bold text-3xl my-4 uppercase">
        Latest {props.categoryName} Products
      </h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
        {data?.existingCategory?.products.map((product, index) => (
          <div key={index} className="w-full border rounded-md shadow-lg">
            <div>
              <h1 className="text-2xl p-2 font-bold text-center">
                {product.name}
              </h1>
              <p className="text-center text-orange-500">
                Price <span className="text-black">${product.price}</span>
              </p>
              <div className="w-full">
                <img
                  src={product.image?.filePath}
                  className="mx-auto py-5 h-[330px]"
                />
              </div>
              <div className="flex items-center justify-between mx-2 mb-3">
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                  }}
                >
                  Buy Now
                </button>
                <button
                  className="px-3.5 py-2 border border-orange-500 rounded"
                  onClick={() => {
                    dispatch(addItem(product));
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsByCategory;
