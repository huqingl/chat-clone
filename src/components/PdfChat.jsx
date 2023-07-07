import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useSearchParams } from "react-router-dom";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import PdfFormSection from "./PdfFormSection";
import PdfAnswerSection from "./PdfAnswerSection";
import axios from "axios";
import qs from "qs";
import { message } from "antd";
import HighlightedResponse from "./HighlightedResponce";
import { useWindowWidth } from "@wojtekmaj/react-hooks";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();
const options = {
  cMapUrl: "cmaps/",
  standardFontDataUrl: "standard_fonts/",
};
export default function PdfChat() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //获取pdf文档父元素的宽度，以让canvas按此宽度渲染
  const width = useWindowWidth() * 0.6 - 42;
  //总页数
  const [numPages, setNumPages] = useState(null);
  //页码
  //   const [pageNumber, setPageNumber] = useState(1);
  const [pageShow, setPageShow] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    detectPage();
  };

  const detectPage = () => {
    let observers = [];
    let options = {
      root: document.querySelector("#pdf-area"),
      rootMargin: "0px",
      threshold: 0.5, // At least 20% of the last page must be visible
    };
    let intersectionCallback = (entries, observe) => {
      entries.forEach((entry) => {
        let page = entry.target.getAttribute("data-page-number");
        setPageShow(page);
      });
    };
    for (let i = 0; i < numPages; i++) {
      observers[i] = new IntersectionObserver(intersectionCallback, options);
      observers[i].observe(
        document.querySelector(
          '.react-pdf__Page[data-page-number="' + String(i + 1) + '"]'
        )
      );
    }
  };

  const jumpTo = (e) => {
    if (e.keyCode === 13) {
      let pageNum = e.target.value;
      if (pageNum < numPages) {
        let el = document.querySelector(
          '.react-pdf__Page[data-page-number="' + String(pageNum) + '"]'
        );
        el.scrollIntoView({ behavior: "smooth" });
        el.setAttribute("placeholder", pageNum);
        e.target.value = "";
      }
    }
  };
  const [storedValues, setStoredValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canInput, setCanInput] = useState(false);
  const GenerateResponse = async (newQuestion, setNewQuestion, canInput) => {
    const token = localStorage.getItem("token");
    setCanInput(canInput);
    setLoading(true);
    const comleteQuestion = { role: "user", content: newQuestion };
    const newStoredValues = [...storedValues, comleteQuestion];
    setStoredValues(newStoredValues);
    // console.log(storedValues);
    localStorage.setItem(md5, JSON.stringify(newStoredValues));

    axios
      .get(
        `/api/pdf_handler/chat?question=${newQuestion}&token=${token}&pdf_md5=${md5}`
      )
      .then((res) => {
        if (res.data.code === 1000) {
          message.info({
            duration: 3,
            content: res.data.msg,
            onClose: () => {
              localStorage.removeItem("token");
              localStorage.removeItem("userid");
              navigate("/");
            },
          });
          return false;
        } else if (res.data.code === 1001) {
          message.info({
            duration: 3,
            content: res.data.msg,
          });
          return false;
        } else if (res.data.code === 1002) {
          localStorage.removeItem("token");
          localStorage.setItem("token", res.data.token);
          const token1 = res.data.token;
          const eventSource = new EventSource(
            `/api/pdf_handler/chat?question=${newQuestion}&token=${token1}&pdf_md5=${md5}`
          );
          eventSource.onopen = function () {
            setLoading(false);
          };
          let answer = "";
          eventSource.onmessage = function (e) {
            if (e.data === "[DONE]") {
              eventSource.close();
              setCanInput(false);
              const formated = HighlightedResponse(answer);
              setStoredValues([
                ...newStoredValues,
                { role: "assistant", content: formated },
              ]);
              const newStoredValues1 = [
                ...newStoredValues,
                { role: "assistant", content: formated },
              ];
              localStorage.setItem(md5, JSON.stringify(newStoredValues1));
            } else {
              try {
                // let txt = JSON.parse(e.data).choices[0].delta.content;
                let txt = JSON.parse(e.data)["format_data"];
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
            // console.log(e);
            setLoading(false);
            eventSource.close();
            setCanInput(false);
            const newStoredValues2 = [
              ...newStoredValues,
              { role: "assistant", content: "网络似乎遇到问题，请重新提问" },
            ];
            localStorage.setItem("phistory", JSON.stringify(newStoredValues2));
            setStoredValues([
              ...newStoredValues,
              { role: "assistant", content: "网络似乎遇到问题，请重新提问" },
            ]);
          };
          setNewQuestion("");
        } else {
          const eventSource = new EventSource(
            `/api/pdf_handler/chat?question=${newQuestion}&token=${token}&pdf_md5=${md5}`
          );
          eventSource.onopen = function () {
            setLoading(false);
          };
          let answer = "";
          eventSource.onmessage = function (e) {
            if (e.data === "[DONE]") {
              eventSource.close();
              setCanInput(false);
              const formated = HighlightedResponse(answer);
              setStoredValues([
                ...newStoredValues,
                { role: "assistant", content: formated },
              ]);
              const newStoredValues1 = [
                ...newStoredValues,
                { role: "assistant", content: formated },
              ];
              localStorage.setItem(md5, JSON.stringify(newStoredValues1));
            } else {
              try {
                // let txt = JSON.parse(e.data).choices[0].delta.content;
                let txt = JSON.parse(e.data)["format_data"];
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
            // console.log(e);
            setLoading(false);
            eventSource.close();
            setCanInput(false);
            const newStoredValues2 = [
              ...newStoredValues,
              { role: "assistant", content: "网络似乎遇到问题，请重新提问" },
            ];
            localStorage.setItem("phistory", JSON.stringify(newStoredValues2));
            setStoredValues([
              ...newStoredValues,
              { role: "assistant", content: "网络似乎遇到问题，请重新提问" },
            ]);
          };
          setNewQuestion("");
        }
      });
  };

  useEffect(() => {
    axios
      .post("/api/login/index_check_token", qs.stringify({ token: token }))
      .then((res) => {
        if (res.data.code === 1005) {
          localStorage.removeItem("token");
          localStorage.removeItem("userid");
          navigate("/login");
        } else {
          return;
        }
      });
  }, [navigate, token]);

  const [pdf, setPdf] = useState("");
  const [md5, setMd5] = useState("");
  useEffect(() => {
    const pdf_name = searchParams.get("name");
    if (pdf_name === null) {
      navigate("/pdf-upload");
    } else {
      const pdf = "/file_api/" + pdf_name;
      const md5 = pdf_name.split(".")[0];
      setPdf(pdf);
      setMd5(md5);
    }
  }, []);
  useEffect(() => {
    const phistory = localStorage.getItem(md5)
      ? localStorage.getItem(md5)
      : "[]";
    setStoredValues(JSON.parse(phistory));
    // console.log(storedValues);
  }, [md5]);
  useEffect(() => {
    detectPage();
    setTimeout(() => {
      setPageShow(1);
    }, 4000);
  }, [numPages]);

  return (
    <div className="w-full h-screen flex">
      <div className="pdf-show w-3/5 border-r-2 flex flex-col ">
        <div className="w-full">
          <p className="text-right p-2 pr-4">
            <input
              max={numPages}
              placeholder={pageShow}
              className="w-8 bg-gray-200 outline-sky-300 text-center"
              onKeyDown={jumpTo}
            />
            <span> {"/" + numPages}</span>
          </p>
        </div>
        <div className="overflow-y-scroll p-4  pt-0 flex-grow" id="pdf-area">
          <Document
            file={pdf}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                className="m-2 pdf-style"
                pageNumber={index + 1}
                width={Math.min(width, 800)} //最大宽度800px
                // onRenderSuccess={onRenderSuccess}
              />
            ))}
          </Document>
        </div>
      </div>
      <div className="chat-space w-2/5">
        <div className="h-full relative max-w-full">
          <PdfAnswerSection
            storedValues={storedValues}
            canInput={canInput}
            loading={loading}
          />
          <PdfFormSection
            generateResponse={GenerateResponse}
            canInput={canInput}
          />
        </div>
      </div>
    </div>
  );
}
