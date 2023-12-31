import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { useResetPasswordMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";


const initialState = {
    password: "",
    password2: "",
}

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const {password, password2} = formData;

 
  const navigate = useNavigate();

  const [reset, { isLoading }] = useResetPasswordMutation();

  
 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
   
  const { resetToken } = useParams();
  console.log(resetToken)

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!resetToken) {
        return toast.error("Reset token is not available");
      }

    if (password.length < 6) {
        return toast.error("Passwords must be up to 6 characters");
      }
      if (password !== password2) {
        return toast.error("Passwords do not match");
      }
  
      const userData = {
        password,
        password2,
        resetToken
      };
    try {
      const res = await reset({userData, resetToken });
      console.log(res);
      navigate("/login");
      toast.success("Password reset successful");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
        
           

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter password"
                value={password}
                name="password"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter password"
                value={password2}
                onChange={handleInputChange}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Reseting password..." : "Reset Password"}
            </button>{" "}
            <Link className="text-pink-500" to="/forgotpassword">Forgot Password</Link>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={"/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
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

export default ResetPassword;
