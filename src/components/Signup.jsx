import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/api/user/registerApiSlice";

const Signup = () => {
  const logData = useSelector((state) => state.registerUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(registerUser(data));
  };
  if (logData.data.success) {
    alert("Account Created Successfully, Login Now");
    navigate("/login");
  }
  if (logData.error) {
    alert(logData.error);
  }
  return (
    <form
      className="w-[390px] -500 mx-auto mt-10 md:mt-20  rounded-lg shadow-2xl bg-white"
      onSubmit={handleSubmit}
    >
      <div className="w-[80%] mx-auto">
        <h1 className="text-4xl font-bold text-center my-2 py-3 hover:cursor-pointer">
          Register
        </h1>
        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="Enter Name"
          type="text"
          name="name"
          required
        />
        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="Enter Email"
          type="email"
          name="email"
          required
        />

        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="Enter Password"
          type="password"
          name="password"
          required
        />

        <button className="my-4 bg-orange-500 shadow-lg w-full text-white p-2 rounded-sm">
          {logData.loading ? "Loading..." : " Register"}
        </button>
        <h1 className="w-full text-center font-bold text-gray-400">OR</h1>

        <button
          className="w-full p-3 mt-3 mb-8 shadow-xl text-blue-400"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already Have An Account
        </button>
      </div>
    </form>
  );
};

export default Signup;
