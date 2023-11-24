import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewPage from "./NewPage";
import Header from "./Components/Header/Header";
import AddButton from "./Components/Filter/AddIcon";
import Table from "./Components/Table/Table";
import RegNoFilter from "./Components/Filter/RegnoFilter";
import NameFilter from "./Components/Filter/NameFilter";
import ProgrammeFilter from "./Components/Filter/ProgrammeFilter";
import BranchFilter from "./Components/Filter/BranchFilter";
import "bootstrap/dist/css/bootstrap.min.css";
import GenderFilter from "./Components/Filter/GenderFilter";
import Physically from "./Components/Filter/Physically";
import ScholarshipAvailedFilter from "./Components/Filter/ScholarshipAvailedFilter";
import SecondPage from "./SecondPage";

function App() {
  const [regNoFilter, setRegNoFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [programmeFilter, setProgrammeFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [physicallyFilter, setPhysically] = useState("");
  const [scholarshipAvailed, setScholarshipAvailed] = useState("");

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/new" element={<NewPage />} />
          <Route path="/edit" element={<SecondPage />} />
          <Route
            path="/"
            element={
              <>
                <Header />

                <div className="filter-container">
                  <Link to="/new">
                    <AddButton />
                  </Link>

                  <RegNoFilter
                    onFilter={(filterText) => setRegNoFilter(filterText)}
                    filter={regNoFilter}
                  />
                  <NameFilter
                    onFilter={(filterText) => setNameFilter(filterText)}
                    filter={nameFilter}
                  />
                  <ProgrammeFilter
                    onFilter={(filterText) => setProgrammeFilter(filterText)}
                    filter={programmeFilter}
                  />
                  <BranchFilter
                    onFilter={(filterText) => setBranchFilter(filterText)}
                    filter={branchFilter}
                  />
                  <GenderFilter
                    onFilter={(filterText) => setGenderFilter(filterText)}
                    filter={genderFilter}
                  />
                  <Physically
                    onFilter={(filterText) => setPhysically(filterText)}
                    filter={physicallyFilter}
                  />
                  <ScholarshipAvailedFilter
                    onFilter={(filterText) => setScholarshipAvailed(filterText)}
                    filter={scholarshipAvailed}
                  />
                </div>

                <Table
                  regNoFilter={regNoFilter}
                  nameFilter={nameFilter}
                  programmeFilter={programmeFilter}
                  branchFilter={branchFilter}
                  genderFilter={genderFilter}
                  physicallyFilter={physicallyFilter}
                  scholarshipAvailed={scholarshipAvailed}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
