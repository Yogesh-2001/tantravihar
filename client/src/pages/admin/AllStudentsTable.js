import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { message } from "antd";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileDetailsContext";

var emailarray = [];

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 100,
    renderCell: (params) => (
      <Link to={`/student/dashboard/view-profile/${params.row._id}`}>
        <Avatar
          alt="Travis Howard"
          src={`http://localhost:8080/uploads/profileimages/${params.row.photourl}`}
        />
      </Link>
    ),
  },
  {
    field: "user",
    headerName: "Name",
    valueGetter: (params) => params.row.user.name,
    width: 200,
  },
  {
    field: "user",
    headerName: "Email",
    valueGetter: (params) => params.row.user.email,
    width: 300,
  },

  { field: "branch", headerName: "Branch", width: 200 },
  { field: "engineering_division", headerName: "Division", width: 130 },
  { field: "engineeringAggrpercent", headerName: "Aggr CGPA", width: 150 },
  { field: "engineeringpercent", headerName: "Eng Aggr %", width: 170 },
  {
    field: "placed",
    headerName: "Placed Status",
    width: 170,
    renderCell: (params) => <>{params.row.placed ? "Placed" : "Not Placed"}</>,
  },
  {
    field: "resume",
    headerName: "Resume URL",
    width: 150,
    renderCell: (params) => (
      <>
        <a
          href={`http://localhost:8080/uploads/resumes/${params.row.resume}`}
          target="_blank"
        >
          click here
        </a>
      </>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    width: "130",
    renderCell: (params) => (
      <Link to={`/student/dashboard/edit-student/${params.row._id}`}>
        <EditIcon />
      </Link>
    ),
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
// doc_id name company_name package
const AllStudentsTable = () => {
  const { setLoading } = useProfile();

  const [rows, setRows] = React.useState([]); //all students

  const getAllStudents = async () => {
    await axios
      .get("http://localhost:8080/api/v1/admin/get-allstudents/")
      .then((res) => {
        setRows(res.data.allstudents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    setLoading(true);
    getAllStudents();
    setLoading(false);
  }, []);

  return (
    <>
      <section className="col-12 mx-auto">
        <h4 className="section-title">All Students List</h4>
        <DataGrid
          style={{
            height: "550px",
            width: "100%",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row._id}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </section>
    </>
  );
};

export default AllStudentsTable;
