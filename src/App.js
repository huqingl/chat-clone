// import { Configuration, OpenAIApi } from "openai";
// import { Configuration, OpenAIApi } from "openai-edge"
import useServerSentEvents from "./hooks/useServerSentEvents"
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
  const GenerateResponse = async (newQuestion, setNewQuestion) => {
    const options = {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      stream: true,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    //将文本question变为对象
    const comleteQuestion = { role: "user", content: newQuestion };
    const newStoredValues = [...storedValues, comleteQuestion]
    setStoredValues(newStoredValues)

    //将新提问加入到messages数组里
    const newMessages = [...storeMessages, comleteQuestion];
    setStoreMessages(newMessages);
    //提交到API的参数，加入了messages key
    const comleteOptions = { ...options, messages: newMessages };

    const response = await openai.createChatCompletion(comleteOptions, { responseType: 'stream' })
    // response.data.on("data", (data) => {
    //   const lines = data
    //     ?.toString()
    //     ?.split("\n")
    //     .filter((line) => line.trim() !== "");
    //   for (const line of lines) {
    //     const message = line.replace(/^data: /, "");
    //     if (message === "[DONE]") {
    //       break; // Stream finished
    //     }
    //     try {
    //       const parsed = JSON.parse(message);
    //       console.log(parsed.choices[0]);
    //     } catch (error) {
    //       console.error("Could not JSON parse stream message", message, error);
    //     }
    //   }
    // })
    if (response.data.choices) {
      setStoredValues([...newStoredValues, response.data.choices[0].message])
      setStoreMessages([response.data.choices[0].message]);
      setNewQuestion("");
    }
  };
  return (
    <div className="App">
      <div className="container">
        <AnswerSection storedValues={storedValues} />
        <FormSection generateResponse={GenerateResponse} />
      </div>
    </div>
  );
};

export default App;
