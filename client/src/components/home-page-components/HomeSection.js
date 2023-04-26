import { Box, Button, Typography } from "@material-ui/core";
import "../../styles/homeSection.css";

import { Link } from "react-router-dom";

const HomeSection = () => {
  return (
    <Box className="homeSection col-12">
      <Typography className="home_heading" variant="h3">
        PLACEMENT MANAGEMENT SYSTEM
      </Typography>

      <Typography className="home_quotes" variant="">
        Success is no accident. It is hard work, perseverance, learning,
        studying, sacrifice and most of all, love of what you are doing or
        learning to do
      </Typography>

      <Button className="homeBtn" variant="contained" color="primary">
        <Link to={"/login"}>Login</Link>
      </Button>
    </Box>
  );
};

export default HomeSection;
