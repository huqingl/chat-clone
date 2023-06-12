import { createFromIconfontCN } from "@ant-design/icons";
import { Spin } from "antd";
// import HighlightedResponse from "./HighlightedResponce";
import { useEffect, useRef } from "react";
//引入阿里IconFont图标
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3973055_x1qwjo6x41.js",
});

const AnswerSection = ({ storedValues, canInput, loading }) => {
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
      <div className="answer-container overflow-hidden h-full">
        <div className="answer-wrapper h-full overflow-y-auto">
          <div className="prompt-wrapper border-gray-300 bg-gray-100">
            <div className="prompt mobile:w-11/12 w-3/5 mt-0 mx-auto flex pb-4  py-5">
              <div className="pr-5 mobile:pr-2.5">
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
          </div>
          <div className="answer-content-box ">
            {storedValues.map((value, index) => {
              const person =
                value.role === "user" ? "icon-human" : "icon-openai-icon";
              const logoColor =
                value.role === "user"
                  ? { fontSize: "24px", color: "red" }
                  : { fontSize: "24px", color: "green" };
              return (
                <div
                  className={`${
                    value.role === "assistant" ? "bg-gray-100" : ""
                  } answer-section-wrapper w-full`}
                  style={{ borderBottom: "1px solid #eee" }}
                  key={index}
                >
                  <div className="answer-section mobile:w-11/12 w-3/5 mt-0 mx-auto text-base ">
                    <div className="answer flex py-5">
                      <div className="logo pr-5 .shrink-0 mobile:pr-2.5">
                        <IconFont type={person} style={logoColor} />
                      </div>
                      <div
                        className="answer-content basis-auto flex-1 overflow-hidden text-base pt-0.5"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {/* <HighlightedResponse response={value.content} /> */}
                        <div className="answer" dangerouslySetInnerHTML={{__html:value.content}}></div>
                        <span
                          className={
                            value.role === "assistant" &&
                            index === storedValues.length - 1 &&
                            canInput
                              ? "block cursor"
                              : "hidden"
                          }
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className={`${
                loading ? "block" : "hidden"
              } pre-answer border-gray-300 bg-gray-100`}
            >
              <div className="prompt mobile:w-11/12 w-3/5 mt-0 mx-auto flex pb-4  py-5">
                <div className="pr-5 mobile:pr-2.5">
                  <IconFont
                    type="icon-openai-icon"
                    style={{ fontSize: "24px", color: "green" }}
                  />
                </div>
                <div className="pt-0.5">
                  <Spin spinning={loading}></Spin>
                </div>
              </div>
            </div>
            <div className="fill-bottom w-full h-52" ref={messagesEndRef}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerSection;
