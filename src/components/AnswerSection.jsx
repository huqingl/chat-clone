import { createFromIconfontCN } from "@ant-design/icons";

import HighlightedResponse from "./HighlightedResponce"

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3973055_q1v51b0wk8o.js",
});


const AnswerSection = ({ storedValues }) => {
  return (
    <>
      <div className="answer-container">
        {/* <h2>chatGPT clone</h2> */}
        <div className="answer-wrapper">
          <div className="answer-content">
            {storedValues.map((value, index) => {
              return (
                <div className="answer-section" key={index}>
                  <div className="question">
                    <div className="logo">
                      <IconFont
                        type="icon-human"
                        style={{ fontSize: "20px", color: "red" }}
                      />
                    </div>
                    <div>{value.question}</div>
                  </div>
                  <div className="answer">
                    <div className="logo">
                      <IconFont
                        type="icon-openai-icon"
                        style={{ fontSize: "20px", color: "green" }}
                      />
                    </div>
                    <div className="answer-content"><HighlightedResponse response={value.answer} /></div>
                  </div>
                </div>
              );
            })}
            <div style={{ padding: "20px 0" }}>
              
            </div>
            <div className="fill-bottom"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerSection;
