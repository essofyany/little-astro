import { CheckIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";

export default function InputWrapper({
  checked,
  value,
  handleChange,
  name,
  placeholder,
  ...changes
}) {
  return (
    <InputGroup>
      <Input
        onChange={(e) => handleChange(e)}
        name={name}
        value={value}
        placeholder={placeholder}
        focusBorderColor="blue.100"
        {...changes}
      />
      <InputRightElement
        children={<CheckIcon color={checked ? `green.500` : `gray.200`} />}
      />
    </InputGroup>
  );
}
