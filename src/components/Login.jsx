import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
export default function Login() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      return;
    }
  }, [navigate, token]);
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    axios
      .post("/api/login", qs.stringify(values))
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 1) {
          localStorage.setItem('userid',values.email)
          message.success({
            duration: 2,
            content: res.data.msg + ",即将跳转",
            onClose: () => {
              window.localStorage.setItem("token", res.data.token);
              navigate("/");
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
            name="email"
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
            <Input prefix={<UserOutlined />} placeholder="请输入您的邮箱" />
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-400"
            >
              登录
            </Button>
          </Form.Item>

          <Form.Item>
            <span>还没有账号？请</span>
            <Link to="/register" className="text-blue-400">
              {" "}
              注册
            </Link>
            <span>, 忘记密码，请</span>
            <Link to="/reset" className="text-blue-400">
              {" "}
              重置密码
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
