import { DatePicker, Form, Input, message, Radio, Select, Upload } from "antd";
import { Box, Button, Card, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";

const CreateProfile = () => {
  const [details, setDetails] = useState();
  const [form] = Form.useForm();
  const params = useParams();
  const id = params.id;
  const [{ user }] = useAuth();

  useEffect(() => {
    const getprofiledetails = async () => {
      await axios
        .get(
          `http://localhost:8080/api/v1/user/get-profile-details/${params.id}`
        )
        .then((res) => {
          setDetails(res.data[0]);
        });
    };
    id && getprofiledetails();
  }, [id]);

  useEffect(() => {
    console.log(details);
    form.setFieldsValue(details);
  }, [details]);

  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    // formData.append("resume", values.resume.file);
    // formData.append("photourl", values.photourl.file);
    formData.append("branch", values.branch);
    formData.append("engineering_division", values.engineering_division);
    formData.append("engineeringpercent", values.engineeringpercent);
    formData.append("engineeringAggrpercent", values.engineeringAggrpercent);
    formData.append("liveKt", values.liveKt);
    formData.append("user", user?._id);

    if (id && values.resume.file) {
      formData.append("resume", values.resume.file);
    } else if (id && values.photourl.file) {
      formData.append("photourl", values.photourl.file);
    } else if (id && values.resume.file && values.photourl.file) {
      formData.append("resume", values.resume.file);
      formData.append("photourl", values.photourl.file);
    } else if (id && !values.resume.file && !values.photourl.file) {
      formData.append("resume", values.resume);
      formData.append("photourl", values.photourl);
    } else {
      formData.append("resume", values.resume.file);
      formData.append("photourl", values.photourl.file);
    }
    if (id) {
      console.log(formData);
      axios
        .put("http://localhost:8080/api/v1/user/update-profile", formData)
        .then((res) => {
          toast.success(res.data.message);
          // alert(res.data.message);
        })
        .catch((error) => {
          toast.error("failed to update profile");
        });
    } else {
      axios
        .post("http://localhost:8080/api/v1/user/create-profile", formData)
        .then((res) => {
          setDetails();
          toast.success(res.data.message);
          form.resetFields();
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <Card className="col-md-11 col-sm-11 col-12 mx-auto py-3 px-2 my-3">
      {id ? (
        <h4 style={{ color: "var(--form-heading-color)" }}>Update Profile</h4>
      ) : (
        <h4 style={{ color: "var(--form-heading-color)" }}>Create Profile</h4>
      )}
      {
        <Form
          onFinish={onFinish}
          form={form}
          initialValues={details}
          layout={"vertical"}
          className="d-flex justify-content-between flex-wrap"
          encType="multipart/form-data"
        >
          <Form.Item
            label="profile photo"
            rules={[{ required: true, message: "Please input your photo!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
            required
            name="photourl"
          >
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              // onChange={handlePhotoChange}
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>Select Photo</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="branch"
            label="Engineering Branch"
            rules={[{ required: true, message: "Please input your branch!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Select>
              <Select.Option value="Computer Engineering">
                Computer Engineering
              </Select.Option>
              <Select.Option value="IT Engineering">
                IT Engineering
              </Select.Option>
              <Select.Option value="Electronics Engineering">
                Electronics Engineering
              </Select.Option>
              <Select.Option value="Electronics & Telecommunication Engineering">
                Electronics & Telecommunication Engineering
              </Select.Option>
              <Select.Option value="Bio-Medical Engineering">
                Bio-Medical Engineering
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="engineering_division"
            label="Engineering Division"
            rules={[{ required: true, message: "Please input your division!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Select>
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="engineeringpercent"
            label="Engineering %"
            rules={[{ required: true, message: "Please input your %!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="engineeringAggrpercent"
            label="Engineering Aggregate CGPA"
            rules={[{ required: true, message: "Please input your cgpa!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="liveKt"
            label="Live KT"
            rules={[{ required: true, message: "Please input your kt!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Select>
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="upload resume"
            rules={[{ required: true, message: "Please select a resume" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
            name="resume"
          >
            <Upload accept=".pdf" beforeUpload={() => false} multiple={false}>
              <Button icon={<UploadOutlined />}>Select Resume</Button>
            </Upload>
          </Form.Item>

          <div className="col-12 text-center ">
            {id ? (
              <Button variant="contained" color="primary" type="submit">
                Edit
              </Button>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      }
    </Card>
  );
};

export default CreateProfile;
