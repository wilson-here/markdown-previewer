function Previewer({ markedText }) {
  return (
    <div
      id="preview"
      className="tool__item-field"
      dangerouslySetInnerHTML={{ __html: markedText }}
    ></div>
  );
}

export default Previewer;
