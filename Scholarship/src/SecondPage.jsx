// SecondPage.js
import React from "react";
import Header from "./Components/Header/Header";
import HomeButton from "./Components/Filter/HomeButton";
import { Link, useLocation } from "react-router-dom"; // Add useLocation

import EditForm from "./Components/Filter/EditForm";

function SecondPage() {
  const location = useLocation();
  const record = location.state?.record || {};

  // Ensure record.Reg_No is defined
  const recordId = record.Reg_no;

  return (
    <div>
      <Header />
      <Link to="/">
        <HomeButton />
      </Link>

      {Object.keys(record).length > 0 && <EditForm recordId={recordId} />}
    </div>
  );
}
export default SecondPage;
