import Datetime from "../Datetime";
import ProfileCard from "../ProfileCard";
import SidebarLink from "../SidebarLink";

export default function PharmacistSidebar() {
  return (
    <aside className="min-w-min w-1/4 border border-blue h-screen">
      <div className="h-1/2">
        <Datetime />
        <div className="flex flex-col gap-3 p-4">
          <SidebarLink
            text="Pharmacist Dashboard"
            path="/pharmacist-dashboard"
          />
          <SidebarLink
            text="Dispatch Prescription"
            path="/dispatch-prescription"
          />
          <SidebarLink
            text="Register / Change Inventory"
            path="/medicine-inventory"
          />
          <SidebarLink
            text="Prescriptions History"
            path="/prescription-history"
          />
          <SidebarLink
            text="Close To Expiration Medicine"
            path="/expiration-medicine"
          />
        </div>
      </div>
      <ProfileCard />
    </aside>
  );
}
