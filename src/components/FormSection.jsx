import { useState } from "react";
import { Input, Button, Space } from "antd";
// import { SendOutlined } from '@ant-design/icons'
import { createFromIconfontCN } from "@ant-design/icons";
//引入阿里IconFont图标
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3973055_x1qwjo6x41.js",
});
const { TextArea } = Input;
const FormSection = ({ generateResponse ,canInput}) => {
  const [newQuestion, setNewQuestion] = useState("");
  //回车提交，阻止换行
  const onPressEnter = (e) => {
    e.preventDefault()
    if (newQuestion.length === 0) {
      return false;
    } else {
      generateResponse(newQuestion, setNewQuestion,true);
    }
  };
  return (
    <div className="footer">
      <div className="form-section">
        <Space.Compact style={{ width: "100%", position: "relative" }}>
          <TextArea
            autoSize={{ minRows: 2 }}
            className="form-control"
            placeholder="请输入你的问题"
            disabled={canInput}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onPressEnter={(e)=>onPressEnter(e)}
            style={{ paddingRight: "54px" }}
          />

          <div className="btn">
            <Button
              type="text"
              className="sendButton"
              disabled={newQuestion.length === 0}
              onClick={() => generateResponse(newQuestion, setNewQuestion,canInput)}
              style={{ height: "unset" }}
            >
              <IconFont type="icon-send1" style={{ fontSize: "34px" }} />
            </Button>
          </div>
        </Space.Compact>
      </div>
      <div className="description"></div>
    </div>
  );
};

export default FormSection;
