import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

import gctLogo from "../../Images/gct_logo.png";
import gctAAImage from "../../Images/GCTAA.jpg";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <a href="https://gct.ac.in/">
          <img src={gctLogo} alt="GCT" />
        </a>
        <h6>
          Government College of Technology <br />
          Alumni Scholarship
        </h6>
      </div>
      {/* <div className="header-center">
        <h1>GCT Alumni Scholarship</h1>
      </div> */}
      <div className="header-right">
        <a href="https://www.gctalumni.org.in/">
          <img src={gctAAImage} alt="Right Image" />
        </a>
      </div>
    </header>
  );
}

export default Header;
