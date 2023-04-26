import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Button, Link } from "@material-ui/core";
import moment from "moment";
import { useProfile } from "../../context/ProfileDetailsContext";

const ViewTest = () => {
  const [tests, setTests] = useState([]);
  const { setLoading } = useProfile();

  useEffect(() => {
    const getAllTests = async () => {
      await axios
        .get("http://localhost:8080/api/v1/user/get-all-tests")
        .then((res) => {
          setTests(res.data);
        });
    };
    setLoading(true);
    getAllTests();
    setLoading(false);
  }, []);
  return (
    <>
      <section className="my-2 d-flex justify-content-evenly flex-wrap">
        {tests &&
          tests.map((test, index) => {
            const startDate = moment(test.range[0]);
            const endDate = moment(test.range[1]);
            const now = moment();
            const isDisabled = now.isBefore(startDate) || now.isAfter(endDate);
            return (
              <>
                <Card
                  className="col-md-3 col-12 col-sm-5 p-3 my-4 mx-1 text-center card_box_shadow card_hover_effect"
                  style={{ position: "relative" }}
                >
                  <Typography
                    className="d-flex justify-content-center align-items-center mx-auto my-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "darkmagenta",
                      color: "whitesmoke",
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography variant="h6" className="text-center my-3">
                    {test.title}
                  </Typography>

                  <Typography className="my-2">
                    <b>From</b> :
                    {moment(test.range[0]).format("DD MMM, YYYY - h:mm A")}
                  </Typography>
                  <Typography className="my-2">
                    <b>To </b> :
                    {moment(test.range[1]).format("DD MMM, YYYY - h:mm A")}
                  </Typography>

                  {isDisabled ? (
                    <Button
                      disabled={isDisabled}
                      variant="outlined"
                      color="black"
                      style={{ backgroundColor: "#8f8fd33d" }}
                    >
                      Click Here
                    </Button>
                  ) : (
                    <a
                      className="my-3"
                      href={test.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="black"
                      style={{ backgroundColor: "#8f8fd33d" }}
                    >
                      <Button variant="outlined">Click Here</Button>
                    </a>
                  )}
                </Card>
              </>
            );
          })}
      </section>
    </>
  );
};

export default ViewTest;
