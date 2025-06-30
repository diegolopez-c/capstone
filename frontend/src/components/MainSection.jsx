import React from "react";

export default function MainSection({ children }) {
  return (
    <div className="w-3/4 flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
