import { Configuration, OpenAIApi } from "openai";
import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import { useState } from "react";
import "./App.scss";

const App = () => {
  const configration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configration);
  const [storedValues, setStoredValues] = useState([]);
  const [storeMessages, setStoreMessages] = useState([
    { role: "system", content: "I'm a helpful assistant." },
  ]);
  const generateResponse = async (newQuestion, setNewQuestion) => {
    const options = {
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    //将文本question变为对象
    const comleteQuestion = { role: "user", content: newQuestion };
    //将新提问加入到messages数组里
    const newMessages = [...storeMessages, comleteQuestion];
    setStoreMessages(newMessages);
    //提交到API的参数，加入了messages key
    const comleteOptions = { ...options, messages: newMessages };

    const response = await openai.createChatCompletion(comleteOptions)

    if (response.data.choices) {
      setStoredValues([
        ...storedValues,
        {
          question: newQuestion,
          answer: response.data.choices[0].message.content,
        },
      ]);
      setStoreMessages([response.data.choices[0].message]);
      setNewQuestion("");
    }
  };
  return (
    <div className="App">
      <div className="container">
        <AnswerSection storedValues={storedValues} />
        <FormSection generateResponse={generateResponse} />
      </div>
    </div>
  );
};

export default App;
