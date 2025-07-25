import Datetime from "../Datetime";
import ProfileCard from "../ProfileCard";
import SidebarLink from "../SidebarLink";

export default function PatientSidebar() {
  return (
    <aside className="min-w-min w-1/4 h-screen bg-ca-light-black">
      <div className="h-1/2">
        <Datetime />
        <div className="flex flex-col gap-3 p-4">
          <SidebarLink text="Home" path="/patient-dashboard" />
          <SidebarLink
            text="Make New Appointment"
            path="/patient-new-appointment"
          />
          <SidebarLink text="My Appointments" path="/patient-appointments" />
          <SidebarLink text="My Medical History" path="/patient-history" />
          <SidebarLink text="My Prescriptions" path="/patient-prescriptions" />
        </div>
      </div>
      <ProfileCard />
    </aside>
  );
}
