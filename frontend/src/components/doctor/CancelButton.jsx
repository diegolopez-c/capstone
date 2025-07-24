import { Button } from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CancelButton() {
  const navigate = useNavigate();

  return (
    <Button
      color="danger"
      onPress={() => {
        navigate("/doctor-dashboard");
      }}
    >
      Cancel
    </Button>
  );
}
