function Label({ clickedTab, handleClick, htmlFor }) {
  return (
    <label
      className={`tool__item-label ${clickedTab === htmlFor ? "active" : ""}`}
      htmlFor={htmlFor}
      onClick={handleClick}
    >
      {htmlFor}
    </label>
  );
}

export default Label;
