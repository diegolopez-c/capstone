import React from "react";
import { Link } from "react-router-dom";
import Datetime from "./Datetime";
import ProfileCard from "./ProfileCard";
import SidebarLink from "./SidebarLink";

export default function DoctorSidebar() {
  return (
    <aside className="min-w-min w-1/4 border border-blue h-screen">
      <div className="h-1/2">
        <Datetime />
        <div className="flex flex-col gap-3 p-4">
          <SidebarLink text="Search Patient" />
          <SidebarLink text="List of Appointments" />
          <SidebarLink text="New Prescription" />
          <SidebarLink text="New Medical Report" />
          <SidebarLink text="New Appointment" />
        </div>
      </div>
      <ProfileCard />
    </aside>
  );
}
