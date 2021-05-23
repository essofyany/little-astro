import { Button } from "@chakra-ui/react";

function Btn({ children, ...vars }) {
  return (
    <Button
      _focus={{ outline: "none" }}
      _hover={{ bg: "freshRed" }}
      bg="freshRed"
      color="white"
      borderRadius="full"
      fontSize="sm"
      px="8"
      py="2"
      {...vars}
    >
      {children}
    </Button>
  );
}

export default Btn;
