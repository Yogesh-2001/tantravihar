import React, { useState } from "react";
import { TextField, Button, Card } from "@material-ui/core";
import axios from "axios";
import { Typography } from "antd";
import { toast } from "react-toastify";
import Comments from "./Comments";
import { useAuth } from "../context/AuthContext";
import "../styles/replies.css";
const Home = () => {
  const [question, setQuestion] = useState("");
  const [auth] = useAuth();
  const { user } = auth;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/api/v1/add-query", {
        question,
        user: user,
      })
      .then((res) => {
        // setAskedQuestion(res.data.query);
        window.location.reload();
        toast.success(res.data.message);
        setQuestion("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <main className="col-11 mx-auto d-flex flex-wrap justify-content-between py-1 home-replies-css">
        <Card className="col-lg-11 col-12 mx-auto p-2 mb-2">
          <h4 className="text-center">Discussion Forum</h4>
          <h6 className="text-center">
            where students,admin,& hr's can communicate with each other
          </h6>
        </Card>
        <Card className="col-lg-11 col-12 mx-auto p-2 ">
          <form
            className="justify-content-between"
            onSubmit={handleSubmit}
            style={{ position: "relative" }}
          >
            <TextField
              className="col-12 my-1 mb-1"
              type="text"
              label={
                <Typography style={{ fontSize: "1rem", marginTop: "-10px" }}>
                  Have a question ?
                </Typography>
              }
              multiline
              minRows={3}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button
              className="my-auto"
              variant="contained"
              color="primary"
              type="submit"
              style={{ position: "absolute", top: "15px", right: "20px" }}
            >
              Ask Question
            </Button>
          </form>
        </Card>
        <Card className="col-lg-11 col-12 mx-auto my-3 py-1 px-2 ">
          <Comments />
        </Card>
      </main>
    </>
  );
};

export default Home;
