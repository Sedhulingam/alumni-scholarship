import React from "react";
import "./AddIcon.css";
import { Fab } from "@mui/material";
import { IoMdAdd } from "react-icons/io";

function AddButton() {
  return (
    <div className="filter-button-container">
      {/* <button className="filter-button">Add</button> */}
      <Fab className="fab-add" color="primary" aria-label="add" sx={{fontSize: '30px'}}>
        <IoMdAdd/>
      </Fab>
    </div>
  );
}

export default AddButton;
