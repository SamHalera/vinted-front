const CustomInput = ({
  inputValue,
  setState,
  handleChangeInput,
  type,
  placeholder,
  label,
  title,
}) => {
  return (
    <input
      onChange={(event) => {
        handleChangeInput(event, setState);
      }}
      type={type}
      id={label}
      placeholder={placeholder}
      value={inputValue}
    />
  );
};
export default CustomInput;
