import { LinearProgress } from "@material-ui/core";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileDetailsContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
const ViewProfile = () => {
  const [{ user }] = useAuth();
  const { setLoading } = useProfile();
  const params = useParams();
  const [myprofile, setMyProfile] = useState();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const getuserdetails = async () => {
      await axios
        .get(`/api/v1/user/get-profile-details/${params.id}`)
        .then((res) => {
          setMyProfile(res.data[0]);
        });
    };
    setLoading(true);
    getuserdetails();
    setLoading(false);
  }, []);
  const handleViewMaterial = (material) => {
    setSelectedMaterial(material);
    setModal(true);
  };
  return (
    <>
      {myprofile ? (
        <section className="d-flex flex-wrap">
          <aside className="col-md-5 col-5 mx-auto d-flex flex-column align-items-center justify-content-center">
            <img
              src={`http://localhost:8080/uploads/profileimages/${myprofile?.photourl}`}
              className="col-md-6 mb-3"
              style={{ width: "380px" }}
            />
            <Typography variant="h4" color="secondary">
              {myprofile?.name}
            </Typography>
          </aside>

          <aside className="col-md-7 col-11 mx-auto">
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6">Personal Information</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={5}>
                  <Typography variant="body1">Name</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile && myprofile?.user.name}
                  </Typography>
                </Grid>

                {/* <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">{myprofile?.address}</Typography>
                </Grid> */}
              </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Contact Information</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={5}>
                  <Typography variant="body1">Email Address</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile?.user.email}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Educational Information</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={5}>
                  <Typography variant="body1">Branch</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">{myprofile?.branch}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Division</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile?.engineering_division}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Engg. Aggeregate CGPA</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile?.engineeringAggrpercent} cgpa
                  </Typography>
                </Grid>

                <Grid item xs={5}>
                  <Typography variant="body1">Engg. Aggeregate %</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    {myprofile?.engineeringpercent} %
                  </Typography>
                </Grid>

                <Grid item xs={5}>
                  <Typography variant="body1">Live KT</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">{myprofile?.liveKt}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">View Resume</Typography>
                </Grid>
                <Grid item xs={2}>
                  :
                </Grid>
                <Grid item xs={5}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleViewMaterial(myprofile)}
                  >
                    View Resume
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {myprofile && (
              <Link to={`/student/dashboard/edit-student/${myprofile?._id}`}>
                <Button
                  sx={{ mt: 5 }}
                  variant="contained"
                  color="secondary"
                  className="my-3"
                >
                  Edit Profile
                </Button>
              </Link>
            )}
            {selectedMaterial && modal && (
              <Modal
                setModal={setModal}
                resume={`http://localhost:8080/uploads/resumes/${selectedMaterial?.resume}`}
              />
            )}
          </aside>
        </section>
      ) : (
        <LinearProgress color="secondary" />
      )}
    </>
  );
};

export default ViewProfile;
