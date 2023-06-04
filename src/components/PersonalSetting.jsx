import { Button, Space, Form, Input, message } from "antd";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function PersonalSetting() {
    const [showChangePassword, setShowChangePassword] = useState(false);

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    const showChangePasswordBox = () => {
        setShowChangePassword(true);
    }
    return (
        <div className="title mt-10">
            <Space>
                <Button onClick={showChangePasswordBox}>修改密码</Button>
                <Button onClick={logOut}>退出登录</Button>
            </Space>
            <div className={`${showChangePassword ? "block" : 'hidden'} mt-6`}>
                <p className="pb-2">修改密码：</p>
                <Form>
                    <Form.Item
                        name="cpassword"
                        rules={[
                            {
                                required: true,
                                message: "请输入您的密码!",
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="请输入当前密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "请输入您的密码!",
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="请输入新密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="repassword"
                        rules={[
                            {
                                required: true,
                                message: "请输入您的密码!",
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="请输入新密码"
                        />
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
    )
}