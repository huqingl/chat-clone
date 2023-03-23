const AnswerSection = ({ storedValues }) => {
  return (
    <>
      <div className="answer-container">
        <p className="start-message">this is a test</p>
        {storedValues.map((value, index) => {
          return (
            <div className="answer-section" key={index}>
              <p className="question">{value.question}</p>
              <p className="answer">{value.answer}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AnswerSection;
