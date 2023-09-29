import { useState } from "react";
import "./styles/App.scss";
import { marked } from "marked";
import initialText from "./components/initialText";
import CopyRight from "./components/CopyRight";

function App() {
  const [text, setText] = useState(initialText);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
  const markedText = marked(text);
  return (
    <>
      <div className="tool">
        <div className="tool__item">
          <label className="tool__item-label" htmlFor="editor">
            MARKDOWN
          </label>
          <textarea
            name="editor"
            className="tool__item-field"
            id="editor"
            defaultValue={initialText}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="tool__item">
          <label className="tool__item-label" htmlFor="preview">
            PREVIEW
          </label>
          <div
            id="preview"
            className="tool__item-field tool__item-output"
            dangerouslySetInnerHTML={{ __html: markedText }}
          ></div>
        </div>
      </div>
      <CopyRight />
    </>
  );
}

export default App;
