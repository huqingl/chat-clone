import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import { useState } from "react";
import "./App.scss";
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

// const USER_ID = getCookie("id") == ""?uuidv4():getCookie("id")
const App = () => {
  if (getCookie("id") === "") {
    var uuid;
    uuid = uuidv4();
    document.cookie = "id=" + uuid;
  } else {
    uuid = getCookie("id");
  }
  const USER_ID = uuid;
  const [storedValues, setStoredValues] = useState( [
    {
      "role": "user",
      "content": "酱油在中餐里的重要性？"
    },
    {
      "role": "assistant",
      "content": "酱油是中餐里非常重要的调味料之一，几乎每道菜都会用到。它可以增加菜肴的味道和香气，使菜肴更加美味。酱油的味道鲜美，有咸味和甜味，可以平衡其他调味料的味道，使菜肴更加均衡。此外，酱油还可以增加菜肴的色泽，使其更加诱人。在中餐中，酱油通常与其他调味料一起使用，如盐、糖、醋、姜、蒜等，以达到最佳的味道效果。"
    },
    {
      "role": "user",
      "content": "它是怎么制作的?"
    },
    {
      "role": "assistant",
      "content": "酱油是中餐里非常重要的调味料之一，几乎每道菜都会用到。它可以增加菜肴的味道和香气，使菜肴更加美味。酱油的味道鲜美，有咸味和甜味，可以平衡其他调味料的味道，使菜肴更加均衡。此外，酱油还可以增加菜肴的色泽，使其更加诱人。在中餐中，酱油通常与其他调味料一起使用，如盐、糖、醋、姜、蒜等，以达到最佳的味道效果。"
    },
    {
      "role": "user",
      "content": "它是怎么制作的?"
    },
    {
      "role": "assistant",
      "content": "酱油是中餐里非常重要的调味料之一，几乎每道菜都会用到。它可以增加菜肴的味道和香气，使菜肴更加美味。酱油的味道鲜美，有咸味和甜味，可以平衡其他调味料的味道，使菜肴更加均衡。此外，酱油还可以增加菜肴的色泽，使其更加诱人。在中餐中，酱油通常与其他调味料一起使用，如盐、糖、醋、姜、蒜等，以达到最佳的味道效果。"
    },
    {
      "role": "user",
      "content": "它是怎么制作的?"
    },
    {
      "role": "assistant",
      "content": "酱油是中餐里非常重要的调味料之一，几乎每道菜都会用到。它可以增加菜肴的味道和香气，使菜肴更加美味。酱油的味道鲜美，有咸味和甜味，可以平衡其他调味料的味道，使菜肴更加均衡。此外，酱油还可以增加菜肴的色泽，使其更加诱人。在中餐中，酱油通常与其他调味料一起使用，如盐、糖、醋、姜、蒜等，以达到最佳的味道效果。"
    },
]);
  const GenerateResponse = async (newQuestion, setNewQuestion) => {
    //将文本question变为对象
    const comleteQuestion = { role: "user", content: newQuestion };
    const newStoredValues = [...storedValues, comleteQuestion];
    setStoredValues(newStoredValues);
    const formData = new FormData();
    formData.append("msg", newQuestion);
    formData.append("user_id", USER_ID);
    fetch("http://chatclone.site:3000/send-message.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const eventSource = new EventSource(
          `http://chatclone.site:3000/event-stream.php?chat_history_id=${data.id}&id=${encodeURIComponent(USER_ID)}`
        );
        let answer = "";
        eventSource.onmessage = function (e) {
          if (e.data === "[DONE]") {
            eventSource.close();
            setNewQuestion("");
          } else {
            let txt = JSON.parse(e.data).choices[0].delta.content;
            if (txt !== undefined) {
              answer += txt.replace(/(?:\r\n|\r|\n)/g, "<br>");
              setStoredValues([
                ...newStoredValues,
                { role: "assistant", content: answer },
              ]);
              setNewQuestion("");
            }
          }
        };
        eventSource.onerror = function (e) {
          console.log(e);
          eventSource.close();
        };
      })
      .catch((error) => console.log(error));
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
