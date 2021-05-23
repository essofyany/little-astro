import { Center } from "@chakra-ui/layout";

export function IconWrapper({ children }) {
  return (
    <Center
      bg="freshLight"
      w="10"
      h="10"
      my="4"
      borderRadius="full"
      _hover={{ bg: "#F1F2ef" }}
    >
      {children}
    </Center>
  );
}
