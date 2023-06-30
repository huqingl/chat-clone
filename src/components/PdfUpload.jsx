import { useState, useEffect } from "react";
import { Button, Upload, message, Spin } from "antd";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Dragger } = Upload;

export default function PdfUpload() {
  //   const [canClick, setCanClick] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const props = {
    name: "pdf",
    maxCount: 1,
    showUploadList: false,
    action: "/api/pdf_handler/upload",
    data: {
      token: token,
    },
    beforeUpload: (file, fileList) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error("文件格式不正确");
      }
      return isPDF;
    },
    onChange: ({ file }) => {
      setLoading(true);
      if (file.status === "done") {
        if (file.response.code === 1) {
          //   setCanClick(false);
          message.success(file.response.msg);
          setLoading(false);
          navigate('/pdf-chat')
        } else {
          message.error("上传失败");
        }
      }
    },
  };
  return (
    <div className="w-full h-full flex p-8 flex-col justify-center">
      <p className="w-full text-center mb-4">chat with PDF</p>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">将文件拖到此处或点击上传</p>
        <p className="ant-upload-hint"></p>
      </Dragger>
      <Spin indicator={<LoadingOutlined />} spinning={loading} size="large" />
    </div>
  );
}
