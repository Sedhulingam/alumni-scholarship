import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <a href="https://gct.ac.in/">
          <img src="src/Images/gct_logo.png" alt="GCT" />
        </a>
        <h6>Government College of Technology <br />Alumni Scholarship</h6>
      </div>
      {/* <div className="header-center">
        <h1>GCT Alumni Scholarship</h1>
      </div> */}
      <div className="header-right">
        <a href="https://www.gctalumni.org.in/">
          <img src="src/Images/GCTAA.jpg" alt="Right Image" />
        </a>
      </div>
    </header>
  );
}

export default Header;
