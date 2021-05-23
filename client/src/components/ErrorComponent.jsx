import { Box, Text } from "@chakra-ui/layout";
import { BiErrorAlt } from "react-icons/bi";

function ErrorComponent({ errorMessage, ...changes }) {
  return (
    <Box
      bg="#FEF2F2"
      border="1px solid #FCA5A5"
      p="5"
      borderRadius="15"
      my="5"
      {...changes}
    >
      <Box d="flex" mb="1" alignItems="center">
        <BiErrorAlt size="32" color="#DC2626" />
        <Text ml="5" fontSize="lg" fontWeight="medium" color="#374151">
          Error
        </Text>
      </Box>
      <Text
        textTransform="capitalize"
        ml="14"
        fontWeight="medium"
        fontSize="sm"
        color="#6B7280"
      >
        {errorMessage}
      </Text>
    </Box>
  );
}

export default ErrorComponent;
