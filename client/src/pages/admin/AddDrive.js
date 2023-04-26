import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Toolbar } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { Card } from "@material-ui/core";

const toolbarOptions = {
  container: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
  handlers: {
    // Custom handler functions can be defined here
  },
};

const AddDrive = () => {
  const [editorContent, setEditorContent] = useState("");
  useEffect(() => {
    const editor = new Quill("#editor", {
      theme: "snow",
    });

    editor.on("text-change", () => {
      setEditorContent(editor.root.innerHTML);
    });
  }, []);
  return (
    <>
      <Card className="col-md-11 col-12 mx-auto p-3 card_box_shadow">
        <ReactQuill
          theme="snow"
          value={editorContent}
          id="editor"
          modules={{ toolbar: toolbarOptions }}
        />
      </Card>
    </>
  );
};

export default AddDrive;
