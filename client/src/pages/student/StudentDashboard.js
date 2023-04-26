import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileDetailsContext";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
const StudentDashboard = () => {
  const [{ user }] = useAuth();
  const { profiledetails, setLoading } = useProfile();
  const [profile, setProfile] = useState({});
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      axios
        .get(`http://localhost:8080/api/v1/user/get-profile-url/${user._id}`)
        .then((res) => {
          setProfile(res.data[0]);
          setApplied(res.data[0].drivesApplied);
        });
    };
    setLoading(true);
    getProfile();
    setLoading(false);
  }, []);

  const columns = [
    {
      field: "companyName",
      headerName: "Company Name",
      width: 400,
    },
    {
      field: "driveDate",
      headerName: "Drive Date",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {new Date(params.row?.driveDate).toDateString()}
        </p>
      ),
    },
    // {
    //   field: "postedBy",
    //   headerName: "Posted By",
    //   width: 200,
    //   valueGetter: (params) => params.row.postedBy.name,
    // },
    {
      field: "postedAt",
      headerName: "Posted on",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {new Date(params.row?.postedAt).toDateString()}
        </p>
      ),
    },
  ];
  return (
    <>
      {profile && (
        <Paper
          className="p-3 d-flex justify-content-between align-items-center flex-wrap"
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            backgroundColor: "#1552e003",
          }}
        >
          <div className="col-12 col-md-4 col-lg-3 image-box mb-3">
            <img
              src={`http://localhost:8080/uploads/profileimages/${profile?.photourl}`}
              width={"300px"}
              height={"300px"}
              style={{
                objectFit: "contain",
                margin: "auto",
                borderRadius: "15px",
              }}
            />
          </div>
          <div className="col-12 col-md-8 col-lg-8 ">
            <h5 className="mb-5 form-title">Profile Details</h5>
            <section className="col-12 d-flex flex-wrap justify-content-start">
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Name</b> :{user?.name}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Email</b> : {user?.email}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Engineering Branch</b> : {profile?.branch}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Engineering Division</b> : {profile?.engineering_division}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Engineering Aggregate CGPA</b> :{" "}
                {profile?.engineeringAggrpercent + " CGPA"}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Engineering Aggr Percentage </b> :{" "}
                {profile?.engineeringpercent} %
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Live KT</b>: {profile?.liveKt}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Resume</b> :{" "}
                <a
                  href={`http://localhost:8080/uploads/resumes/${profile?.resume}`}
                  target="_blank"
                >
                  Click here
                </a>
              </p>
            </section>
          </div>
        </Paper>
      )}
      <h4 className="form-title mt-5">Applied Drives</h4>
      {applied && (
        <Paper
          className="col-12 p-3"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <DataGrid
            style={{ height: 400, width: "100%" }}
            rows={applied}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
          />
        </Paper>
      )}
    </>
  );
};

export default StudentDashboard;
