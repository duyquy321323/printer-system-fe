import React from "react";
import NavBar from "../navbar";
import PrinterManagement from "./PrinterManagement";

const Admin = () => {
  return (
    <>
      <NavBar />
      {/* Routes tới 2 cái ở dưới */}
      <PrinterManagement />
      {/* <UserManagement /> */}
    </>
  );
};

export default Admin;
