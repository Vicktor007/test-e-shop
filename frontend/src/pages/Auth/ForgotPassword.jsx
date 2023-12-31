import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useForgotPasswordMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import validateEmail from "../../Utils/validateEmail";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");


  
  const navigate = useNavigate();

  const [send, { isLoading }] = useForgotPasswordMutation();




  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
        return toast.error("Please enter an email");
      }
  
      if (!validateEmail(email)) {
        return toast.error("Please enter a valid email");
      }
    try {
      const res = await send({ email }).unwrap();
      console.log(res);
      toast.success("Reset Email Sent")
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Sending Reset Email...." : "Send Reset Email"}
            </button>{" "}
            <Link className="text-pink-500" to="/login">Login</Link>

            {isLoading && <Loader />}
          </form>

          
        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section>
    </div>
  );
};

export default ForgotPassword;
