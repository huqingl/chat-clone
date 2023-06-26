import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Space, Form, Input, message } from "antd";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Vertify } from "@alex_xu/react-slider-vertify";

import axios from "axios";
import qs from "qs";
export default function Register() {
  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState(false);
  const [email, setEmail] = useState("");
  const onChange = (_,allvalues) => {
    // console.log(allvalues)
    const result = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
      allvalues.email
    );
    setIsEmail(result);
    setEmail(allvalues.email);
  };
  const onFinish = (values) => {
    axios
      .post("/api/register", qs.stringify(values))
      .then((res) => {
        // console.log(res);
        if (res.data.code === 1) {
          message.success({
            duration: 3,
            content: res.data.msg + ",即将跳转到登录界面",
            onClose: () => {
              navigate("/login");
            },
          });
        } else {
          message.info({ duration: 3, content: res.data.msg });
        }
      });
  };
  const showCaptcha = () => {
    setMaskVisible(true);
    setVisible(true);
  };
  const verifySuccess = () => {
    setVisible(false);
    setMaskVisible(false);
    setCanClick(true);
    setTime(60);
    axios
      .post(
        "/api/register/send_email",
        qs.stringify({ email: email })
      )
      .then((res) => {
        if (res.data.code === 1) {
          message.success({
            duration: 3,
            content: res.data.msg + ", 请到邮箱中查看",
            // onClose: () => {
            //   navigate("/login");
            // },
          });
        } else {
          message.info({ duration: 3, content: res.data.msg });
        }
      });
  };
  const [canClick, setCanClick] = useState(false);
  const [time, setTime] = useState(0);
  const [imgUrl, setImgUrl] = useState('/6.jpg');
  const timer = useRef(null);
  const setImageUrl = ()=> {
    const name = Math.floor(Math.random() * 10 )
    const imgurl = '/' + String(name) + '.jpg'
    console.log(imgurl)
    setImgUrl(imgurl)
  }
  useEffect(() => {
    timer.current && clearInterval(timer.current);
    return () => timer.current && clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (time === 60)
      timer.current = setInterval(() => setTime((time) => --time), 1000);
    else if (time <= 0) {
      setCanClick(false);
      timer.current && clearInterval(timer.current);
    }
  }, [time]);
  const [visible, setVisible] = useState(false);
  const [maskVisible, setMaskVisible] = useState(false);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-96 mobile:w-11/12">
        <p className="text-center m-4">注册账号</p>
        <Form
          name="login"
          className="login-form"
          validateTrigger="onBlur"
          onFinish={onFinish}
          onValuesChange={onChange}
        >
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
            <Input placeholder="请输入您的邮箱" />
          </Form.Item>
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                max: 7,
                message: "请输入您的验证码",
              },
            ]}
          >
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input placeholder="验证码" />
              {/* <Button type="primary" className="bg-blue-400" onClick={getCode}>获取验证码</Button> */}
              <Button
                type="primary"
                className="bg-blue-400"
                disabled={canClick || !isEmail}
                onClick={showCaptcha}
              >
                {time ? `${time}秒后重新获取` : "获取验证码"}
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item
            name="nickname"
            rules={[
              {
                required: true,
                max:20,
                message: "请输入您的昵称",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入您的昵称" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                max:20,
                message: "请输入您的密码",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="请输入您的密码"
            />
          </Form.Item>
          <Form.Item
            name="repassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                max:20,
                message: "请重复您的密码",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码不匹配"));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="请重复您的密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-400"
            >
              注册
            </Button>
          </Form.Item>

          <Form.Item>
            <span>已经注册过账号？请</span>
            <Link to="/login" className="text-blue-500">
              {" "}
              登录
            </Link>
          </Form.Item>
        </Form>
        <div
          className="fixed"
          style={{
            backgroundColor: "white",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 20,
          }}
        >
          <Vertify
            width={340}
            height={240}
            // imgUrl='/6.jpg'
            imgUrl={imgUrl}
            visible={visible}
            onSuccess={verifySuccess}
            onFail={setImageUrl}
            onRefresh={setImageUrl}
          />
        </div>
      </div>
      <div
        className={`${
          maskVisible ? "block" : "hidden"
        } w-full h-full fixed z-10 left-0 top-0 bg-black bg-opacity-50`}
      >
        <div />
      </div>
    </div>
  );
}
