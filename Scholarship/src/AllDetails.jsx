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
      
      const filteredData = data.map(({ Reg_no, name, ...rest }) => rest);

      // Extract keys
      const keys = Object.keys(filteredData[0]);

      // Filter keys based on patterns
      const subCodeKeys = keys.filter((key) => key.includes("subcode"));
      const nameKeys = keys.filter((key) => key.includes("name"));
      const creditsKeys = keys.filter((key) => key.endsWith("c"));
      const lgKeys = keys.filter((key) => key.includes("lg"));
      const gKeys = keys.filter((key) => key.endsWith("g") && !key.includes("lg"));
      const resultKeys = keys.filter((key) => key.endsWith("r"));

      // Map the data to the desired format
      const transformedData = subCodeKeys.map((subCodeKey, index) => ({
        subjectCode: data[0][subCodeKey],
        subject: data[0][nameKeys[index]],
        credits: data[0][creditsKeys[index]],
        letterGrade: data[0][lgKeys[index]],
        grade: data[0][gKeys[index]],
        result: data[0][resultKeys[index]],
      }));

      console.log(transformedData);
      setSem1Data(transformedData);
      setIsSem1Visible(true);
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
                <th>Subject</th>
                <th>Credits</th>
                <th>Letter Grade</th>
                <th>Grade</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {sem1Data.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowData.subjectCode}</td>
                  <td>{rowData.subject}</td>
                  <td>{rowData.credits}</td>
                  <td>{rowData.letterGrade}</td>
                  <td>{rowData.grade}</td>
                  <td>{rowData.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Button
          className="sem1-button"
          size="medium"
          variant="contained">Sem2</Button><Button
          className="sem1-button"
          size="medium"
          variant="contained">Sem3</Button><Button
          className="sem1-button"
          size="medium"
          variant="contained">Sem4</Button><Button
          className="sem1-button"
          size="medium"
          variant="contained">Sem5</Button><Button
          className="sem1-button"
          size="medium"
          variant="contained">Sem6</Button><Button
          className="sem1-button"
          size="medium"
          variant="contained">Sem7</Button><Button
          className="sem1-button"
          size="medium"
          variant="contained">Sem</Button>
      </div>
    </div>
  );
};

export default AllDetails;
