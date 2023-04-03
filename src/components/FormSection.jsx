import { useState } from "react";
import { Space, Input, Button } from "antd";
// import { SendOutlined } from '@ant-design/icons'
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3973055_x1qwjo6x41.js",
});
const { TextArea } = Input;
const FormSection = ({ generateResponse }) => {
  const [newQuestion, setNewQuestion] = useState("");
  // const [canClick,setCanClick] = useState('disabled');
  return (
    <div className="footer">
      <div className="form-section">
        <Space.Compact style={{width:'100%',position:'relative'}}> 
          <TextArea
            autoSize={{ minRows: 2 }}
            className="form-control"
            placeholder="请输入你的问题"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            style={{paddingRight:'54px'}}
          />

          <div className="btn">
            <Button
              type="text"
              className="sendButton"
              disabled={newQuestion.length === 0}
              onClick={() => generateResponse(newQuestion, setNewQuestion)}
              style={{height:"unset"}}
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
