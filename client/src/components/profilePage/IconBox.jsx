import { Center } from "@chakra-ui/layout";

function IconBox({ children, ...edit }) {
  return (
    <Center
      cursor="pointer"
      _hover={{ bg: "freshLight" }}
      borderRadius="full"
      {...edit}
    >
      {children}
    </Center>
  );
}

export default IconBox;
