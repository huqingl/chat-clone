import { useState } from "react";
import { Input } from "antd";
// import { SendOutlined } from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3973055_q1v51b0wk8o.js',
});
const { TextArea } = Input;
const FormSection = ({ generateResponse }) => {
  const [newQuestion, setNewQuestion] = useState("");
  return (
    <div className="form-section">
      <TextArea
        autoSize={{ minRows: 2 }}
        className="form-control"
        placeholder="请输入你的问题"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />

      <div
        className="btn"
        onClick={() => generateResponse(newQuestion, setNewQuestion)}
      ><IconFont type="icon-send" style={{fontSize:"34px"}}/></div>
    </div>
  );
};

export default FormSection;
