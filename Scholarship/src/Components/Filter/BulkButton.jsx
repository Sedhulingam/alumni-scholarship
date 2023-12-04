import React, { useState } from "react";
import "./BulkButton.css";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BulkButton() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [excelFile, setExcelFIle] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const history = useNavigate();

  // submit state
  const [excelData, setExcelData] = useState(null);

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFIle(e.target.result);
        };
      } else {
        setTypeError("Please select only Excel Format");
        setExcelFIle(null);
      }
    } else {
      console.log("Please select the file!");
    }
  };

  const notifySuccess = () => {
    toast.success("😊 Inserted Successfully!!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const notifyError = () => {
    toast.error("😢 Insert Failed. Please try again.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const downloadTemplate = () => {
    // Define the column names
    const columns = [
      "Reg_no",
      "Name",
      "Programme",
      "Degree",
      "Branch",
      "Semester",
      "Father_Name",
      "Mother_Name",
      "tenth_Mark",
      "twelveth_Mark",
      "Diploma",
      "Gender",
      "Physically_challenged",
      "Mobile_No",
      "Personal_Mail_id",
      "Address",
      "First_Graduate",
      "Scholarship_Availed",
      "Scholarship_Name",
      "Scholarship_Amount",
      "GCT_mail_id",
      "Annual_Income",
      "Aadhar_no",
      "gpa1",
      "gpa2",
      "gpa3",
      "gpa4",
      "gpa5",
      "gpa6",
      "gpa7",
      "gpa8",
      "Cgpa",
      "Attendance",
    ];

    // Create an array with an empty object representing a row of data
    const data = [{}];

    // Create a worksheet with the specified column names and data
    const ws = XLSX.utils.json_to_sheet(data, { header: columns });

    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "template.xlsx");
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      // Update the endpoint to your actual backend endpoint for bulk inserts
      const endpoint = "http://localhost:8081/alumini/bulk";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // Data successfully added
          console.log("Data successfully added");
          setExcelData(data);
          notifySuccess();
          setTimeout(() => {
            history("/");
          }, 3000);
        } else {
          console.error("Failed to add data:", response.statusText);
          notifyError();
        }
      } catch (error) {
        console.error("Error:", error);
        notifyError();
      }
    }
  };

  return (
    <div className="filter-button-containerss">
      <button className="filter-button" onClick={togglePopup}>
        Bulk Upload
      </button>
      <div className={`popup ${isPopupVisible ? "show" : ""}`}>
        <div className="popup-content">
          <img
            src="src/Images/x-circle-fill.svg"
            className="close"
            alt="1"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
            onClick={togglePopup}
          />
          <div className="row1">
            <img
              src="src/Images/1-circle-fill.svg"
              alt="1"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            <h5>Download the Template here</h5>
          </div>
          <br />
          <button className="filter-buttons" onClick={downloadTemplate}>
            Download
          </button>
          
          <div className="row1">
            <img
              src="src/Images/2-circle-fill.svg"
              alt="1"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            <h5>Upload the Document below</h5>
          </div>
          <br />
          <form action="" className="form-group" onSubmit={handleFileSubmit}>
            <input
              type="file"
              className="form-control"
              required
              onChange={handleFile}
            />
            <br />
            <button className="filter-buttons-form">Upload</button>
            {typeError && (
              <div className="alert alert-danger alert-textr" role="alert">
                {typeError}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default BulkButton;
