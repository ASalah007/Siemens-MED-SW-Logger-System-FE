import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { fetchUserData } from "../../Services/authServices";
import UserContext from "../../Contexts/UserContext";

export default function AuthPageBase() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // useEffect(() => {
  //   fetchUserData()
  //     .then((data) => setUser(data))
  //     .catch((err) => navigate("/login"));
  // }, []);
  console.log(user);

  return (
    <UserContext.Provider value={user}>
      <Outlet />
    </UserContext.Provider>
  );
}
