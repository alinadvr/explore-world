export default function CustomInput({
  onChange,
  placeholder,
  defaultValue,
}: {
  onChange: (value?: string) => void;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <input
      type="text"
      className="input"
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
