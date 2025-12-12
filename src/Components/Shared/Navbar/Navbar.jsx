import React from "react";
import { NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth/useAuth";
import { Link } from "react-router";
import { toast } from "react-toastify";
import logo from "/Logo.png";
import { IoSearch } from "react-icons/io5";
import Loading from "../../Loading/Loading";
import profileImage from '/profile.png'
const Navbar = () => {
  const { user, signOutUser, loading } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }
  const links = (
    <>
      <li className="hover:bg-red-500">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="hover:bg-red-500">
        <NavLink to="/requests">All Request</NavLink>
      </li>
      <li className="hover:bg-red-500">
        <NavLink to="/searchDonor">
          <IoSearch />
          Search Donor
        </NavLink>
      </li>
      <li className="hover:bg-red-500">
        <NavLink to="/donateFund">

          Donate Fund
        </NavLink>
      </li>

    </>
  );
  const handleSignOut = () => {
    signOutUser().then(() => {
      toast("SignOut successfull");
    });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm md:px-7">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-red-500 text-white font-bold rounded-box z-1 mt-3 w-52 p-2 shadow "
          >
            {links}
          </ul>
        </div>
        {/* logo here */}
        <img src={logo} alt="BloodX Logo" className="h-[70px]" />
        <div></div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 ">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                <div className="avatar">
              <div className="mask rounded-full border-3 h-12 w-12 ">
                <img
                  src={user.photoURL?user.photoURL:profileImage}
                  alt="Profile Image" />

              </div>
            </div>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-red-600 text-white font-bold rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Link className="btn bg-red-500 text-white mr-3" to="/authLayout">
              Login
            </Link>
            <Link className="btn bg-red-500 text-white" to="/authLayout/register">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
