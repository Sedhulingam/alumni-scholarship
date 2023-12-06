// AllDetails.jsx
import HomeButton from "./Components/Filter/HomeButton";
import Header from "./Components/Header/Header";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Add useLocation
import Button from "@mui/material/Button";
import "./AllDetails.css";

const AllDetails = () => {
  // const { regNo } = useParams();
  const location = useLocation();
  const record = location.state?.record || {};

  // Ensure record.Reg_No is defined
  const recordId = record.Reg_no;
  console.log(recordId);
  console.log(typeof recordId);
  const fetchSem1Data = async (recordId) => {
    try {
      const response = await fetch(`/api/sem1/${recordId}`);
      console.log("Full Response:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching sem1 data:", errorText);
        return;
      }

      const data = await response.json();
      console.log("Sem1 Data:", data);
    } catch (error) {
      console.error("Error fetching sem1 data:", error);
    }
  };

  return (
    <div>
      <Header />
      <Link to="/">
        <HomeButton />
      </Link>
      <p>{recordId}</p>

      <div className="aligning">
        <Button
          className="sem1-button"
          size="medium"
          variant="elevated"
          onClick={() => fetchSem1Data(recordId)}
        >
          sem1
        </Button>
        <Button
          className="sem1-button"
          disabled={false}
          size="medium"
          variant="elevated"
        >
          sem2
        </Button>
        <Button
          className="sem1-button"
          disabled={false}
          size="medium"
          variant="elevated"
        >
          sem3
        </Button>
        <Button
          className="sem1-button"
          disabled={false}
          size="medium"
          variant="elevated"
        >
          sem4
        </Button>
        <Button
          className="sem1-button"
          disabled={false}
          size="medium"
          variant="elevated"
        >
          sem5
        </Button>
        <Button
          className="sem1-button"
          disabled={false}
          size="medium"
          variant="elevated"
        >
          sem6
        </Button>
        <Button
          className="sem1-button"
          disabled={false}
          size="medium"
          variant="elevated"
        >
          sem7
        </Button>
        <Button
          className="sem1-button"
          disabled={false}
          size="medium"
          variant="elevated"
        >
          sem8
        </Button>
      </div>
    </div>
  );
};

export default AllDetails;
