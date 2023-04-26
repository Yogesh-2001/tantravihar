import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Paper } from "@material-ui/core";
const ViewNotices = () => {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/api/v1/user/get-all-notices`)
        .then((res) => {
          setNotices(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);
  return (
    <>
      <Paper
        className="col-12 p-3"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <h4 className="form-title">Placement Notices</h4>
        <section className="d-flex flex-wrap flex-column">
          {notices.reverse()?.map((m, index) => (
            <>
              <Card className="col-12 p-4 my-3 card_box_shadow card_hover_effect ">
                <h6 className="mb-4">
                  By- {"Yogesh Yewale (TPO CELL)"} -
                  {new Date(m?.postedAt).toDateString()}
                </h6>
                <div
                  dangerouslySetInnerHTML={{ __html: JSON.parse(m.editorData) }}
                />
              </Card>
            </>
          ))}
        </section>
      </Paper>
    </>
  );
};

export default ViewNotices;
