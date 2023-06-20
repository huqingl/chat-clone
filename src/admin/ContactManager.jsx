import { Button, Space, Form, Input, message, Upload } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
export default function ContactManager() {
  const [imageUrl, setImageUrl] = useState();
  const [fileList, setFileList] = useState([]);
  const token = localStorage.getItem("atoken");
  const beforeUpload = (file, fileList) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    // setFileList([...fileList, file]);
    return isLt2M && isJpgOrPng;
  };
  const handlePreview = (file) => {
    console.log(file);
    setImageUrl(file.url || file.thumbUrl);
  };
  const handleChange = ({ file, fileList }) => {
    setFileList(fileList);
    console.log(fileList);
  };
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("token", token);
    formData.append("wechat_img", fileList[0].originFileObj);
    axios( {
      method: "post",
      url:'/api/contact_back/set',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res)=>{
      if (res.data.code === 1) {
        message.success({
          duration: 3,
          content: res.data.msg,
          onClose: () => {
            window.location.reload()
          },
        });
      }else {
        message.info({ duration: 3, content: res.data.msg });
      }
    });
  };
  return (
    <div className="form">
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          label="邮箱："
          rules={[
            {
              type: "email",
              message: "请输入正确的邮箱",
            },
            {
              required: true,
              message: "请输入正确的邮箱",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="微信">
          <Upload
            name="wexin"
            listType="picture-card"
            className="avatar-uploader"
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={1}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <PlusOutlined />
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className=" bg-blue-400">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
