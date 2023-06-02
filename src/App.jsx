import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Electronics from "./pages/Electronics";
import Jewellery from "./pages/Jewellery";
import Clothes from "./pages/Clothes";
import SingleProduct from "./components/SingleProduct";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogStatus } from "./redux/api/user/loginStatusSlice";
import Cart from "./components/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutFail from "./pages/CheckoutFail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const data = useSelector((state) => state.logStatus);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(checkLogStatus());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/jewellery" element={<Jewellery />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          {Object.keys(data.data).length === 0 ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Navigate to={"/"} />} />
              <Route path="/register" element={<Navigate to={"/"} />} />
            </>
          )}
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/checkout-fail" element={<CheckoutFail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
