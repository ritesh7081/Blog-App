import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      window.location.reload();
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 text-sm font-medium rounded-lg 
      border border-gray-300 text-gray-700 cursor-pointer
      hover:bg-red-50 hover:text-red-600 hover:border-red-300
      transition-all duration-300
      dark:border-gray-600 dark:text-gray-300 
      dark:hover:bg-red-900/30 dark:hover:text-red-400"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;