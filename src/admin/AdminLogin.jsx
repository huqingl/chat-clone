import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
export default function AdminLogin() {
  const atoken = localStorage.getItem("atoken");
  const navigate = useNavigate();
  useEffect(() => {
    if (atoken) {
      navigate("/admin");
    } else {
      return;
    }
  }, [navigate, atoken]);
  const onFinish = (values) => {

    // console.log("Received values of form: ", values);
    axios.post("/api/admin_login", qs.stringify(values)).then((res) => {
      // console.log(res.data);
      if (res.data.code === 1) {
        message.success({
          duration: 2,
          content: res.data.msg + ",即将跳转",
          onClose: () => {
            window.localStorage.setItem("atoken", res.data.token);
            navigate("/admin");
          },
        });
      } else {
        message.info({ duration: 2, content: res.data.msg });
      }
    });
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-96 mobile:w-11/12">
        <p className="text-center m-4">请登录</p>
        <Form name="login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="admin_name"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="请输入您的密码"
            />
          </Form.Item>
          {/* <Space>
            <Form.Item
              name="captcha"
              rules={[
                {
                  required: true,
                  message: "请输入验证码!",
                },
              ]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>

            <div className="pb-6">
              <img
                src="http://192.168.80.13:5000/admin_login/captcha"
                alt="验证码"
              ></img>
            </div>
          </Space> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-400"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
