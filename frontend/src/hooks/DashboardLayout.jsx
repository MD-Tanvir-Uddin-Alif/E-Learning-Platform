import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#FAF3E1] overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;