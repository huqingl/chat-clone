import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
export default function Login() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="w-full h-full flex p-8 flex-col justify-center items-center">
      <div className="w-96 mt-8">
        <p className="text-center m-4">请登录</p>
        <Form name="login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
            />
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
            <span>还没有账号？请</span><Link to="/register" className="text-blue-500"> 注册</Link><span>, 忘记密码，请</span><Link to="/reset" className="text-blue-400"> 重置密码</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
