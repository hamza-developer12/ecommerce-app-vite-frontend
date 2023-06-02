import React, { useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleProduct } from "../redux/api/products/singleProduct";
import { BiChevronLeft } from "react-icons/bi";
import { addItem } from "../redux/features/cartSlice";

const SingleProduct = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.singleProduct);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(params.id));
  }, []);
  if (data.loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[72vh] w-full text-lg">
          Loading....
        </div>
      </Layout>
    );
  }
  if (data.error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[72vh] w-full text-lg">
          Product Not Found
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className=" container mx-auto mt-10 ">
        <div className="text-lg font-bold">
          <div
            className="flex items-center hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <BiChevronLeft size={30} />
            <p>Back To Home</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="w-[50%] flex mx-auto">
            <img src={data.product?.product?.image?.filePath} />
          </div>
          <div className="flex flex-col w-full md:w-[50%] gap-y-3 text-center md:text-left">
            <h1 className="text-2xl font-bold">
              {data.product?.product?.name}
            </h1>
            <p className="text-orange-500">
              Price{" "}
              <span className="text-black">
                ${data.product?.product?.price}
              </span>
            </p>
            <p>{data.product?.product?.description}</p>
            <button
              className="bg-orange-500 text-white p-2 rounded m-2"
              onClick={() => {
                dispatch(addItem(data.product.product));
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
