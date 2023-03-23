import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3973055_q1v51b0wk8o.js',
});
const AnswerSection = ({ storedValues }) => {
  return (
    <>
      <div className="answer-container">
        <h2>chatGPT clone</h2>
        {storedValues.map((value, index) => {
          return (
            <div className="answer-section" key={index}>
              <div className="question">
                <div className='logo'><IconFont type="icon-human" style={{ fontSize: "20px", color: "red" }} /></div><div>{value.question}
                </div>
              </div>
              <div className="answer">
                <div className='logo'><IconFont type="icon-openai-icon" style={{ fontSize: "20px", color: "green" }} />
                </div>
                <div>{value.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AnswerSection;
