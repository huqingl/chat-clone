import { Button, Space, Form, Input, message } from "antd";
import axios from "axios";
import qs from "qs";
import { useState, useEffect } from "react";
export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [wechat, setWechat] = useState("");
  useEffect(() => {
    axios.get("/api/contact_front/get").then((res) => {
      setEmail(res.data.data.email);
      setWechat("/api/" + res.data.data.wechat_img);
    });
  }, []);
  return (
    <div className="title mt-10">
      <p>我们暂时不提供在线充值服务，如有需要，请联系：</p>
      <p className="text-base mt-2">
        <span className="font-bold">Email: </span>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p className="text-base mt-2">
        <span className="font-bold">微信: </span>
        <span>
          <img width={200} height={200} className="inline-block" src={wechat} alt="" />
        </span>
      </p>
    </div>
  );
}
