import React from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decrement, increment, removeItem } from "../redux/features/cartSlice";
import { BiChevronLeft } from "react-icons/bi";
import axios from "axios";
axios.defaults.withCredentials = true;
const Cart = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cartSlice);
  const log = useSelector((state) => state.logStatus);
  const checkout = () => {
    axios
      .post(`${baseUrl}/create-checkout-session`, {
        product: data.cartItems,
        quantity: data.quantity,
        user: log.data?.user,
      })
      .then((response) => {
        console.log(response.data);
        window.location.href = response.data.url;
        localStorage.removeItem("cart");
        localStorage.removeItem("quantity");
      });
  };

  if (data.cartItems.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[90vh] md:h-[72vh] text-xl">
          No Product In The Cart
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="h-[80%]">
        <div className="mt-5">
          {data.cartItems.map((item) => (
            <div key={item._id} className="my-2">
              <div className=" container md:w-[600px] mx-auto flex items-center  justify-between border shadow-lg">
                {/* 1 */}
                <div className="p-2">
                  <img src={item.image.filePath} width={70} />
                </div>
                {/* 2 */}
                <div className="flex flex-col items-center">
                  {" "}
                  {/**Wrapper div*/}
                  <h1 className="text-xl font-bold p-2 ">{item.name}</h1>
                  <div className="flex items-center gap-x-2">
                    <button
                      className="bg-gray-300 px-3 py-0.5 rounded text-xl font-bold text-center"
                      onClick={() => {
                        dispatch(decrement(item._id));
                      }}
                    >
                      -
                    </button>
                    <p className="text-xl">{item.quantity}</p>
                    <button
                      className="bg-gray-300 px-3 py-0.5 rounded text-xl font-bold text-center"
                      onClick={() => {
                        dispatch(increment(item._id));
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="my-2 p-2">
                    Price <span>{item.price} $</span>
                  </p>
                </div>
                <div
                  className="text-right mr-4 p-2 hover:cursor-pointer"
                  onClick={() => {
                    dispatch(removeItem(item._id));
                  }}
                >
                  X
                </div>
              </div>
            </div>
          ))}
          <div className="container md:w-[600px] mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">Total</p>
              <p className="text-xl font-bold">{data.totalPrice}$</p>
            </div>
          </div>
          <div className="container md:w-[600px] mx-auto flex justify-end">
            {Object.keys(log.data).length !== 0 ? (
              <button
                className="bg-orange-500 text-white px-4 py-1 rounded my-2"
                onClick={checkout}
              >
                Checkout
              </button>
            ) : (
              <>
                <button
                  className="bg-orange-500 text-white px-4 py-1 rounded my-2"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
