import { Button, Card, Modal, TextField, IconButton } from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Close as CloseIcon } from "@material-ui/icons";
import { toast } from "react-toastify";
function CustomToolbar({
  selectedRows,
  setSelectedRows,
  onPlaceStudents,
  companyName,
  driveId,
}) {
  const [details, setDetails] = useState({
    companyName: companyName,
    Package: "",
  });
  const handlePlaceStudents = () => {
    onPlaceStudents(selectedRows);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8080/api/v1/hr/place-students",
      { driveId: driveId, studentIds: selectedRows, Package: details.Package }
    );
    toast.success(response.data.message);
    handleClose();
    setSelectedRows([]);
  };
  return (
    <GridToolbarContainer className="d-flex justify-content-between">
      <GridToolbarExport csvOptions={{ allColumns: true }} />
      <Button
        variant="outlined"
        color="secondary"
        // onClick={handlePlaceStudents}
        onClick={handleOpen}
        disabled={selectedRows.length === 0}
      >
        Place Selected Students
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        className="d-flex align-items-center"
      >
        <div
          style={{
            width: "400px",
            backgroundColor: "#fff",
            padding: "20px",
            margin: "auto auto",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <h6 className="text-center">Place Selected Students </h6>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Company Name"
              className="col-12 my-3"
              value={details.companyName}
            />
            <TextField
              type="number"
              variant="outlined"
              label="package"
              className="col-12 my-3"
              name="package"
              value={details.Package}
              onChange={(e) =>
                setDetails({ ...details, Package: e.target.value })
              }
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="col-4 mx-auto my-3"
            >
              Place
            </Button>
          </form>
        </div>
      </Modal>
    </GridToolbarContainer>
  );
}

const ParticularDriveTable = () => {
  const [driveApplicants, setDriveApplicants] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [driveId, setDriveId] = useState("");
  const params = useParams();
  const { Id } = params;
  useEffect(() => {
    const getDrive = async () => {
      await axios
        .get(`http://localhost:8080/api/v1/hr/get-partcular-drive/${Id}`)
        .then((res) => {
          setDriveApplicants(res.data.applicants);
          setCompanyName(res.data.companyName);
          setDriveId(res.data._id);
        });
    };
    getDrive();
  }, [Id]);

  const columns = [
    {
      field: "name",
      headerName: "Applicant Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "branch",
      headerName: "Branch",
      width: 300,
    },
  ];

  const rows =
    driveApplicants &&
    driveApplicants.map((applicant) => ({
      id: applicant._id,
      name: applicant.user.name, // Replace with the actual name field in the user document
      email: applicant.user.email, // Replace with the actual email field in the user document
      branch: applicant.branch, // Replace with the actual branch field in the profile-details document
    }));

  const handlePlaceStudents = async (selectedRows) => {
    // const response = await axios.post(
    //   "http://localhost:8080/api/v1/hr/place-students",
    //   { driveId: Id, studentIds: selectedRows }
    // );
    console.log(selectedRows);
    setSelectedRows([]);
  };
  return (
    <Card>
      {driveApplicants && rows && (
        <DataGrid
          style={{ height: 400, width: "100%" }}
          rows={rows && rows}
          columns={columns}
          autoHeight
          pageSize={5}
          checkboxSelection
          selectionModel={selectedRows}
          onSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection)
          }
          components={{
            Toolbar: (props) => (
              <CustomToolbar
                {...props}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                onPlaceStudents={handlePlaceStudents}
                companyName={companyName}
                driveId={driveId}
              />
            ),
          }}
        />
      )}
    </Card>
  );
};

export default ParticularDriveTable;
