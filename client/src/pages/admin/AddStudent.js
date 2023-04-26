import { message, Form, Select } from "antd";
import { TextField, Button, Avatar, Card } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";
import axios from "axios";
const AddStudent = () => {
  const onFinish = (values) => {
    axios
      .post("http://localhost:8080/api/v1/admin/add-student", values)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        toast.error("please login with vit mail id");
      });
  };

  const onFinishFailed = (errorInfo) => {
    toast.success(errorInfo.data.message);
    console.log("Failed:", errorInfo);
  };
  return (
    <Card
      className="col-lg-6 col-md-8 col-12 mx-auto p-3 mt-4"
      style={{
        boxShadow:
          " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {/* <Avatar className="add-student-avatar">
          <AddIcon />
        </Avatar> */}
        <h4 className="form-title">Add Student</h4>

        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <TextField
            type={"text"}
            label="Name"
            placeholder="enter name"
            variant="standard"
            className="col-12 my-3"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your valid email!" },
          ]}
        >
          <TextField
            type={"email"}
            label="Email"
            placeholder="enter valid email"
            variant="standard"
            className="col-12 my-3"
          />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select
            defaultValue="Student"
            className="col-12 my-3"
            options={[
              { value: 0, label: "Student" },
              { value: 1, label: "Admin" },
              { value: 2, label: "Company HR" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <TextField
            type={"password"}
            label="Password"
            placeholder="enter password"
            variant="standard"
            className="col-12 my-3"
          />
        </Form.Item>

        <Button
          className="col-12"
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Student
        </Button>
      </Form>
    </Card>
  );
};

export default AddStudent;
