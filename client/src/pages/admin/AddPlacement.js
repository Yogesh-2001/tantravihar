import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { message } from "antd";
import FileBase64 from "react-file-base64";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
const AddPlacement = () => {
  const editor = useRef("");
  const [{ user }] = useAuth();

  const [checked, setChecked] = useState(false);
  const [branches, setBranches] = useState([]);
  const [con, setCon] = useState({
    companyName: "",
    driveDate: "",
    editorData: "",
    branchcriteria: [],
    jdfile: null,
    engAggrrpercentCriteria: "",
    lastApplyDate: "",
  });

  const handleBranchChange = (e) => {
    const index = branches.indexOf(e.target.value);
    if (index === -1) {
      setBranches([...branches, e.target.value]);
    } else {
      setBranches(branches.filter((branch) => branch !== e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(con);
    const formData = new FormData();

    formData.append("companyName", con.companyName);
    formData.append("driveDate", con.driveDate);
    formData.append("editorData", con.editorData);
    formData.append("branchcriteria", con.branchcriteria);
    formData.append("jdfile", con.jdfile);
    formData.append("engAggrrpercentCriteria", con.engAggrrpercentCriteria);
    formData.append("lastApplyDate", con.lastApplyDate);
    formData.append("postedBy", user?._id);
    con.jdfile &&
      (await axios
        .post("/api/v1/admin/add-placement", formData)
        .then((res) => {
          toast.success(res.data.message);
          axios.post("http://localhost:8080/api/v1/admin/add-notification", {
            message: `Added New Placement Drive - ${con.companyName}`,
          });
          setCon({
            companyName: "",
            driveDate: "",
            editorData: "",
            jdfile: "",
            branchcriteria: [],
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setCon({
            companyName: "",
            driveDate: "",
            editorData: "",
            jdfile: "",
            branchcriteria: [],
          });
        }));
  };
  return (
    <>
      <h4 className="form-title">Add Placement Drive</h4>
      <Card
        className="col-md-11 col-12 mx-auto p-3"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="d-flex justify-content-between flex-wrap">
            <TextField
              id="standard-basic"
              variant="outlined"
              label="company name"
              className="col-md-5 col-12 my-2"
              name="companyName"
              value={con.companyName}
              placeholder="Enter company name.."
              onChange={(e) => setCon({ ...con, companyName: e.target.value })}
            />
            <TextField
              id="date"
              label="Drive date"
              name="driveDate"
              value={con.driveDate}
              onChange={(e) => setCon({ ...con, driveDate: e.target.value })}
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              className="col-md-5 col-12 my-2"
            />
            <TextField
              id="date"
              label="Registration Deadline"
              name="lastApplyDate"
              value={con.lastApplyDate}
              onChange={(e) =>
                setCon({ ...con, lastApplyDate: e.target.value })
              }
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              className="col-md-5 col-12 my-2"
            />
          </div>
          <JoditEditor
            config={{ height: 400 }}
            ref={editor}
            value={con.editorData}
            tabIndex={1}
            onBlur={(newContent) => setCon({ ...con, editorData: newContent })}
            onChange={(newContent) => {}}
          />
          <TextField
            type="file"
            name="jdfile"
            variant="outlined"
            label="Upload JD (max-size:2mb)"
            className="col-md-5 col-12 my-3"
            onChange={(e) => setCon({ ...con, jdfile: e.target.files[0] })}
          />

          <hr />
          <br />
          <h4>Criteria Form:</h4>
          <Typography>pick the candidates who can aply</Typography>
          <FormGroup>
            {[
              "Computer Engineering",
              "IT Engineering",
              "Electronics Engineering",
              "Electronics & Telecommunication Engineering",
            ].map((branch, i) => (
              <FormControlLabel
                control={<Checkbox />}
                label={branch}
                value={branch}
                checked={branches.includes(branch)}
                onChange={handleBranchChange}
              />
            ))}
          </FormGroup>
          <TextField
            type={"number"}
            variant="outlined"
            label="Engineering Aggr % Criteria"
            name="engAggrrpercentCriteria"
            value={con.engAggrrpercentCriteria}
            className="col-md-5 col-12 my-3"
            onChange={(e) =>
              setCon({ ...con, engAggrrpercentCriteria: e.target.value })
            }
          />
          <br />
          {
            <Button
              className="text-center me-3 w-30"
              type="submit"
              variant="contained"
              color="primary"
            >
              Add Drive
            </Button>
          }
          <Button variant="contained" color="secondary">
            Clear
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddPlacement;
