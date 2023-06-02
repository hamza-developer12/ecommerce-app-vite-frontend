import React from "react";
import { BiShoppingBag } from "react-icons/bi";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const Navbar = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const productData = useSelector((state) => state.cartSlice);
  const navigate = useNavigate();
  const logoutUser = () => {
    axios.get(`${baseUrl}/api/users/logout`).then((response) => {
      window.location.href = "/";
    });
  };
  const data = useSelector((state) => state.logStatus);
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="w-full bg-gray-100">
        {data.data.success ? (
          <>
            <div className="flex justify-end mx-2 items-center gap-x-1">
              <p>Welcome {data.data?.user?.name}</p>
              <button className="text-orange-500" onClick={logoutUser}>
                Logout
              </button>
              <Link to={"/cart"}>Cart({productData.quantity})</Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-right  mx-2">
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>{" "}
              /{" "}
              <button
                onClick={() => {
                  navigate("/register");
                }}
              >
                Signup
              </button>
              <Link to={"/cart"} className="mx-1">
                Cart({productData.quantity})
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between h-24  shadow-md">
        <div
          className="flex items-center gap-1 text-orange-500  font-bold hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <BiShoppingBag size={28} className="ml-2" />
          <span className="text-xl">H-Shop</span>
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-2 p-2 text-lg">
          <li className="hover:cursor-pointer hover:text-orange-500 duration-300 p-2">
            <Link to={"/"}> Home</Link>
          </li>
          <li className="hover:cursor-pointer hover:text-orange-500 duration-300 p-2">
            <Link to="/electronics">Electronics</Link>
          </li>
          <li className="hover:cursor-pointer hover:text-orange-500 duration-300 p-2">
            <Link to={"/jewellery"}>Jewellery</Link>
          </li>
          <li className="hover:cursor-pointer hover:text-orange-500 duration-300 p-2">
            <Link to={"/clothes"}>Clothes</Link>
          </li>
          <li className="hover:cursor-pointer hover:text-orange-500 duration-300 p-2">
            <Link to={"/cart"}>Cart({productData.quantity})</Link>
          </li>
        </ul>
        {/* Responsive Menu */}
        {toggle ? (
          <AiOutlineClose
            className="mr-2 block md:hidden"
            size={25}
            onClick={() => {
              setToggle(false);
            }}
          />
        ) : (
          <AiOutlineMenu
            className={`mr-2 block md:hidden`}
            size={25}
            onClick={() => {
              setToggle(true);
            }}
          />
        )}

        <ul
          className={`absolute md:hidden flex flex-col gap-2 pt-10 
        top-[120px] ${
          toggle ? "left-[0]" : "left-[-100%]"
        } bg-orange-500 text-white h-screen w-[50%] text-xl pl-5 duration-500`}
        >
          <li className="w-full text-center">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="w-full text-center">
            <Link to={"/electronics"}>Electronics</Link>
          </li>
          <li className="w-full text-center">
            <Link to={"/jewellery"}>Jewellery</Link>
          </li>
          <li className="w-full text-center">
            <Link to={"/clothes"}>Clothes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
