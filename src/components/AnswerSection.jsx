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
      <div className="overflow-hidden h-full">
        <div className="h-full overflow-y-auto">
          <div className="w-full flex pb-4 border-gray-300 bg-gray-100 py-5 pl-2.5">
            <div className="pr-5">
              <IconFont
                type="icon-openai-icon"
                style={{ fontSize: "24px", color: "green" }}
              />
            </div>
            <div className="pt-0.5">
              <p>欢迎使用，使用 AI 的强大功能为您探索这个世界。</p>
              <p>请在下面输入您的问题与 AI 进行对话。</p>
            </div>
          </div>
          <div className="w-3/5 mt-0 mx-auto" >
            {storedValues.map((value, index) => {
              const person =
                value.role === "user" ? "icon-human" : "icon-openai-icon";
              const logoColor =
                value.role === "user"
                  ? { fontSize: "24px", color: "red" }
                  : { fontSize: "24px", color: "green" };
              return (
                <div className="text-base odd:bg-gray-200" key={index}>
                  <div className="py-5 pr-5 pl-2.5">
                    <div className="pr-5">
                      <IconFont type={person} style={logoColor} />
                    </div>
                    <div className="text-base pt-0.5" style={{whiteSpace:'pre-line'}}>
                      <HighlightedResponse response={value.content} />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="w-full h-52" ref={messagesEndRef}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerSection;
