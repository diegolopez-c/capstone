import Datetime from "../Datetime";
import ProfileCard from "../ProfileCard";
import SidebarLink from "../SidebarLink";

export default function DoctorSidebar() {
  return (
    <aside className="min-w-min w-1/4 h-screen bg-ca-light-black">
      <div className="h-1/2">
        <Datetime />
        <div className="flex flex-col gap-3 p-4">
          <SidebarLink text="Doctor Dashboard" path="/doctor-dashboard" />
          <SidebarLink
            text="List of Appointments"
            path="/doctor-appointments"
          />
          <SidebarLink text="New Prescription" path="/new-prescription" />
          <SidebarLink text="New Medical Report" path="/new-medical-report" />
          <SidebarLink text="New Symptom" path="/new-symptom" />
        </div>
      </div>
      <ProfileCard />
    </aside>
  );
}
