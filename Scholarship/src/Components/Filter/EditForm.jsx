// EditForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditForm.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditForm({ recordId }) {
  const [formData, setFormData] = useState({
    Reg_no: "",
    Name: "",
    Programme: "",
    Degree: "",
    Branch: "",
    Semester: "",
    Father_Name: "",
    Mother_Name: "",
    tenth_Mark: "",
    twelveth_Mark: "",
    Diploma: "",
    Gender: "",
    Physically_challenged: "",
    Mobile_No: "",
    Personal_Mail_id: "",
    Address: "",
    First_Graduate: "",
    Scholarship_Availed: "",
    Scholarship_Name: "",
    Scholarship_Amount: "",
    GCT_mail_id: "",
    Annual_Income: "",
    Aadhar_no: "",
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

  const history = useNavigate();
  useEffect(() => {
    // Only fetch the record data if recordId is not an empty string
    if (recordId !== "") {
      axios
        .get(`http://localhost:8081/alumini/${recordId}`)
        .then((res) => {
          // Ensure that the fetched record values are not undefined or null
          const sanitizedData = Object.entries(res.data).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: value !== null ? value : "", // Set to empty string if value is null
            }),
            {}
          );
          setFormData(sanitizedData);
        })
        .catch((err) => console.log(err));
    }
  }, [recordId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update Reg_no if the name is Reg_no
    if (name === "Reg_no") {
      // Assuming Reg_no is unique and should not be changed
      // If you want to allow changing Reg_no, you may need additional handling
      // For example, checking if the new Reg_no doesn't already exist
      setFormData((prevData) => ({
        ...prevData,
        Reg_no: value,
        [name]: value,
      }));
    } else {
      // For other fields, update as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    console.log("Form Data After Change:", formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a PUT request to update the record
    console.log("Submitted Data:", formData);
    axios
      .put(`http://localhost:8081/alumini/${recordId}`, formData)
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

  const notifySuccess = () => {
    toast.success("😊 Updated Successfully!!", {
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
    toast.error("😢 Update Failed. Please try again.", {
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

  return (
    <div>
      <form onSubmit={handleSubmit} className="ElementAdding">
        <input
          type="text"
          name="Reg_no"
          value={formData.Reg_no}
          onChange={handleChange}
          placeholder="Reg No"
          readOnly
        />
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          placeholder="Name"
        />
        <select
          name="Programme"
          value={formData.Programme}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            Select Programme
          </option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
        </select>

        <select name="Degree" value={formData.Degree} onChange={handleChange}>
          <option value="" disabled hidden>
            Select Degree
          </option>
          <option value="B.E">B.E</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.E">M.E</option>
          <option value="M.Tech">M.Tech</option>
        </select>
        <select name="Branch" value={formData.Branch} onChange={handleChange}>
          <option value="" disabled hidden>
            Select Branch
          </option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Industrial BioTechnology">
            Industrial BioTechnology
          </option>
          <option value="Computer Science and Engineering">
            Computer Science and Engineering
          </option>
          <option value="EEE">EEE</option>
          <option value="ECE">ECE</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Production Engineering">Production Engineering</option>
          <option value="Information Technology">Information Technology</option>
        </select>
        <select
          name="Semester"
          value={formData.Semester}
          onChange={handleChange}
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

        <input
          type="number"
          name="gpa1"
          value={formData.gpa1}
          onChange={handleChange}
          placeholder="Enter GPA1"
          step="0.01"
          pattern="\d+(\.\d{1,2})?"
        />
        <input
          type="number"
          name="gpa2"
          value={formData.gpa2}
          onChange={handleChange}
          placeholder="Enter GPA2"
          step="0.01"
          pattern="\d+(\.\d{1,2})?"
        />
        <input
          type="number"
          name="gpa3"
          value={formData.gpa3}
          onChange={handleChange}
          placeholder="Enter GPA3"
          step="0.01"
          pattern="\d+(\.\d{1,2})?"
        />
        <input
          type="number"
          name="gpa4"
          value={formData.gpa4}
          onChange={handleChange}
          placeholder="Enter GPA4"
          step="0.01"
          pattern="\d+(\.\d{1,2})?"
        />
        <input
          type="number"
          name="gpa5"
          value={formData.gpa5}
          onChange={handleChange}
          placeholder="Enter GPA5"
          step="0.01"
          pattern="\d+(\.\d{1,2})?"
        />
        <input
          type="number"
          name="gpa6"
          value={formData.gpa6}
          onChange={handleChange}
          placeholder="Enter GPA6"
          step="0.01"
          pattern="\d+(\.\d{1,2})?"
        />
        <input
          type="number"
          name="gpa7"
          value={formData.gpa7}
          onChange={handleChange}
          placeholder="Enter GPA7"
          step="0.01"
          pattern="\d+(\.\d{1,2})?"
        />
        <input
          type="number"
          name="gpa8"
          value={formData.gpa8}
          onChange={handleChange}
          placeholder="Enter GPA8"
          step="0.01"
          pattern="\d+(\.\d{1,2})?"
        />

        <input
          type="text"
          name="Father_Name"
          value={formData.Father_Name}
          onChange={handleChange}
          placeholder="Father's Name"
        />
        <input
          type="text"
          name="Mother_Name"
          value={formData.Mother_Name}
          onChange={handleChange}
          placeholder="Mother's Name"
        />
        <input
          type="number"
          name="tenth_Mark"
          value={formData.tenth_Mark}
          onChange={handleChange}
          placeholder="Tenth Mark (Below 100)"
        />
        <input
          type="number"
          name="twelveth_Mark"
          value={formData.twelveth_Mark}
          onChange={handleChange}
          placeholder="Twelveth Mark (Below 100)"
        />
        <input
          type="number"
          name="Diploma"
          value={formData.Diploma}
          onChange={handleChange}
          placeholder="Diploma (Below 100)"
        />
        <input
          type="text"
          name="Mobile_No"
          value={formData.Mobile_No}
          onChange={handleChange}
          placeholder="Mobile No(10 digits)"
        />
        <input
          type="text"
          name="Personal_Mail_id"
          value={formData.Personal_Mail_id}
          onChange={handleChange}
          placeholder="Personal Mail Id"
        />
        <input
          type="text"
          name="GCT_mail_id"
          value={formData.GCT_mail_id}
          onChange={handleChange}
          placeholder="GCT Mail Id"
        />
        <input
          type="text"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          placeholder="Address"
        />

        <select name="Gender" value={formData.Gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <select
          name="Physically_challenged"
          value={formData.Physically_challenged}
          onChange={handleChange}
        >
          <option value="">Physically Challenged?</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
        <select
          name="Scholarship_Availed"
          value={formData.Scholarship_Availed}
          onChange={handleChange}
        >
          <option value="">Scholarship Availed?</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>

        <input
          type="text"
          name="Scholarship_Name"
          value={formData.Scholarship_Name}
          onChange={handleChange}
          placeholder="Scholarship Name"
        />
        <input
          type="number"
          name="Scholarship_Amount"
          value={formData.Scholarship_Amount}
          onChange={handleChange}
          placeholder="Scholarship Amount"
        />

        <select
          name="First_Graduate"
          value={formData.First_Graduate}
          onChange={handleChange}
        >
          <option value="">First Graduate?</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
        <input
          type="number"
          name="Annual_Income"
          value={formData.Annual_Income}
          onChange={handleChange}
          placeholder="Annual Income"
        />
        <input
          type="text"
          name="Aadhar_no"
          value={formData.Aadhar_no}
          onChange={handleChange}
          placeholder="Aadhar Number"
        />
        <input
          type="number"
          name="Cgpa"
          value={formData.Cgpa}
          placeholder="Cgpa"
          onChange={handleChange}
        />
        <input
          type="number"
          name="Attendance"
          value={formData.Attendance}
          onChange={handleChange}
          placeholder="Attendance"
          title="Enter the Current Semester Attendance Percentage"
        />

        <button type="submit">Update</button>
      </form>
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

export default EditForm;
