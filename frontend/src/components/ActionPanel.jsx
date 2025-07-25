import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ActionPanel({ message, icon, color, path }) {
  const BORDER_CLASSES = {
    "green-600": "border-green-600",
    "blue-600": "border-blue-600",
    "yellow-600": "border-yellow-600",
    "red-600": "border-red-600",
  };
  const SHADOW_CLASSES = {
    "green-600": "hover:shadow-green-600/60",
    "blue-600": "hover:shadow-blue-600/60",
    "yellow-600": "hover:shadow-yellow-600/60",
    "red-600": "hover:shadow-red-600/60",
  };
  const TEXT_CLASSES = {
    "green-600": "text-green-600",
    "blue-600": "text-blue-600",
    "yellow-600": "text-yellow-600",
    "red-600": "text-red-600",
  };
  const borderClass = BORDER_CLASSES[color] || "border-black";
  const shadowClass = SHADOW_CLASSES[color] || "";
  const textClass = TEXT_CLASSES[color] || "text-black";

  return (
    <Link
      className={`h-full w-1/5 bg-ca-white rounded-xl border-2 ${borderClass} p-1 flex transition-shadow duration-200 hover:shadow-lg ${shadowClass}`}
      to={path}
    >
      <div
        className={`h-full w-3/8 rounded-xl flex items-center justify-center`}
      >
        <i className={`${icon} ${textClass} text-5xl`}></i>
      </div>
      <div
        className={`h-full w-5/8 ${textClass} font-xl flex items-center justify-center text-center`}
      >
        {message}
      </div>
    </Link>
  );
}
