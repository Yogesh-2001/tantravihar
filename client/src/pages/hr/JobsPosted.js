import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-ui/core";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileDetailsContext";

import { Link } from "react-router-dom";
const JobsPosted = () => {
  const [alldrives, setAllDrives] = useState([]);
  const { setLoading } = useProfile();

  const [{ user }] = useAuth();
  useEffect(() => {
    const getAllDrives = async () => {
      await axios
        .get(`http://localhost:8080/api/v1/hr/get-all-drives/${user._id}`)
        .then((res) => {
          setAllDrives(res.data.drives);
        });
    };

    getAllDrives();
  }, []);
  return (
    <>
      <section className="col-12 d-flex flex-sm-row flex-column justify-content-between p-3 flex-wrap">
        {alldrives.length > 0 &&
          alldrives?.map((drive, index) => {
            return (
              <>
                <Card className="flex-1 p-3 my-3 mx-2" key={index}>
                  <Link
                    to={`/hr/dashboard/${user._id}/view-applicants/${drive._id}`}
                  >
                    <h5>{drive?.companyName}</h5>
                    <Typography>
                      Drive Date :{new Date(drive?.driveDate).toDateString()}
                    </Typography>
                    <Typography>
                      Posted on : {new Date(drive?.postedAt).toDateString()}
                    </Typography>
                    <Typography>
                      No of Applicants :
                      {drive?.applicants?.length > 0
                        ? drive?.applicants?.length
                        : 0}
                    </Typography>
                  </Link>
                </Card>
              </>
            );
          })}
      </section>
    </>
  );
};

export default JobsPosted;
