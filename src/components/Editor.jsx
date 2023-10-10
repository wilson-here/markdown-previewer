function Editor({ text, handleChange, textareaRef, handleScroll }) {
  return (
    <textarea
      name="editor"
      className="tool__item-field"
      id="editor"
      value={text}
      onChange={handleChange}
      ref={textareaRef}
      onScroll={handleScroll}
    ></textarea>
  );
}

export default Editor;
