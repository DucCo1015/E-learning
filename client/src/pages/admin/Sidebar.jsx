import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex">
      <div className=" my-23 hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r-gray-300 darK:border-gray-700 bg-[#f0f0f0] p-5 sticky h-screen top-0">
        <div className="space-y-4 mt-[90px]">
          <Link to={"dashboard"} className="flex items-center gap-3">
            <ChartNoAxesColumn size={22} />
            <h1 className="">Dashboard</h1>
          </Link>
          <Link to={"course"} className="flex items-center gap-3">
            <SquareLibrary size={22} />
            <h1 className="">Course</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 md:mt-24 ml-5 p-2 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;