import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser,signInWithGoogle} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔹 Demo accounts
  const demoAccounts = {
    donor: {
      email: "nahians@gmail.com",
      password: "12345678aA@",
    },
    volunteer: {
      email: "saiful@gmail.com",
      password: "12345678aA@",
    },
    admin: {
      email: "admin@bloodx.com",
      password: "12345678aA@",
    },
  };

  const handleLogin = (data) => {
    setError("");
    signInUser(data.email, data.password)
      .then((result) => {
        if (result.user) {
          toast("Login successful");
          navigate(location.state || "/");
        }
      })
      .catch(() => setError("Invalid email and password"));
  };
  const handleGoogleLogin =()=>{
     signInWithGoogle()
     .then((result) => {
        if (result.user) {
          toast("Login successful");
          navigate(location.state || "/");
        }
      })
      .catch(() => setError("Invalid email and password"));
  }

  // 🔹 Demo login handler
  const handleDemoLogin = (role) => {
    const { email, password } = demoAccounts[role];
    setError("");

    signInUser(email, password)
      .then((result) => {
        if (result.user) {
          toast(`Demo login as ${role}`);
          navigate(location.state || "/");
        }
      })
      .catch(() => setError("Demo login failed"));
  };

  return (
    <div>
      <h1 className="text-6xl font-bold text-red-400 text-center my-10">
        Welcome Back <br />
        <span className="text-4xl">Login Now!</span>
      </h1>

      <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-sm shadow-red-100">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-400">Email must requird for login</p>
              )}

              <label className="label">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-400">Password must requird for login</p>
              )}

              {error && (
                <p className="text-red-400">Invalid email and password</p>
              )}

              <button type="submit" className="btn bg-red-600 text-white mt-4">
                Login
              </button>

            </fieldset>
          </form>
          <div>
            <button onClick={handleGoogleLogin} className="btn bg-white w-full text-black border-[#e5e5e5]">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
          </div>

          {/* 🔹 Demo login buttons (ONLY ADDITION) */}
          <div className="divider">OR</div>

          <button
            onClick={() => handleDemoLogin("donor")}
            className="btn btn-outline bg-red-600 text-white w-full mb-2"
          >
            Demo Login as Donor
          </button>

          <button
            onClick={() => handleDemoLogin("volunteer")}
            className="btn btn-outline bg-red-600 text-white w-full mb-2"
          >
            Demo Login as Volunteer
          </button>

          <button
            onClick={() => handleDemoLogin("admin")}
            className="btn btn-outline bg-red-600 text-white w-full"
          >
            Demo Login as Admin
          </button>

          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/authLayout/register">
              <span className="text-red-400 underline">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
