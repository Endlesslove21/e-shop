import React from "react";

const LogoutContext = React.createContext({
  isLogout: true,
  setIsLogout: () => {},
});

export default LogoutContext;
