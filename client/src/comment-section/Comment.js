import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { toast } from "react-toastify";
import axios from "axios";
import Replies from "./Replies";
import { useAuth } from "../context/AuthContext";

const Comment = ({ comment }) => {
  const [togglereply, setToggleReply] = useState(false);
  const [answer, setAnswer] = useState("");
  const [auth] = useAuth();
  const { user } = auth;
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put("http://localhost:8080/api/v1/add-reply", {
        question_id: comment._id,
        username: user.name,
        reply: answer,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      {/* swapnil work */}
      <div className=" align-items-center col-12" style={{}}>
        <div className="" style={{ display: "flex", marginTop: "5px" }}>
          <p className="letter-circle my-auto " style={{}}>
            {comment.user.name?.toUpperCase().substring(0, 1)}
          </p>
          <p
            className="ms-3 md-8 my-auto flex-wrap "
            style={{ color: "black", fontSize: "18px" }}
          >
            {comment.question}
          </p>
        </div>

        <div className="ms-5 mb-3 mt-2" style={{ display: "flex" }}>
          <h6 className="my-auto">{comment.user.name}</h6>
          <span
            className="my-auto"
            style={{
              color: "grey",
              marginLeft: "10px",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            {new Date(comment?.timeStamp).toDateString()}
          </span>
        </div>
      </div>
      <Replies commentId={comment._id} />
    </>
  );
};

export default Comment;
