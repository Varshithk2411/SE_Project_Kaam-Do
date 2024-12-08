import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom"; // Make sure to import Navigate
import { Office } from "../assets";
import SignUp from "../components/SignUp"; // Adjusted import to not use curly braces

const Auth = () => {
  const user = useSelector((state) => state.user.user); // Destructure directly from user
  const [open, setOpen] = useState(true);
  const location = useLocation();

  // Set redirect path, default to home if no path is found
  let from = location?.state?.from?.pathname || "/";

  // If user is already logged in, redirect to the path from which they came
  if (user?.token) {
    return <Navigate to={from} replace />; // Use <Navigate> instead of window.location.replace
  }

  return (
    <div className='w-full'>
      <img src={Office} alt='Office' className='object-contain' />
      <SignUp open={open} setOpen={setOpen} />
    </div>
  );
};

export default Auth;
