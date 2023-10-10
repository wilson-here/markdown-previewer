import { useState, useEffect, useRef } from "react";
import "./styles/App.scss";
import { marked } from "marked";
import initialText from "./components/initialText";
import LineNumbers from "./components/LineNumbers";
import Label from "./components/Label";
import Editor from "./components/Editor";
import Previewer from "./components/Previewer";
import CopyRight from "./components/CopyRight";

function App() {
  const [text, setText] = useState(initialText);
  const [clickedTab, setClickedTab] = useState("editor");
  const lineNumbersContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Synchronize the scroll positions
  const handleScroll = () => {
    const textarea = textareaRef.current;
    const lineNumbersContainer = lineNumbersContainerRef.current;

    if (textarea && lineNumbersContainer) {
      lineNumbersContainer.scrollTop = textarea.scrollTop;
    }
  };

  useEffect(() => {
    const markdownContent = document.querySelector(".tool");
    const textarea = textareaRef.current;
    const lineNumbersContainer = lineNumbersContainerRef.current;
    const lines = markdownContent.textContent.split("\n");

    const lineNumbers = lines.map((_, index) => {
      const lineNumber = document.createElement("span");
      lineNumber.textContent = (index + 1).toString();
      return lineNumber;
    });

    lineNumbers.forEach((lineNumber) => {
      lineNumbersContainer.appendChild(lineNumber);
    });
    if (markdownContent && textarea && lineNumbersContainer) {
      textarea.addEventListener("scroll", handleScroll);
      // Cleanup event listener when the component unmounts
      return () => {
        textarea.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleClick = (e) => {
    setClickedTab(e.target.htmlFor);
  };
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
  const markedText = marked(text);
  return (
    <div className="markdown-container">
      <div className="tool">
        <div className="tool__item-label-wrap">
          <Label
            clickedTab={clickedTab}
            handleClick={handleClick}
            htmlFor="editor"
          />
          <Label
            clickedTab={clickedTab}
            handleClick={handleClick}
            htmlFor="previewer"
          />
        </div>
        <div className="tool__item-field-wrap">
          <div
            className={`tool__item ${clickedTab === "editor" ? "active" : ""}`}
          >
            <LineNumbers lineNumbersContainerRef={lineNumbersContainerRef} />
            <Editor
              text={text}
              handleChange={handleChange}
              textareaRef={textareaRef}
              handleScroll={handleScroll}
            />
          </div>
          <div
            className={`tool__item ${
              clickedTab === "previewer" ? "active" : ""
            }`}
          >
            <Previewer markedText={markedText} />
          </div>
        </div>
      </div>
      <CopyRight />
    </div>
  );
}

export default App;
