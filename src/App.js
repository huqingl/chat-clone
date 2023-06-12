import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.scss";
import axios from "axios";
import { message } from "antd";
import HighlightedResponse from "./components/HighlightedResponce";

//获取cookie值，根据键名
// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
//生成随机uuid
// function uuidv4() {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//     (
//       c ^
//       (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//     ).toString(16)
//   );
// }

// const USER_ID = getCookie("id") == ""?uuidv4():getCookie("id")
const App = () => {
  const [storedValues, setStoredValues] = useState([]);
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      return;
    } else {
      navigate("/login");
    }
  }, [navigate, token]);
  useEffect(() => {
    const history = localStorage.getItem("history")
      ? localStorage.getItem("history")
      : "[]";
    setStoredValues(JSON.parse(history));
    // console.log(storedValues);
  }, []);
  // if (getCookie("id") === "") {
  //   var uuid;
  //   uuid = uuidv4();
  //   document.cookie = "id=" + uuid;
  // } else {
  //   uuid = getCookie("id");
  // }
  // const USER_ID = uuid;
  const [loading, setLoading] = useState(false);
  const [canInput, setCanInput] = useState(false);
  const GenerateResponse = async (newQuestion, setNewQuestion, canInput) => {
    //将文本question变为对象
    setCanInput(canInput);
    setLoading(true);
    const comleteQuestion = { role: "user", content: newQuestion };
    const newStoredValues = [...storedValues, comleteQuestion];
    setStoredValues(newStoredValues);
    // console.log(storedValues);
    localStorage.setItem("history", JSON.stringify(newStoredValues));
    // const eventSource = new EventSource(
    //   // 'http://192.168.80.13:5000/chat'
    //   // `http://192.168.80.13:5000/chat?question=${newQuestion}&token=${token}`
    // );
    // let answer = "";
    // eventSource.onmessage = function (e) {
    //   // console.log(e.data)
    //   if (e.data === "[DONE]") {
    //     eventSource.close();
    //     setCanInput(false);
    //     const newStoredValues1 = [...newStoredValues, { role: "assistant", content: answer },]
    //     localStorage.setItem("history", JSON.stringify(newStoredValues1));
    //   } else {
    //     try {
    //       let re = JSON.parse(e.data)
    //       let txt = re.choices[0].delta.content ? re.choices[0].delta.content : '';
    //       if (txt !== undefined) {
    //         answer += txt.replace(/(?:\n|\r\n|\r|\n\n)/g, "<br>");
    //         // answer += txt;
    //         // // answer += txt;
    //         setStoredValues([
    //           ...newStoredValues,
    //           { role: "assistant", content: answer},
    //         ]);
    //       }
    //     } catch (d) {
    //     }
    //   }
    // };
    // eventSource.onerror = function (e) {
    //   console.log(e);
    //   eventSource.close();
    // };

    // setNewQuestion("");
    axios
      .get(
        `http://shunyuanchat.site/api/chat?question=${newQuestion}&token=${token}`
      )
      .then((res) => {
        if (res.data.code) {
          message.info({
            duration: 3,
            content: res.data.msg,
            onClose: () => {
              localStorage.removeItem("token");
              navigate("/");
            },
          });
        } else {
          const eventSource = new EventSource(
            `http://shunyuanchat.site/api/chat?question=${newQuestion}&token=${token}`
            // `http://192.168.80.13:5000/api1/chat?question=${newQuestion}&token=${token}`
          );
          setLoading(false);
          let answer = "";
          eventSource.onmessage = function (e) {
            if (e.data === "[DONE]") {
              eventSource.close();
              setCanInput(false);
              const formated = HighlightedResponse(answer)
              setStoredValues([
                ...newStoredValues,
                { role: "assistant", content: formated },
              ]);
              const newStoredValues1 = [
                ...newStoredValues,
                { role: "assistant", content: formated },
              ];
              localStorage.setItem("history", JSON.stringify(newStoredValues1));
            } else {
              try {
                // let txt = JSON.parse(e.data).choices[0].delta.content;
                let txt = JSON.parse(e.data)['format_data'];
                if (txt !== undefined) {
                  // console.log("=>", txt);
                  // answer += txt.replace(/(?:\n|\r\n|\r|\n\n)/g, "<br>");
                  answer += txt;
                  setStoredValues([
                    ...newStoredValues,
                    { role: "assistant", content: answer },
                  ]);
                }
              } catch (d) {}
            }
          };
          eventSource.onerror = function (e) {
            console.log(e);
            eventSource.close();
            setCanInput(false);
            const newStoredValues2 = [
              ...newStoredValues,
              { role: "assistant", content: "网络似乎遇到问题，请重新提问" },
            ];
            localStorage.setItem("history", JSON.stringify(newStoredValues2));
            setStoredValues([
              ...newStoredValues,
              { role: "assistant", content: "网络似乎遇到问题，请重新提问" },
            ]);
          };
          setNewQuestion("");
        }
      });
  };
  return (
    <div className="App w-full h-full">
      <div className="h-full relative max-w-full">
        <AnswerSection
          storedValues={storedValues}
          canInput={canInput}
          loading={loading}
        />
        <FormSection generateResponse={GenerateResponse} canInput={canInput} />
      </div>
    </div>
  );
};

export default App;
