import { useState } from "react";
import "./styles/App.scss";
import { marked } from "marked";
import initialText from "./components/initialText";
import CopyRight from "./components/CopyRight";

function App() {
  const [text, setText] = useState(initialText);
  const [clickedTab, setClickedTab] = useState("editor");
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
    <>
      <div className="tool">
        <div className="tool__item-label-wrap">
          <label
            className={`tool__item-label ${
              clickedTab === "editor" ? "active" : ""
            }`}
            htmlFor="editor"
            onClick={handleClick}
          >
            EDITOR
          </label>
          <label
            className={`tool__item-label ${
              clickedTab === "preview" ? "active" : ""
            }`}
            htmlFor="preview"
            onClick={handleClick}
          >
            PREVIEW
          </label>
        </div>
        <div className="tool__item-field-wrap">
          <div
            className={`tool__item ${clickedTab === "editor" ? "active" : ""}`}
          >
            <textarea
              name="editor"
              className="tool__item-field"
              id="editor"
              defaultValue={initialText}
              onChange={handleChange}
            ></textarea>
          </div>
          <div
            className={`tool__item ${clickedTab === "preview" ? "active" : ""}`}
          >
            <div
              id="preview"
              className="tool__item-field"
              dangerouslySetInnerHTML={{ __html: markedText }}
            ></div>
          </div>
        </div>
      </div>
      <CopyRight />
    </>
  );
}

export default App;
