import { message, Form, Avatar } from "antd";
import { TextField, Button, Typography, Box } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/login.css";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileDetailsContext";
import { useEffect, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
const Login = () => {
  const navigate = useNavigate();
  const { setLoading } = useProfile();
  const [auth, setAuth] = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;

    await axios
      .post("http://localhost:8080/api/v1/auth/login", values)
      .then((res) => {
        localStorage.setItem(
          "authToken",
          JSON.stringify({
            token: res.data.token,
            user: res.data.user,
          })
        );

        setAuth({ ...auth, user: res.data.user, token: res.data.token });

        if (res.data.user.role === 0) {
          navigate("/student/dashboard");
          toast.success("student logIn success");
        } else if (res.data.user.role === 1) {
          navigate("/admin/dashboard");
          toast.success("admin logIn success");
        } else if (res.data.user.role === 2) {
          navigate(`/hr/dashboard/${res.data.user._id}/jobs-posted`);
          toast.success("hr logIn success");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <section className="login col-11 d-flex text-center mt-1">
        <div className="col-md-6">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png" />
        </div>
        <div className="col-md-5 col-11 mx-auto">
          <Typography
            className="heading"
            style={{ justifyContent: "flex-start" }}
          >
            {"Welcome Back :)"}
          </Typography>
          <Typography className="heading2">
            Get ready to experience seamless access to your account with just
            one click. 🔔
          </Typography>

          <Form
            style={{
              // boxShadow: "1px 2px 10px aqua",
              background: "transparent",
              padding: "20px 10px",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* <Avatar className=" avatar my-3">
              <LockOutlinedIcon />
            </Avatar> */}

            {/* <h4>Sign In</h4> */}

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircleIcon
                  className=""
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="input-with-sx"
                  label="Email Address"
                  variant="filled"
                  type={"email"}
                  placeholder="Enter email address"
                  className="col-10"
                />
              </Box>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockIcon
                  className=""
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="input-with-sx"
                  variant="filled"
                  type={"password"}
                  label="Password"
                  placeholder="Enter Password"
                  className="col-10"
                />
              </Box>
            </Form.Item>

            <Button
              className="col-lg-5 col-md-8 col-sm-10 col-10 mx-auto"
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Login;
