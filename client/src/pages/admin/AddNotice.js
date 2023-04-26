import { Button, Card, TextField, TextareaAutosize } from "@material-ui/core";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
const AddNotice = () => {
  const [editorData, setEditorData] = useState("");
  const editor = useRef("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(editorData));
    await axios
      .post("/api/v1/admin/add-notice", {
        editorData: JSON.stringify(editorData),
      })
      .then((res) => {
        toast.success(res.data.message);
        axios.post("http://localhost:8080/api/v1/admin/add-notification", {
          message: `Added New Placement Notice `,
        });
        setEditorData("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Card
        className="col-md-11 col-12 mx-auto p-3 my-3"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <form onSubmit={handleSubmit}>
          <h4 className="form-title"> Add placement notice</h4>
          <JoditEditor
            config={{ height: 400 }}
            ref={editor}
            value={editorData}
            tabIndex={1}
            onBlur={(newContent) => setEditorData(newContent)}
          />
          {/* <TextField
            label="description"
            multiline
            rows={6}
            placeholder="Enter your text here"
            value={state.description}
            variant="outlined"
            className="my-3 col-12"
            name="Description"
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          /> */}

          <Button
            variant="contained"
            color="primary"
            className="my-3 me-3"
            type="submit"
          >
            Add Notice
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="my-3"
            onClick={() => setEditorData(" ")}
          >
            Clear
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddNotice;
