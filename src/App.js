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
  const [storedValues, setStoredValues] = useState([
    {
      question: "你觉得周星驰的电影怎么样？",
      answer:
        "作为一个AI助手，我没有个人喜好和情感，但是周星驰的电影在中国和亚洲地区非常受欢迎，他的电影以幽默搞笑为主，同时也有一些深刻的社会寓意。他的电影风格独特，具有很高的艺术价值和观赏性。",
    },
    {
      question: "他最有代表性的作品是哪一部呢？",
      answer: "周星驰的电影作品非常丰富，但是他最有代表性的作品应该是《大话西游》系列。这部电影以中国古代神话故事《西游记》为蓝本，加入了大量的幽默元素和现代化的表现手法，成为了中国电影史上的经典之作。除此之外，他的其他代表作还包括《喜剧之王》、《少林足球》、《功夫》等。",
    },
    {
      question: "测试代码",
      answer: "<code>import { createFromIconfontCN } from '@ant-design/icons'</code>"
    },
  ]);
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

    // const response = await openai.createChatCompletion(comleteOptions)

    // if (response.data.choices) {
    //   setStoredValues([
    //     ...storedValues,
    //     {
    //       question: newQuestion,
    //       answer: response.data.choices[0].message.content,
    //     },
    //   ]);
    //   setStoreMessages([response.data.choices[0].message]);
    //   setNewQuestion("");
    // }
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
