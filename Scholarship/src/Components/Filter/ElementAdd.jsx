import React, { useState } from "react";
import "./ElementAdd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuItem, TextField } from "@mui/material";

function ElementAdd() {
  const [formData, setFormData] = useState({
    Reg_No: "",
    Name: "",
    Programme: "",
    Degree: "",
    Branch: "",
    Current_Semester: "",
    Father_Name: "",
    Mother_Name: "",
    Tenth_Mark: "",
    Twelveth_Mark: "",
    Diploma: "",
    Gender: "",
    Community:"",
    Physically_Challenged: "",
    Mobile_No: "",
    Personal_Mail_Id: "",
    Address: "",
    First_Graduate: "",
    Scholarship_Availed: "",
    Scholarship_Name: "",
    Scholarship_Amount: "",
    GCT_Mail_Id: "",
    Annual_Income: "",
    Aadhar_No: "",
    gpa1: "",
    gpa2: "",
    gpa3: "",
    gpa4: "",
    gpa5: "",
    gpa6: "",
    gpa7: "",
    gpa8: "",
    Cgpa: "",
    Attendance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Current_Semester") {
      const semesterValue = parseInt(value, 10);
      for (let i = 1; i <= 8; i++) {
        const isRequired = i <= semesterValue;
        setFormData((prevData) => ({
          ...prevData,
          [`gpa${i}`]: isRequired ? prevData[`gpa${i}`] : "",
        }));
      }
    }

    console.log(formData)

    if (name.startsWith("gpa")) {
      // Validate GPA input
      const gpaRegex = /^(10(\.0{1,3})?|[0-9](\.\d{1,3})?)$/; // Allows values from 0 to 10 with up to 3 decimal places

      if (gpaRegex.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "Scholarship_Availed" && value === "NO") {
      setFormData({
        ...formData,
        Scholarship_Availed: value,
        Scholarship_Name: "",
        Scholarship_Amount: "",
      });
    } else if (name === "Scholarship_Amount") {
      // Validate Scholarship_Amount input
      const scholarshipAmountRegex = /^\d+(\.\d{1,3})?$/; // Allows numbers with up to 3 decimal places

      if (scholarshipAmountRegex.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "Gender") {
      // For select inputs, directly update the value in the state
      setFormData({ ...formData, [name]: value });
    }
  };

  const notifySuccess = () => {
    toast.success("😊 Inserted Successfully!!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifyError = () => {
    toast.error("😢 Insert Failed. Please try again.", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/alumini", formData)
      .then((res) => {
        console.log(res);
        notifySuccess();

        setTimeout(() => {
          history("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        // If there's an error during update, show error toast
        notifyError();
      });
  };

  const handleRegNoChange = (e) => {
    const inputValue = e.target.value;
    const alphanumericRegex = /^[A-Za-z0-9]+$/;

    if (alphanumericRegex.test(inputValue) || inputValue === "") {
      setFormData({ ...formData, Reg_No: inputValue });
      console.log(formData)
    }
  };
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const alphanumericRegex = /^[A-Za-z]+$/;

    if (alphanumericRegex.test(inputValue) || inputValue === "") {
      setFormData({ ...formData, Name: inputValue });
    }
  };
  const handleFatherNameChange = (e) => {
    const inputValue = e.target.value;
    const alphanumericRegex = /^[A-Za-z]+$/;

    if (alphanumericRegex.test(inputValue) || inputValue === "") {
      setFormData({ ...formData, Father_Name: inputValue });
    }
  };
  const handleMotherNameChange = (e) => {
    const inputValue = e.target.value;
    const alphanumericRegex = /^[A-Za-z]+$/;

    if (alphanumericRegex.test(inputValue) || inputValue === "") {
      setFormData({ ...formData, Mother_Name: inputValue });
    }
  };
  const handleTenthMarkChange = (e) => {
    const inputValue = e.target.value;

    // Define a regular expression to allow up to two decimal places
    const decimalRegex = /^\d{0,100}(\.\d{0,2})?$/;

    if (decimalRegex.test(inputValue) && inputValue <= 100) {
      setFormData({ ...formData, Tenth_Mark: inputValue });
    }
  };
  const handleCgpaChange = (e) => {
    const inputValue = e.target.value;

    // Define a regular expression to allow up to two decimal places
    const decimalRegex = /^\d{0,10}(\.\d{0,2})?$/;

    if (decimalRegex.test(inputValue) && inputValue <= 10) {
      setFormData({ ...formData, Cgpa: inputValue });
    }
  };
  const handleAttendanceChange = (e) => {
    const inputValue = e.target.value;

    // Define a regular expression to allow up to two decimal places
    const decimalRegex = /^\d{0,100}(\.\d{0,2})?$/;

    if (decimalRegex.test(inputValue) && inputValue <= 100) {
      setFormData({ ...formData, Attendance: inputValue });
    }
  };
  const handleTwelvethMarkChange = (e) => {
    const inputValue = e.target.value;

    // Define a regular expression to allow up to two decimal places
    const decimalRegex = /^\d{0,100}(\.\d{0,2})?$/;

    if (decimalRegex.test(inputValue) && inputValue <= 100) {
      setFormData({ ...formData, Twelveth_Mark: inputValue });
    }
  };
  const handleDiplomaMarkChange = (e) => {
    const inputValue = e.target.value;

    // Define a regular expression to allow up to two decimal places
    const decimalRegex = /^\d{0,100}(\.\d{0,2})?$/;

    if (decimalRegex.test(inputValue) && inputValue <= 100) {
      setFormData({ ...formData, Diploma: inputValue });
    }
  };

  const handleMobileNoChange = (e) => {
    const inputValue = e.target.value;

    // Define a regular expression to allow only exactly 10 digits
    const mobileNoRegex = /^\d{0,10}$/;

    if (mobileNoRegex.test(inputValue)) {
      setFormData({ ...formData, Mobile_No: inputValue });
    }
  };
  const handleAadharNoChange = (e) => {
    const inputValue = e.target.value;

    // Define a regular expression to allow only exactly 10 digits
    const aadharNoRegex = /^\d{0,12}$/;

    if (aadharNoRegex.test(inputValue)) {
      setFormData({ ...formData, Aadhar_No: inputValue });
    }
  };
  const handleAnnualIncomeChange = (e) => {
    const inputValue = e.target.value;

    // Validate input to allow numbers with up to 2 decimal places
    const decimalRegex = /^(0|[1-9]\d*)(\.\d{0,2})?$/;
    if (decimalRegex.test(inputValue) || inputValue === "") {
      setFormData({ ...formData, Annual_Income: inputValue });
    }
  };

  return (
    <div>
      <form className="ElementAdding" onSubmit={handleSubmit}>
        <TextField
          id="filled-regno"
          label="Register No."
          variant="filled"
          value={formData.Reg_No}
          onChange={(e) => handleRegNoChange(e)}
          required
        />
        <TextField
          id="filled-name"
          label="Name"
          variant="filled"
          value={formData.Name}
          onChange={(e) => handleNameChange(e)}
          required
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Department"
          defaultValue=""
          value={formData.Programme}
          onChange={(e) =>
            setFormData({ ...formData, Programme: e.target.value })
          }
        >
          <MenuItem value="">Programme</MenuItem>
          <MenuItem value="UG">UG</MenuItem>
          <MenuItem value="PG">PG</MenuItem>
        </TextField>
      </form>
      {/* <form className="ElementAdding" onSubmit={handleSubmit}>
        

        <input
          type="text"
          name="Reg_No"
          value={formData.Reg_No}
          onChange={(e) => handleRegNoChange(e)}
          placeholder="Reg No"
          required
        />
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={(e) => handleNameChange(e)}
          placeholder="Name"
          required
        />
        <select
          name="Programme"
          value={formData.Programme}
          onChange={(e) =>
            setFormData({ ...formData, Programme: e.target.value })
          }
        >
          <option value="" disabled hidden>
            Select Programme
          </option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
        </select>

        <select
          name="Degree"
          value={formData.Degree}
          onChange={(e) => setFormData({ ...formData, Degree: e.target.value })}
        >
          <option value="" disabled hidden>
            Select Degree
          </option>
          <option value="B.E">B.E</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.E">M.E</option>
        </select>
        <select
          name="Branch"
          value={formData.Branch}
          onChange={(e) => setFormData({ ...formData, Branch: e.target.value })}
        >
          <option value="" disabled hidden>
            Select Branch
          </option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical & Electronics Engineering">
            Electrical & Electronics Engineering
          </option>
          <option value="Electronics & Communication Engineering">
            Electronics & Communication Engineering
          </option>
          <option value="Production Engineering">
            {" "}
            Production Engineering{" "}
          </option>
          <option value="Electronics & Instrumentation Engineering">
            {" "}
            Electronics & Instrumentation Engineering{" "}
          </option>
          <option value="Computer Science & Engineering">
            Computer Science & Engineering{" "}
          </option>
          <option value="Information Technology">
            {" "}
            Information Technology{" "}
          </option>
          <option value="Industrial Biotechnology">
            Industrial Biotechnology
          </option>
          <option value="Structural Engineering">Structural Engineering</option>
          <option value="Environmental Engineering ">
            Environmental Engineering{" "}
          </option>
          <option value="Geotechnical Engineering ">
            Geotechnical Engineering{" "}
          </option>
          <option value="Engineering Design">Engineering Design </option>
          <option value="Manufacturing Engineering">
            Manufacturing Engineering{" "}
          </option>
          <option value="Thermal Engineering">Thermal Engineering</option>
          <option value="Power Systems Engineering">
            {" "}
            Power Systems Engineering{" "}
          </option>
          <option value="Power Electronics & Drives">
            Power Electronics & Drives{" "}
          </option>
          <option value="Applied Electronics">Applied Electronics </option>
          <option value="VLSI designx">VLSI design </option>
        </select>
        <select
          name="Current_Semester"
          value={formData.Current_Semester}
          onChange={(e) =>
            setFormData({ ...formData, Current_Semester: e.target.value })
          }
        >
          <option value="" disabled>
            Select Current Semester
          </option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
          <input
            key={semester}
            type="number"
            name={`gpa${semester}`}
            value={formData[`gpa${semester}`]}
            onChange={handleChange}
            placeholder={`Enter GPA${semester}${
              formData.Current_Semester >= semester ? " *" : ""
            }`}
            step="0.01"
            pattern="\d+(\.\d{1,2})?"
            required={formData.Current_Semester >= semester}
            disabled={formData.Current_Semester < semester}
          />
        ))}

        <input
          type="text"
          name="Father_Name"
          value={formData.Father_Name}
          onChange={(e) => handleFatherNameChange(e)}
          placeholder="Father's Name"
          required
        />
        <input
          type="text"
          name="Mother_Name"
          value={formData.Mother_Name}
          onChange={(e) => handleMotherNameChange(e)}
          placeholder="Mother's Name"
          required
        />
        <input
          type="number"
          name="Tenth_Mark"
          value={formData.Tenth_Mark}
          onChange={(e) => handleTenthMarkChange(e)}
          placeholder="Tenth Mark %"
          required
        />
        <input
          type="number"
          name="Twelveth_Mark"
          value={formData.Twelveth_Mark}
          onChange={(e) => handleTwelvethMarkChange(e)}
          placeholder="Twelveth Mark %"
        />
        <input
          type="number"
          name="Diploma"
          value={formData.Diploma}
          onChange={(e) => handleDiplomaMarkChange(e)}
          placeholder="Diploma %"
        />
        <input
          type="text"
          name="Mobile_No"
          value={formData.Mobile_No}
          onChange={(e) => handleMobileNoChange(e)}
          placeholder="Mobile No"
          required
        />
        <input
          type="text"
          name="Personal_Mail_Id"
          value={formData.Personal_Mail_Id}
          onChange={(e) =>
            setFormData({ ...formData, Personal_Mail_Id: e.target.value })
          }
          placeholder="Personal Mail Id"
        />
        <input
          type="text"
          name="GCT_Mail_Id"
          value={formData.GCT_Mail_Id}
          onChange={(e) =>
            setFormData({ ...formData, GCT_Mail_Id: e.target.value })
          }
          placeholder="GCT Mail Id"
        />
        <input
          type="text"
          name="Address"
          value={formData.Address}
          onChange={(e) =>
            setFormData({ ...formData, Address: e.target.value })
          }
          placeholder="Address"
          required
        />

        <select
          name="Gender"
          value={formData.Gender}
          onChange={(e) => handleChange(e)} // Pass the event to handleChange
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="Physically_Challenged"
          value={formData.Physically_Challenged}
          onChange={(e) =>
            setFormData({ ...formData, Physically_Challenged: e.target.value })
          }
        >
          <option value="">Physically Challenged?</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
        <select
          name="Scholarship_Availed"
          value={formData.Scholarship_Availed}
          onChange={(e) =>
            setFormData({ ...formData, Scholarship_Availed: e.target.value })
          }
        >
          <option value="">Scholarship Availed?</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
        {formData.Scholarship_Availed === "YES" && (
          <div>
            <input
              type="text"
              name="Scholarship_Name"
              value={formData.Scholarship_Name}
              onChange={(e) =>
                setFormData({ ...formData, Scholarship_Name: e.target.value })
              }
              placeholder="Scholarship Name"
            />
            <input
              type="number"
              name="Scholarship_Amount"
              value={formData.Scholarship_Amount}
              onChange={(e) =>
                setFormData({ ...formData, Scholarship_Amount: e.target.value })
              }
              placeholder="Scholarship Amount"
            />
          </div>
        )}
        <select
          name="First_Graduate"
          value={formData.First_Graduate}
          onChange={(e) =>
            setFormData({ ...formData, First_Graduate: e.target.value })
          }
        >
          <option value="">First Graduate?</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
        <input
          type="text"
          name="Annual_Income"
          value={formData.Annual_Income}
          onChange={(e) => handleAnnualIncomeChange(e)}
          placeholder="Annual Income"
        />
        <input
          type="number"
          name="Aadhar_No"
          value={formData.Aadhar_No}
          onChange={(e) => handleAadharNoChange(e)}
          placeholder="Aadhar Number"
        />
        <input
          type="number"
          name="Cgpa"
          value={formData.Cgpa}
          placeholder="Cgpa"
          onChange={(e) => handleCgpaChange(e)}
        />
        <input
          type="number"
          name="Attendance"
          value={formData.Attendance}
          onChange={(e) => handleAttendanceChange(e)}
          placeholder="Attendance"
          title="Enter the Current Semester Attendance Percentage"
        />
        <button type="submit">Submit</button>
      </form> */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default ElementAdd;
