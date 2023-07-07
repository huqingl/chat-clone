import { useState, useEffect } from "react";
import { Button, Upload, message, Spin } from "antd";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, createSearchParams } from "react-router-dom";

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
      // console.log(file)
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
          const record = {
            original_name: file.name,
            target_name: file.response.pdf_url,
          };
          const recordArray = [...uploadHistory, record];
          localStorage.setItem("uploadHistory", JSON.stringify(recordArray));
          message.success({
            duration: 2,
            content: file.response.msg,
            onClose: () => {
              setLoading(false);
              const params = { name: file.response.pdf_url };
              navigate({
                pathname: "/pdf-chat",
                search: `?${createSearchParams(params)}`,
              });
            },
          });
        } else {
          message.error("上传失败");
          setLoading(false);
        }
      }
    },
  };
  const [uploadHistory, setUploadHistory] = useState([]);
  useEffect(() => {
    const history = localStorage.getItem("uploadHistory")
      ? localStorage.getItem("uploadHistory")
      : "[]";
    // console.log(history);
    setUploadHistory(JSON.parse(history));
  }, []);
  const goPdf = (target) => {
    const params = { name: target};
    navigate({
      pathname: "/pdf-chat",
      search: `?${createSearchParams(params)}`,
    });
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
      <div className="upload-history w-3/6 mx-auto pt-10">
        <p className="text-base mb-2">上传历史：</p>
        {uploadHistory.map((value, index) => {
          return (
            <div key={index} className="pl-2">
              <p>
                <span
                  className="cursor-pointer border-b-2 text-base"
                  onClick={() => goPdf(value.target_name)}
                >
                  {value.original_name}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
