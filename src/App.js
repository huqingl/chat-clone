import { Configuration, OpenAIApi } from "openai";
import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import { useState } from "react";
import "./App.css";

const App = () => {
  const configration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configration);
  const [storedValues, setStoredValues] = useState([]);
  const [storeMessages, setStoreMessages] = useState([{ role: "system", content: "I'm a helpful assistant." }]);
  const generateResponse = async (newQuestion, setNewQuestion) => {
    const options = {
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    const comleteQuestion = { role: "user", content: newQuestion };
    // let comleteMessages = [...initMessage,comleteQuestion]
    setStoreMessages([...storeMessages, comleteQuestion]);
    const comleteOptions = { ...options, messages: storeMessages };

    const response = await openai.ChatCompletion.create(comleteOptions);
    if (response.data.choices) {
      setStoredValues([
        ...storedValues,
        {
          qustion: newQuestion,
          answer: response.data.choices[0].message.content,
        },
      ]);
      setStoreMessages([...storeMessages, response.data.choices[0].message]);
      setNewQuestion("");
    }
  };
  return (
    <div className="App">
      <FormSection generateResponse={generateResponse} />
      <AnswerSection storedValues={storedValues} />
    </div>
  );
};

export default App;
