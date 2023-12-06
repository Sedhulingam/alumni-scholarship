// AllDetails.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "./Components/Header/Header";
import HomeButton from "./Components/Filter/HomeButton";
import "./AllDetails.css";

const AllDetails = () => {
  const location = useLocation();
  const record = location.state?.record || {};

  const [sem1Data, setSem1Data] = useState([]);
  const [isSem1Visible, setIsSem1Visible] = useState(false);

  const fetchSem1Data = async (recordId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/sem1/${recordId}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching sem1 data:", errorText);
        return;
      }

      const data = await response.json();

      // Map each object to an array of values
      const transformedData = data.map((item) => {
        const { Reg_no, name, tot_credits, gpa, ...rest } = item;
        return Object.values(rest);
      });
console.log(transformedData);
      setSem1Data(transformedData);
      setIsSem1Visible(true); // Show records after fetching data
    } catch (error) {
      console.error("Error fetching sem1 data:", error);
    }
  };

  const closeSem1Container = () => {
    setIsSem1Visible(false);
  };

  return (
    <div>
      <Header />
      <Link to="/">
        <HomeButton />
      </Link>
      <div className="aligning">
        <Button
          className="sem1-button"
          size="medium"
          variant="contained"
          onClick={() => {
            if (isSem1Visible) {
              closeSem1Container();
            } else {
              fetchSem1Data(record.Reg_no);
              setIsSem1Visible(true);
            }
          }}
        >
          {isSem1Visible ? "Sem1" : "Sem1"}
        </Button>

        {isSem1Visible && (
          <table>
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Credits</th>
                <th>Letter Grade</th>
                <th>Grade</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {sem1Data.map((rowData, rowIndex) => {
                let columnCount = 0;

                return (
                  <tr key={rowIndex}>
                    {rowData.map((value, columnIndex) => {
                      if (
                        columnCount === 6 ||
                        Object.keys(sem1Data[rowIndex])
                          [columnIndex].toLowerCase()
                          .includes("subcode")
                      ) {
                        // Start a new row after 6 columns or when encountering "subcode"
                        columnCount = 0;
                        return <React.Fragment key={`spacer-${columnIndex}`} />;
                      }

                      columnCount++;

                      return <td key={columnIndex}>{value}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllDetails;
