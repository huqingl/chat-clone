const AnswerSection = ({ storedValues }) => {
  return (
    <>
      <div className="answer-container">
        {storedValues.map((value, index) => {
          return (
            <div className="answer-section" key={index}>
              <p className="start-message">this is a test</p>
              <p className="question">{value.question}</p>
              <p className="answer">
                {value.answer}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AnswerSection;
