import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const CheckoutSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="flex items-center">
        <AiFillCheckCircle size={60} className="text-green-500" />
        <h1 className="text-xl font-bold mx-2">Checkout Successfull</h1>
      </div>

      <div className="flex flex-col mt-2">
        <button
          className="bg-orange-500 text-white px-4 py-1"
          onClick={() => {
            navigate("/");
          }}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
