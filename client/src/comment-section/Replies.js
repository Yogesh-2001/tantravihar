import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  Accordion,
  TextField,
  Button,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

/////////
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaComment } from "react-icons/fa";
import "../styles/replies.css";
////////

const Replies = ({ commentId }) => {
  // commentId = comment._id
  // username = comment.user
  const [replies, setReplies] = useState([]);

  /////////////////////////
  const [answer, setAnswer] = useState("");
  const [auth] = useAuth();
  const { user } = auth;
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put("http://localhost:8080/api/v1/add-reply", {
        // question_id: comment._id,
        question_id: commentId,
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
  ///////////////////////////

  useEffect(() => {
    const getAllReplies = async () => {
      await axios
        .get(`http://localhost:8080/api/v1/get-all-replies/${commentId}`)
        .then((res) => {
          setReplies(res.data.replies);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getAllReplies();
  }, []);

  return (
    <>
      {
        //replies?.length > 0 &&
        <ul className="col-12 d-flex flex-column ">
          <Accordion className="col-12">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <FaComment
                style={{
                  color: "grey",
                  fontSize: "1.5rem",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                Replies({replies?.length})
              </FaComment>{" "}
              {replies?.length}
              {/* <Typography color="primary">
                Replies({replies?.length})
              </Typography> */}
            </AccordionSummary>

            <AccordionDetails className="col-12 d-flex flex-wrap">
              {/*  */}
              <form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <TextField
                  type={"text"}
                  className="col-12 ms-5 mb-3 w-100"
                  variant="standard"
                  placeholder="Add a Reply...."
                  value={answer}
                  required
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <div className="d-flex justify-content-end">
                  {/* <Button variant="text" color="secondary">
                    Cancel
                  </Button> */}
                  <Button type="submit" variant="text" color="primary">
                    Reply
                  </Button>
                </div>
              </form>
              {/*  */}

              {replies.map((reply, index) => (
                <>
                  <Typography className="col-12 replies-css">
                    <li key={index} className="col-12">
                      <div className=" align-items-center col-12">
                        <div style={{ display: "flex", marginTop: "5px" }}>
                          <p className="letter-circle my-auto ">
                            {reply?.user?.toUpperCase().substring(0, 1)}
                          </p>
                          <p
                            className="ms-3 md-8 my-auto flex-wrap reply_css"
                            style={{ color: "black", fontSize: "20px" }}
                          >
                            {reply.reply}
                          </p>
                        </div>

                        <div
                          className="ms-5 mb-3 mt-2"
                          style={{ display: "flex" }}
                        >
                          <h6 className="my-auto">{reply?.user}</h6>
                          <span
                            className="my-auto"
                            style={{
                              color: "grey",
                              marginLeft: "10px",
                              fontSize: "16px",
                              fontWeight: "400",
                            }}
                          >
                            {new Date(reply?.timestamp).toDateString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  </Typography>
                </>
              ))}
            </AccordionDetails>
          </Accordion>
        </ul>
      }
    </>
  );
};

export default Replies;
