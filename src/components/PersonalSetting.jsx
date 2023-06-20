import { Button, Space, Form, Input, message } from "antd";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function PersonalSetting() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const userid = localStorage.getItem('userid')
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const showChangePasswordBox = () => {
    setShowChangePassword(true);
  };
  const onFinish = (values) => {
    const data = values;
    const token = localStorage.getItem("token");
    data.token = token;
    axios.post("/api/login/change_password", qs.stringify(data)).then((res) => {
      if (res.data.code === 1) {
        message.success({
          duration: 3,
          content: res.data.msg,
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        message.info({ duration: 3, content: res.data.msg });
      }
    });
  };
  return (
    <div className="title mt-6">
      <p className="mb-4 text-sm"><span>当前用户：</span><span>{userid}</span></p>
      <Space>
        <Button onClick={showChangePasswordBox}>修改密码</Button>
        <Button onClick={logOut}>退出登录</Button>
      </Space>
      <div className={`${showChangePassword ? "block" : "hidden"} mt-6`}>
        <p className="pb-2">修改密码：</p>
        <Form
          name="change"
          className="change-form"
          validateTrigger="onBlur"
          onFinish={onFinish}
        >
          <Form.Item
            name="old_password"
            rules={[
              {
                required: true,
                message: "请输入您的密码!",
              },
            ]}
          >
            <Input type="password" placeholder="请输入当前密码" />
          </Form.Item>
          <Form.Item
            name="new_password"
            rules={[
              {
                required: true,
                max: 20,
                message: "请输入您的密码!",
              },
            ]}
          >
            <Input type="password" placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item
            name="repassword"
            rules={[
              {
                required: true,
                max: 20,
                message: "请输入您的密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码不匹配"));
                },
              }),
            ]}
          >
            <Input type="password" placeholder="请重复您的密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-400"
            >
              确认
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
