import React from "react";
import { Link } from "react-router-dom";

export default function SidebarLink({ path, text }) {
  return (
    <Link className="hover:text-gray-300" to={path}>
      {text}
    </Link>
  );
}
