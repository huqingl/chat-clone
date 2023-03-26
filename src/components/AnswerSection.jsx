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
              const person = value.role === 'user' ? 'icon-human' : 'icon-openai-icon';
              const logoColor = value.role === 'user' ? { fontSize: "20px", color: 'red' } : { fontSize: "20px", color: 'green' };
              return (
                <div className="answer-section" key={index}>
                  <div className="answer">
                    <div className="logo">
                      <IconFont
                        type={person}
                        style={logoColor}
                      />
                    </div>
                    <div className="answer-content"><HighlightedResponse response={value.content} /></div>
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
