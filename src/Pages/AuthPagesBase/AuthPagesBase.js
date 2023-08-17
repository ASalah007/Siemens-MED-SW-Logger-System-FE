import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchUserData } from "../../Services/authServices";
import UserContext from "../../Contexts/UserContext";

export default function AuthPageBase() {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchUserData().then((data) => setUser(data));
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Outlet />
    </UserContext.Provider>
  );
}
