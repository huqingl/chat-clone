import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import { useState } from "react";
import "./App.scss";
//获取cookie值，根据键名
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
//生成随机uuid
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
  const [storedValues, setStoredValues] = useState([]);
  const [canInput, setCanInput] = useState(false);

  const GenerateResponse = async (newQuestion, setNewQuestion,canInput) => {
    //将文本question变为对象
    setCanInput(canInput)
    const comleteQuestion = { role: "user", content: newQuestion };
    const newStoredValues = [...storedValues, comleteQuestion];
    setStoredValues(newStoredValues);
    const formData = new FormData();
    formData.append("msg", newQuestion);
    formData.append("user_id", USER_ID);
    setNewQuestion("");
    fetch("http://chatclone.site:3000/send-message.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const eventSource = new EventSource(
          `http://chatclone.site:3000/event-stream.php?chat_history_id=${
            data.id
          }&id=${encodeURIComponent(USER_ID)}`
        );
        let answer = "";
        eventSource.onmessage = function (e) {
          if (e.data === "[DONE]") {
            eventSource.close();
            setCanInput(false)
          } else {
            let txt = JSON.parse(e.data).choices[0].delta.content;
            if (txt !== undefined) {
              // console.log('=>',txt)
              answer += txt.replace(/(?:\n|\r\n|\r|\n\n)/g, "<br>");
              // answer += txt;
              setStoredValues([
                ...newStoredValues,
                { role: "assistant", content: answer },
              ]);
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
        <FormSection generateResponse={GenerateResponse}  canInput={canInput} />
      </div>
    </div>
  );
};

export default App;
