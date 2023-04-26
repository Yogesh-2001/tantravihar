import React from "react";

import { Card, CardContent, Typography } from "@material-ui/core";
import "../styles/footer.css";

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-upSide">
          <div className="container col-md-6 col-lg-8">
            <Card
              className="footer-card"
              style={{ border: "none", boxShadow: "none" }}
            >
              <CardContent>
                <Typography>Vidyalankar Institute of Technology</Typography>
                <Typography>
                  <a href="#">Visit Us</a>
                </Typography>
                <Typography>
                  <a href="#">Contact Us</a>
                </Typography>
                <Typography>
                  <a href="#">Emergency Contact</a>
                </Typography>
                <Typography>
                  <a href="#">Public Information</a>
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="footer-card"
              style={{ border: "none", boxShadow: "none" }}
            >
              <CardContent>
                <Typography>Our facilities</Typography>
                <Typography>Libraries</Typography>
                <Typography>Conferences</Typography>
                <Typography>IT support</Typography>
                <Typography>Sports</Typography>
              </CardContent>
            </Card>

            <Card
              className="footer-card"
              style={{ border: "none", boxShadow: "none" }}
            >
              <CardContent>
                <Typography>
                  Capt.Sachin Sawant:
                  <br />
                  <a href="mailto:sachin.sawant1@vit.edu.in">
                    sachin.sawant1@vit.edu.in
                  </a>
                </Typography>
                <Typography>
                  Sameer Engineer:
                  <br />
                  <a href="mailto:sameer.engineer@vit.edu.in">
                    sachin.sawant1@vit.edu.in
                  </a>
                </Typography>
                <Typography>
                  <strong>Office Timings</strong>: 9.00am to 6.00pm
                </Typography>
                <Typography>
                  <strong>Telephone Extension</strong>: 1801
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="footer-rightSide">
            <FaFacebook className="sicon" />
            <FaInstagram className="sicon" />
            <FaTwitter className="sicon" />
            <FaYoutube className="sicon" />
          </div>
        </div>

        <div className="footer-downSide">
          <div className="col-md-3 ">
            <img
              className="footer-logo"
              src="https://vit.edu.in/images/logo_vit2.png"
            />
          </div>
        </div>

        {/* <div className="footer-bottom">
          <hr
            style={{
              background: "white",
              color: "white",
              borderColor: "white",
              height: "5px",
              width: "95%",
              margin: "auto",
            }}
          />
          <Typography className="footer-bottom-typo">
            Copyright Vit. Registered no. ####
          </Typography>
        </div> */}
      </footer>
    </>
  );
};

export default Footer;
