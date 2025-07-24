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
            text="Appointment History List"
            path="/doctor-appointments"
          />
          <SidebarLink text="New Medical Report" path="/new-medical-report" />
          <SidebarLink text="New Prescription" path="/new-prescription" />
          <SidebarLink text="New Symptom" path="/new-symptom" />
          <SidebarLink
            text="New Symptom/Medicine Interaction"
            path="/new-interaction"
          />
          <SidebarLink
            text="New Medicine/Medicine Interaction"
            path="/new-medicine-interaction"
          />
        </div>
      </div>
      <ProfileCard />
    </aside>
  );
}
