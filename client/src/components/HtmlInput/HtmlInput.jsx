import "./HtmlInput.css";

function HtmlInput({ placeholder, name, id, onChange, onBlur, value }) {
  return (
    <input
      type="text"
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="htmlInput__input"
      placeholder={placeholder || "Enter Value"}
    />
  );
}

export default HtmlInput;
