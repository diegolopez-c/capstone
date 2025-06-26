import React from "react";
import { Link } from "react-router-dom";
import Datetime from "./Datetime";
import ProfileCard from "./ProfileCard";

export default function DoctorSidebar() {
  return (
    <aside className="min-w-min w-1/4 border border-blue h-screen">
      <div className="h-1/2">
        <Datetime />
        <div className="flex flex-col gap-3 p-4">
          <Link>Search Pacient</Link>
          <Link>List of Appointments</Link>
          <Link>New Prescription</Link>
          <Link>New Medical Report</Link>
          <Link>New Appointment</Link>
        </div>
      </div>
      <ProfileCard />
    </aside>
  );
}
