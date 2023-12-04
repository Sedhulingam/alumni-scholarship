import React from "react";
import Header from "./Components/Header/Header";
import HomeButton from "./Components/Filter/HomeButton";
import { Link } from "react-router-dom";
import ElementAdd from "./Components/Filter/ElementAdd";
import AddElement from "./Components/Filter/AddElement";
import BulkButton from "./Components/Filter/BulkButton";


function NewPage() {
  return (
    <div>
      <Header />
      <Link to="/">
        <HomeButton />
      </Link>
      <BulkButton />
      {/* <ElementAdd /> */}
      <AddElement />
    </div>
  );
}

export default NewPage;
