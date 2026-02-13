import React from "react";
import { Signup as SignupComponent } from "../components";

function Signup() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <SignupComponent />
    </div>
  );
}

export default Signup;