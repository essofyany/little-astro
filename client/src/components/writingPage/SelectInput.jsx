import { Select } from "@chakra-ui/select";

export default function SelectInput({
  name,
  value,
  handleChange,
  placeholder,
  list,
  ...changes
}) {
  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
      placeholder={placeholder}
      focusBorderColor="blue.100"
      {...changes}
    >
      {list.map((item) => (
        <option
          style={{
            padding: "5px",
            color: "#002c3e",
            backgroundColor: "#F1F2FA",
            fontWeight: "500",
            fontSize: "16px",
          }}
          value={item}
        >
          {item}
        </option>
      ))}
    </Select>
  );
}
