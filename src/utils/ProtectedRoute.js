import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import store from "src/store";
  
const ProtectedRoute = ({  
  children 
}) => {
  const location = useLocation()
  const token = store.getState().token.accessToken

  if (token === null || token === undefined || token === "") {
    alert("로그인 후 이용해주세요")
    return <Navigate to={`/LogIn?q=${location.pathname.replace("/", "")}`}></Navigate>
  }
  return children ? children : <Outlet />
}
  
export default ProtectedRoute