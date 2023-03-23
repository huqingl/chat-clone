import { useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;
const FormSection = ({ generateResponse }) => {
  const [newQuestion, setNewQuestion] = useState("");
  return (
    <div className="form-section">
      <TextArea
        rows={2}
        className="form-control"
        placeholder="请输入你的问题"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />
      <button
        className="btn"
        onClick={() => generateResponse(newQuestion, setNewQuestion)}
      >
        Generate Response
      </button>
    </div>
  );
};

export default FormSection;
