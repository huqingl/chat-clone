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
      answer:
        "周星驰的电影作品非常丰富，但是他最有代表性的作品应该是《大话西游》系列。这部电影以中国古代神话故事《西游记》为蓝本，加入了大量的幽默元素和现代化的表现手法，成为了中国电影史上的经典之作。除此之外，他的其他代表作还包括《喜剧之王》、《少林足球》、《功夫》等。",
    },
    {
      question: "他最有代表性的作品是哪一部呢？",
      answer:
        "周星驰的电影作品非常丰富，但是他最有代表性的作品应该是《大话西游》系列。这部电影以中国古代神话故事《西游记》为蓝本，加入了大量的幽默元素和现代化的表现手法，成为了中国电影史上的经典之作。除此之外，他的其他代表作还包括《喜剧之王》、《少林足球》、《功夫》等。",
    },
    {
      question: "他最有代表性的作品是哪一部呢？",
      answer:
        "周星驰的电影作品非常丰富，但是他最有代表性的作品应该是《大话西游》系列。这部电影以中国古代神话故事《西游记》为蓝本，加入了大量的幽默元素和现代化的表现手法，成为了中国电影史上的经典之作。除此之外，他的其他代表作还包括《喜剧之王》、《少林足球》、《功夫》等。",
    },
    {
      question: "测试代码",
      answer:
      "You can use a syntax highlighting library to highlight the code block in the response. One popular library for this is called PrismJS. \n\nHere's an example of how you can use it in your React application:\n\n1. Install the library using npm:\n\n```\nnpm install prismjs\n```\n\n2. Import the library and the CSS file in your component:\n\n```javascript\nimport Prism from 'prismjs';\nimport 'prismjs/themes/prism.css';\n```\n\n3. Create a function that will highlight the code block:\n\n```javascript\nfunction highlightCode() {\n  Prism.highlightAll();\n}\n```\n\n4. Call the `highlightCode` function after the response is received and the text is rendered:\n\n```javascript\nfunction MyComponent() {\n  const [response, setResponse] = useState('');\n\n  useEffect(() => {\n    // make API call and set response\n    highlightCode();\n  }, [response]);\n\n  return (\n    <div>\n      <p>{response.text}</p>\n      <pre>\n        <code className=\"language-javascript\">{response.code}</code>\n      </pre>\n    </div>\n  );\n}\n```\n\nIn this example, the `highlightCode` function is called after the response is received and the text is rendered. The `pre` and `code` tags are used to display the code block, and the `className` is set to the language of the code block (in this case, JavaScript). \n\nWhen the `highlightCode` function is called, it will highlight all code blocks on the page using the PrismJS library.",
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

    const response = await openai.createChatCompletion(comleteOptions);

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
