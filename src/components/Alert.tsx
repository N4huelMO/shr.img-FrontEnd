import { useAppContext } from "@/context/AppProvider";
import React from "react";

const Alert = () => {
  const { alert } = useAppContext();

  return (
    <div className="absolute top-16 sm:top-24 left-2 right-2 sm:left-0 sm:right-0 mx-auto max-w-max">
      <p className="text-center bg-red-500/75 py-2 px-3">{alert.msg}</p>
    </div>
  );
};

export default Alert;
