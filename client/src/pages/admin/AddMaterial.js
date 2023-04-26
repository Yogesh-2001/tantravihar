import { Checkbox, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";
const AddMaterial = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const formData = new FormData();
    console.log(values);
    formData.append("title", values.title);
    formData.append("material", values.material.file);
    formData.append("description", values.description);
    console.log(formData);
    axios
      .post(
        "http://localhost:8080/api/v1/admin/add-placement-material",
        formData
      )
      .then(async (res) => {
        if (!res.ok) {
          toast.error("File size should be max 2mb");
        }
        axios.post("http://localhost:8080/api/v1/admin/add-notification", {
          message: `Added New Placement Material - ${values.title}`,
        });
        toast.success(res.data);
        form.resetFields();
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
      <Card className="col-md-11 col-12 mx-auto p-3">
        <h4 className="text-center mb-4">Add Placement Material Form</h4>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          encType="multipart/form-data"
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Upload Material"
            rules={[{ required: true, message: "Please input material!" }]}
            name={"material"}
          >
            <Upload
              accept=".pdf,.doc,.docx,.pptx,.xlsx,.xls"
              beforeUpload={() => false}
              // onChange={handlePhotoChange}
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>
                Select Material (max-size):2mb
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddMaterial;
