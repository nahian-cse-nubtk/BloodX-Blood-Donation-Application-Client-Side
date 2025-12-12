import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { CgProfile } from "react-icons/cg";
import { RiDashboard3Line } from "react-icons/ri";
import useRole from '../../hooks/useRole/useRole';
import { IoGitPullRequest } from "react-icons/io5";
import { ToastContainer } from 'react-toastify';
import { TbGitPullRequestDraft } from "react-icons/tb";
import { FaUsers } from 'react-icons/fa';
import { LuGitPullRequestCreateArrow } from "react-icons/lu";

const DashboardLayout = () => {
    const {userInfo} =useRole()
    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-red-500 text-white">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square bg-red-500 text-white btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4 text-white font-bold text-2xl">{userInfo.role} Dashboard</div>
    </nav>
    {/* Page content here */}

    <Outlet></Outlet>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow bg-red-500 text-white">
        {/* List item */}
        <li>
          <NavLink to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashbaord">
            {/* profile icon */}
            <RiDashboard3Line />
            <span className="is-drawer-close:hidden">Dashboard</span>
          </NavLink>
        </li>

        {/* List item */}
        <li>
          <NavLink to='/dashboard/profile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
            {/* profile icon */}
            <CgProfile />
            <span className="is-drawer-close:hidden">Profile</span>
          </NavLink>
        </li>
        {/* Doner specific links */}

            <li>
          <NavLink to='/dashboard/createDonationRequest' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Create dontaion request">
            {/* profile icon */}
            <IoGitPullRequest />
            <span className="is-drawer-close:hidden">Create dontaion request</span>
          </NavLink>
        </li>
            <li>
          <NavLink to='/dashboard/myDonationRequest' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My dontaion request">
            {/* profile icon */}
            <TbGitPullRequestDraft />
            <span className="is-drawer-close:hidden">My dontaion request</span>
          </NavLink>
        </li>
            
        {
            userInfo.role==='Admin'&&<>
            <li>
                <NavLink to='/dashboard/allUsers' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Users">
            {/* profile icon */}
            <FaUsers />
            <span className="is-drawer-close:hidden">All Users</span>
          </NavLink>
            </li>
            <li>
            <NavLink to='/dashboard/allDonationRequests' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Donation Requests">

            <LuGitPullRequestCreateArrow />
            <span className="is-drawer-close:hidden">All Donation Request</span>
          </NavLink>
            </li>
            </>
        }
        {
            userInfo.role==='Volunteer'&&<>
            <li>
            <NavLink to='/dashboard/allRequests' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Blood Donation Requests">

            <LuGitPullRequestCreateArrow />
            <span className="is-drawer-close:hidden">All Blood Donation Request</span>
          </NavLink>
            </li>
            </>
        }
      </ul>
    </div>
  </div>
  <ToastContainer></ToastContainer>
</div>
    );
};

export default DashboardLayout;