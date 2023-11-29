import React, { useEffect, useState } from "react";
import "./Table.css";
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Table from '@mui/material/Table';
import { DataGrid } from "@mui/x-data-grid";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Table } from "@mui/material";

function MainTable({
  regNoFilter,
  nameFilter,
  programmeFilter,
  branchFilter,
  genderFilter,
  physicallyFilter,
  scholarshipAvailed,
}) {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const recordsPerPage = 20;
  useEffect(() => {
    fetch("http://localhost:8081/alumini")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered;
      if (
        regNoFilter.trim() === "" &&
        nameFilter.trim() === "" &&
        programmeFilter.trim() === "" &&
        branchFilter.trim() === "" &&
        genderFilter.trim() === "" &&
        physicallyFilter.trim() === "" &&
        scholarshipAvailed.trim() === ""
      ) {
        filtered = [...data];
      } else {
        filtered = data.filter((row) => {
          const regNo = row.Reg_no;
          const name = row.Name;
          const programme = row.Programme;
          const branch = row.Branch;
          const gender = row.Gender;
          const physically = row.Physically_challenged;
          const scholarshipAvailedvalue = row.Scholarship_Availed;
          if (
            (typeof regNo === "string" &&
              regNo.toLowerCase().includes(regNoFilter.toLowerCase())) ||
            (typeof regNo === "number" &&
              regNo.toString().includes(regNoFilter))
          ) {
            if (
              name.toLowerCase().includes(nameFilter.toLowerCase()) &&
              programme.toLowerCase().includes(programmeFilter.toLowerCase()) &&
              branch.toLowerCase().includes(branchFilter.toLowerCase()) &&
              gender.toLowerCase().includes(genderFilter.toLowerCase()) &&
              physically
                .toLowerCase()
                .includes(physicallyFilter.toLowerCase()) &&
              scholarshipAvailedvalue
                .toLowerCase()
                .includes(scholarshipAvailed.toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        });
      }
      setFilteredData(filtered);
    };

    applyFilters();
  }, [
    regNoFilter,
    nameFilter,
    programmeFilter,
    branchFilter,
    genderFilter,
    physicallyFilter,
    scholarshipAvailed,
    data,
  ]);

  const handleSort = (key) => {
    if (key === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy) {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    }
    return 0;
  });

  const notifySuccess = () => {
    toast.success("😊 Deleted Successfully!!", {
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
    toast.error("😢 Deletion Failed. Please try again.", {
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

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const records = sortedData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  const handleEdit = (record) => {
    // Implement your edit logic here using the record data
    console.log("Edit clicked for record:", record);

    // Navigate to the edit page with the record data
    navigate(`/edit`, { state: { record } });
  };

  const handleDelete = (record) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the record of Regno=${record.Reg_no}?`
    );

    if (isConfirmed) {
      fetch(`http://localhost:8081/alumini/${record.Reg_no}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Fetch updated data after deletion
          fetchUpdatedData();
          notifySuccess();
          console.log("Record deleted successfully:", data);
          fetchUpdatedData();
          setCurrentPage(1);
        })
        .catch((error) => {
          console.error("Error deleting record:", error);
          notifyError();
        });
    }
  };

  const fetchData = () => {
    fetch("http://localhost:8081/alumini")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUpdatedData();
  }, [
    regNoFilter,
    nameFilter,
    programmeFilter,
    branchFilter,
    genderFilter,
    physicallyFilter,
    scholarshipAvailed,
    data /* other filters */,
  ]);

  useEffect(() => {
    fetchData();

    // Initial data fetch
  }, [filteredData]);

  const fetchUpdatedData = () => {
    // Make an API call to fetch the updated data
    fetch("http://localhost:8081/alumini")
      .then((res) => res.json())
      .then((updatedData) => {
        setData(updatedData);

        // After setting the updated data, check if the current page is now empty
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        const recordsOnCurrentPage = updatedData.slice(startIndex, endIndex);

        if (recordsOnCurrentPage.length === 0 && totalPages > 1) {
          // If the current page is empty, navigate to the previous page
          setCurrentPage(currentPage - 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const getId = (records) => records.Reg_no;

  return (
    <div className="overall-table">
      {/* <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>hello</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer> */}

      <div style={{ height: 500, width: "95%" }} className="table-container">
        
          <DataGrid
            getRowId={(records) => records.Reg_no}
            rows={records}
            columns={[
              { field: "Reg_no", headerName: "Reg No", sortable: true },
              { field: "Name", headerName: "Name", width: 170, sortable: true },
              { field: "Programme", headerName: "Programme", sortable: true },
              { field: "Degree", headerName: "Degree", sortable: true },
              { field: "Branch", headerName: "Branch", sortable: true, width: 170 },
              { field: "Semester", headerName: "Semester", sortable: true },
              {
                field: "Father_Name",
                headerName: "Father_Name",
                width: 170,
                sortable: true,
              },
              {
                field: "Mother_Name",
                headerName: "Mother_Name",
                width: 170,
                sortable: true,
              },
              { field: "tenth_Mark", headerName: "tenth_Mark", sortable: true },
              {
                field: "twelveth_Mark",
                headerName: "twelveth_Mark",
                sortable: true,
              },
              { field: "Diploma", headerName: "Diploma", sortable: true },
              { field: "Gender", headerName: "Gender", sortable: true },
              {
                field: "Physically_challenged",
                headerName: "Physically_challenged",
                width: 170,
                sortable: true,
              },
              { field: "Mobile_No", headerName: "Mobile_No", sortable: true },
              {
                field: "Personal_Mail_id",
                headerName: "Personal_Mail_id",
                sortable: true,
              },
              { field: "Address", headerName: "Address", sortable: true,  },
              {
                field: "First_Graduate",
                headerName: "First_Graduate",
                sortable: true,
              },
              {
                field: "Scholarship_Availed",
                headerName: "Scholarship_Availed",
                sortable: true,
              },
              {
                field: "Scholarship_Name",
                headerName: "Scholarship_Name",
                sortable: true,
              },
              {
                field: "Scholarship_Amount",
                headerName: "Scholarship_Amount",
                sortable: true,
              },
              {
                field: "GCT_mail_id",
                headerName: "GCT_mail_id",
                sortable: true,
              },
              {
                field: "Annual_Income",
                headerName: "Annual_Income",
                sortable: true,
              },
              { field: "Aadhar_no", headerName: "Aadhar_no", sortable: true },
              { field: "gpa1", headerName: "gpa1", sortable: true },
              { field: "gpa2", headerName: "gpa2", sortable: true },
              { field: "gpa3", headerName: "gpa3", sortable: true },
              { field: "gpa4", headerName: "gpa4", sortable: true },
              { field: "gpa5", headerName: "gpa5", sortable: true },
              { field: "gpa6", headerName: "gpa6", sortable: true },
              { field: "gpa7", headerName: "gpa7", sortable: true },
              { field: "gpa8", headerName: "gpa8", sortable: true },
              { field: "Cgpa", headerName: "Cgpa", sortable: true },
              { field: "Attendance", headerName: "Attendance", sortable: true },

              {
                field: "Action",
                headerName: "Action",
                sortable: false,
                renderCell: (params) => (
                  <div>
                    <button
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => handleEdit(params.row)}
                      style={{ padding: "5px 10px", borderRadius: "15px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(params.row)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "15px",
                        marginLeft: "5px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
            pageSize={10} 
            // rowsPerPageOptions={[10, 25, 50]} 
            pageSizeOptions={[5, 10, 25, 50, 100, 200, 500]}
            initialState={{

              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            autoHeight={false}
          />
        
      </div>

      {/* <div className="table-container" style={{ padding: "20px" }}>
        <p className="total-records">Total Records: {filteredData.length}</p>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("SI_no")}>
                SI_no
                {sortBy === "SI_no" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "SI_no" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Reg_no")}>
                Reg No
                {sortBy === "Reg_no" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Reg_no" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Name")}>
                Name
                {sortBy === "Name" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "Name" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Programme")}>
                Programme
                {sortBy === "Programme" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Programme" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Degree")}>
                Degree
                {sortBy === "Degree" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Degree" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Branch")}>
                Branch
                {sortBy === "Branch" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Branch" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Semester")}>
                Current Semester
                {sortBy === "Semester" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Semester" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Father_Name")}>
                Father Name
                {sortBy === "Father_Name" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Father_Name" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Mother_Name")}>
                Mother Name
                {sortBy === "Mother_Name" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Mother_Name" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("tenth_Mark")}>
                10th Mark %
                {sortBy === "tenth_Mark" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "tenth_Mark" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("twelveth_Mark")}>
                12th Mark %
                {sortBy === "twelveth_Mark" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "twelveth_Mark" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Diploma")}>
                Diploma %
                {sortBy === "Diploma" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Diploma" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Gender")}>
                Gender
                {sortBy === "Gender" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Gender" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Physically_challenged")}>
                Physically Challenged
                {sortBy === "Physically_challenged" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Physically_challenged" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>

              <th onClick={() => handleSort("Mobile_No")}>
                Mobile No
                {sortBy === "Mobile_No" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Mobile_No" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Personal_Mail_id")}>
                Personal Mail id
                {sortBy === "Personal_Mail_id" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Personal_Mail_id" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("GCT_mail_id")}>
                GCT Mail id
                {sortBy === "GCT_mail_id" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "GCT_mail_id" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Address")}>
                Address
                {sortBy === "Address" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Address" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>

              <th onClick={() => handleSort("First_Graduate")}>
                First Graduate
                {sortBy === "First_Graduate" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "First_Graduate" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Scholarship_Availed")}>
                Scholarship Availed
                {sortBy === "Scholarship_Availed" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Scholarship_Availed" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Scholarship_Name")}>
                Scholarship Name
                {sortBy === "Scholarship_Name" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Scholarship_Name" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Scholarship_Amount")}>
                Scholarship Amount
                {sortBy === "Scholarship_Amount" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Scholarship_Amount" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>

              <th onClick={() => handleSort("Annual_Income")}>
                Annual Income
                {sortBy === "Annual_Income" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Annual_Income" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Aadhar_No")}>
                Aadhar No
                {sortBy === "Aadhar_No" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Aadhar_No" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("gpa1")}>
                GPA 1
                {sortBy === "gpa1" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "gpa1" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("gpa2")}>
                GPA 2
                {sortBy === "gpa2" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "gpa2" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("gpa3")}>
                GPA 3
                {sortBy === "gpa3" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "gpa3" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("gpa4")}>
                GPA 4
                {sortBy === "gpa4" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "gpa4" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("gpa5")}>
                GPA 5
                {sortBy === "gpa5" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "gpa5" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("gpa6")}>
                GPA 6
                {sortBy === "gpa6" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "gpa6" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("gpa7")}>
                GPA 7
                {sortBy === "gpa7" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "gpa7" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("gpa8")}>
                GPA 8
                {sortBy === "gpa8" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "gpa8" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Cgpa")}>
                CGPA
                {sortBy === "Cgpa" && sortOrder === "asc" && <BsCaretUpFill />}
                {sortBy === "Cgpa" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th onClick={() => handleSort("Attendance")}>
                Attendance Percentage
                {sortBy === "Attendance" && sortOrder === "asc" && (
                  <BsCaretUpFill />
                )}
                {sortBy === "Attendance" && sortOrder === "desc" && (
                  <BsCaretDownFill />
                )}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="tbody-container">
            {records.length === 0 ? (
              <tr>
                <td colSpan="35" className="no-data-found">
                  Data not found
                </td>
              </tr>
            ) : (
              records.map((d, i) => (
                <tr key={i}>
                  <td>{sortedData.indexOf(d) + 1}</td>

                  <td>{d.Reg_no}</td>
                  <td>{d.Name}</td>
                  <td>{d.Programme}</td>
                  <td>{d.Degree}</td>
                  <td>{d.Branch}</td>
                  <td>{d.Semester}</td>
                  <td>{d.Father_Name}</td>
                  <td>{d.Mother_Name}</td>
                  <td>{d.tenth_Mark}</td>
                  <td>{d.twelveth_Mark}</td>
                  <td>{d.Diploma}</td>
                  <td>{d.Gender}</td>
                  <td>{d.Physically_challenged}</td>
                  <td>{d.Mobile_No}</td>
                  <td>{d.Personal_Mail_id}</td>
                  <td>{d.GCT_mail_id}</td>
                  <td>{d.Address}</td>
                  <td>{d.First_Graduate}</td>
                  <td>{d.Scholarship_Availed}</td>
                  <td>{d.Scholarship_Name}</td>
                  <td>{d.Scholarship_Amount}</td>
                  <td>{d.Annual_Income}</td>
                  <td>{d.Aadhar_no}</td>
                  <td>{d.gpa1}</td>
                  <td>{d.gpa2}</td>
                  <td>{d.gpa3}</td>
                  <td>{d.gpa4}</td>
                  <td>{d.gpa5}</td>
                  <td>{d.gpa6}</td>
                  <td>{d.gpa7}</td>
                  <td>{d.gpa8}</td>
                  <td>{d.Cgpa}</td>
                  <td>{d.Attendance}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => handleEdit(d)}
                      style={{ padding: "5px 10px", borderRadius: "15px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(d)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "15px",
                        marginLeft: "5px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>{" "}
        </table>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a href="#" className="page-link" onClick={previousPage}>
                Prev
              </a>
            </li>
            {pageNumbers.map((num) => (
              <li
                key={num}
                className={`page-item ${currentPage === num ? "active" : ""}`}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changePage(num)}
                >
                  {num}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
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
      </div> */}
    </div>
  );

  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === 1 && totalPages > 1) {
      // If the current page is 1 and there are more than one total pages,
      // navigate to the last page.
      setCurrentPage(totalPages);
    }

    // Check if the current page has no records, then go back one more page.
    const startIndex = (currentPage - 2) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const recordsOnPreviousPage = sortedData.slice(startIndex, endIndex);

    if (recordsOnPreviousPage.length === 0 && totalPages > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(num) {
    setCurrentPage(num);
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default MainTable;
