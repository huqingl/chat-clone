import { createFromIconfontCN } from "@ant-design/icons";

import HighlightedResponse from "./HighlightedResponce";
import { useEffect, useRef } from "react";
//引入阿里IconFont图标
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3973055_x1qwjo6x41.js",
});

const AnswerSection = ({ storedValues }) => {
  //随着内容增加，自动滚动到底部
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [storedValues]);
  return (
    <>
      <div className="answer-container">
        <div className="answer-wrapper">
          <div className="answer-content">
            {storedValues.map((value, index) => {
              const person =
                value.role === "user" ? "icon-human" : "icon-openai-icon";
              const logoColor =
                value.role === "user"
                  ? { fontSize: "20px", color: "red" }
                  : { fontSize: "20px", color: "green" };
              return (
                <div className="answer-section" key={index}>
                  <div className="answer">
                    <div className="logo">
                      <IconFont type={person} style={logoColor} />
                    </div>
                    <div className="answer-content">
                      <HighlightedResponse response={value.content} />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="fill-bottom" ref={messagesEndRef}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerSection;
